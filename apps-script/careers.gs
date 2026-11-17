/**
 * Adaptive Engineering – Unified Website Form Mailer (Google Apps Script Web App)
 *
 * Handles all website forms via MailApp (no Google Sheet required):
 *   1. Contact / Enquiry forms (formType = "enquiry")
 *   2. Brochure & Case Study download forms (formType = "brochure")
 *   3. Careers job application forms (with resume & optional cover letter attachments)
 *
 * HOW TO UPDATE YOUR EXISTING DEPLOYMENT:
 *   1. Open your project at https://script.google.com
 *   2. Replace the entire code with this file and press Ctrl+S (Save).
 *   3. Select `testEmail` in the toolbar dropdown and click Run (grant email permission if prompted).
 *   4. Click Deploy → Manage deployments → click the pencil (Edit) icon →
 *      under Version, choose "New version" → click Deploy.
 */

// Primary recipient (visible in "To:")
var TO_EMAIL = "info@adaptive-engg.com";

// Blind carbon copy recipients (hidden in "BCC:", never in To or CC)
var BCC_EMAILS = "mayank.thacker@honestsol.com,support@honestsol.com";

var MAX_FILE_BYTES = 4 * 1024 * 1024; // 4 MB safety net (frontend limits to 3 MB)
var ALLOWED_EXT = /\.(pdf|doc|docx)$/i;

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};
    if ((!p || Object.keys(p).length === 0) && e && e.postData && e.postData.contents) {
      try {
        p = JSON.parse(e.postData.contents);
      } catch (_) {}
    }

    // Honeypot – silently ignore bots
    if (p.website) return json_({ result: "success" });

    // 1. Careers job application (has position + resumeData)
    if (p.position || p.resumeData) {
      sendCareerEmail_(p);
      return json_({ result: "success" });
    }

    // 2. Contact Enquiry or Brochure Download lead
    if (!p.fullName || !p.email || !p.phone) {
      return json_({ result: "error", error: "Missing required fields" });
    }

    sendLeadEmail_(p);
    return json_({ result: "success" });
  } catch (err) {
    return json_({ result: "error", error: String(err && err.message ? err.message : err) });
  }
}

function doGet() {
  return json_({ result: "ok", message: "AEPL form mailer endpoint is live." });
}

/** Sends email for Contact / Enquiry form or Brochure download form. */
function sendLeadEmail_(p) {
  var isBrochure = p.formType === "brochure";
  var validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(p.email || "");
  var heading = isBrochure ? "New brochure download lead" : "New website enquiry";

  var rows = [
    ["Name", p.fullName],
    ["Company", p.company || "-"],
    ["Designation", p.designation || "-"],
    ["Email", p.email],
    ["Phone", p.phone],
    ["City", p.city || "-"],
    [isBrochure ? "Brochure / Resource" : "Interested in", (isBrochure ? p.brochure : p.interest) || "-"],
    ["Message", p.message || "-"],
    ["Consent to contact", p.consent || "-"],
    ["Submitted from", (p.page || "") + "  " + (p.submittedAt || "")],
  ];

  var text = heading + "\n\n" + rows.map(function (r) { return r[0] + ": " + r[1]; }).join("\n");
  var html =
    '<div style="font-family:Arial,sans-serif;font-size:14px;color:#222">' +
    '<h2 style="margin:0 0 12px">' + esc_(heading) + "</h2>" +
    '<table cellpadding="6" style="border-collapse:collapse">' +
    rows.map(function (r) {
      return (
        '<tr><td style="font-weight:bold;border-bottom:1px solid #eee;vertical-align:top">' +
        esc_(r[0]) +
        '</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">' +
        esc_(r[1]) +
        "</td></tr>"
      );
    }).join("") +
    '</table><p style="color:#666">Reply to this email to contact the sender directly.</p></div>';

  var topic = (isBrochure ? p.brochure : p.interest) || "General";
  var prefix = isBrochure ? "Brochure Lead" : "Website Enquiry";
  var subject = prefix + " – " + topic + " – " + p.fullName + (p.company ? " (" + p.company + ")" : "");

  var mail = {
    to: TO_EMAIL,
    bcc: BCC_EMAILS,
    name: "AEPL Website",
    subject: String(subject).slice(0, 240),
    body: text,
    htmlBody: html,
  };
  if (validEmail) mail.replyTo = p.email;
  MailApp.sendEmail(mail);
}

/** Sends email for Careers job applications with resume & optional cover letter attached. */
function sendCareerEmail_(p) {
  var required = ["position", "fullName", "email", "phone", "resumeData"];
  for (var i = 0; i < required.length; i++) {
    if (!p[required[i]]) throw new Error("Missing field: " + required[i]);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(p.email)) throw new Error("Invalid email");

  var attachments = [blob_(p.resumeData, p.resumeName, p.resumeType, "Resume")];
  if (p.coverLetterData) {
    attachments.push(blob_(p.coverLetterData, p.coverLetterName, p.coverLetterType, "Cover-Letter"));
  }

  var rows = [
    ["Position", p.position],
    ["Name", p.fullName],
    ["Email", p.email],
    ["Phone", p.phone],
    ["Current city", p.city || "-"],
    ["Experience (years)", p.experience || "-"],
    ["Submitted from", (p.page || "") + "  " + (p.submittedAt || "")],
  ];

  var text = "New job application\n\n" + rows.map(function (r) { return r[0] + ": " + r[1]; }).join("\n");
  var html =
    '<div style="font-family:Arial,sans-serif;font-size:14px;color:#222">' +
    '<h2 style="margin:0 0 12px">New job application</h2>' +
    '<table cellpadding="6" style="border-collapse:collapse">' +
    rows.map(function (r) {
      return (
        '<tr><td style="font-weight:bold;border-bottom:1px solid #eee">' +
        esc_(r[0]) +
        '</td><td style="border-bottom:1px solid #eee">' +
        esc_(r[1]) +
        "</td></tr>"
      );
    }).join("") +
    '</table><p style="color:#666">' +
    (attachments.length > 1 ? "Resume and cover letter are attached." : "Resume is attached (no cover letter provided).") +
    " Reply to this email to contact the applicant.</p></div>";

  MailApp.sendEmail({
    to: TO_EMAIL,
    bcc: BCC_EMAILS,
    replyTo: p.email,
    name: "AEPL Careers",
    subject: "Job Application – " + p.position + " – " + p.fullName,
    body: text,
    htmlBody: html,
    attachments: attachments,
  });
}

function blob_(b64, name, type, fallbackName) {
  var bytes = Utilities.base64Decode(b64);
  if (bytes.length > MAX_FILE_BYTES) throw new Error(fallbackName + " is too large");
  var safe = String(name || fallbackName).replace(/[^\w.\- ()]/g, "_");
  if (!ALLOWED_EXT.test(safe)) throw new Error(fallbackName + " must be a PDF, DOC or DOCX file");
  return Utilities.newBlob(bytes, type || "application/octet-stream", safe);
}

/** Run once from the Apps Script editor to authorize MailApp and send a test email. */
function testEmail() {
  MailApp.sendEmail({
    to: TO_EMAIL,
    bcc: BCC_EMAILS,
    name: "AEPL Website",
    subject: "AEPL website form – test email",
    body: "If you can read this, the AEPL website form mailer is working (To: info@adaptive-engg.com, BCC: mayank.thacker@honestsol.com, support@honestsol.com).",
  });
}

function testEnquiryEmail() {
  testEmail();
}

function esc_(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
