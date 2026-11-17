/**
 * Adaptive Engineering – Website Leads → Google Sheet + Email
 *
 * Handles:
 *   1. Contact / Enquiry forms (formType = "enquiry") → appends to "Enquiries" sheet AND sends email
 *   2. Brochure & Case Study download forms (formType = "brochure") → appends to "Brochure Downloads" sheet
 *   3. Careers job application forms (if routed here) → sends email with resume & cover letter attached
 *
 * HOW TO UPDATE YOUR EXISTING DEPLOYMENT:
 *   1. Open your Google Sheet → Extensions → Apps Script (or open your project at https://script.google.com).
 *   2. Replace the entire code in Code.gs with this file and press Ctrl+S (Save).
 *   3. Select `setup` (or `testEmail`) in the top toolbar dropdown and click Run.
 *      Grant BOTH Spreadsheet and Email permissions when Google prompts you.
 *   4. Click Deploy → Manage deployments → click the pencil (Edit) icon →
 *      under Version, choose "New version" → click Deploy.
 */

// Primary recipient (visible in "To:")
var TO_EMAIL = "info@adaptive-engg.com";

// Blind carbon copy recipients (hidden in "BCC:", never in To or CC)
var BCC_EMAILS = "mayank.thacker@honestsol.com,support@honestsol.com";

var MAX_FILE_BYTES = 4 * 1024 * 1024; // 4 MB safety net
var ALLOWED_EXT = /\.(pdf|doc|docx)$/i;

var SHEETS = {
  enquiry: {
    name: "Enquiries",
    headers: [
      "Timestamp",
      "Full Name",
      "Company",
      "Designation",
      "Email",
      "Phone",
      "City",
      "Interest",
      "Message",
      "Consent",
      "Page",
      "Client Time",
      "User Agent",
    ],
    fields: [
      "fullName",
      "company",
      "designation",
      "email",
      "phone",
      "city",
      "interest",
      "message",
      "consent",
      "page",
      "submittedAt",
      "userAgent",
    ],
  },
  brochure: {
    name: "Brochure Downloads",
    headers: [
      "Timestamp",
      "Full Name",
      "Company",
      "Designation",
      "Email",
      "Phone",
      "City",
      "Brochure",
      "Message",
      "Consent",
      "Page",
      "Client Time",
      "User Agent",
    ],
    fields: [
      "fullName",
      "company",
      "designation",
      "email",
      "phone",
      "city",
      "brochure",
      "message",
      "consent",
      "page",
      "submittedAt",
      "userAgent",
    ],
  },
};

/**
 * Run this once from the Apps Script editor toolbar to authorize BOTH
 * Google Sheets and Gmail/MailApp permissions in one step.
 */
function setup() {
  // Touch MailApp so running `setup` also prompts for email permission
  MailApp.getRemainingDailyQuota();
  Object.keys(SHEETS).forEach(function (k) {
    getSheet_(k);
  });
  SpreadsheetApp.getActive().toast(
    "Sheets & email permissions ready: " +
      Object.keys(SHEETS)
        .map(function (k) {
          return SHEETS[k].name;
        })
        .join(", ")
  );
}

function getSheet_(type) {
  var cfg = SHEETS[type];
  var ss = SpreadsheetApp.getActive();
  if (!ss) throw new Error("This script is not bound to a Google Sheet.");
  var sheet = ss.getSheetByName(cfg.name);
  if (!sheet) sheet = ss.insertSheet(cfg.name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(cfg.headers);
    sheet
      .getRange(1, 1, 1, cfg.headers.length)
      .setFontWeight("bold")
      .setBackground("#118674")
      .setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Prevent formula injection (e.g. a value starting with "=")
function clean_(v) {
  v = String(v == null ? "" : v).slice(0, 5000);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var p = (e && e.parameter) || {};
    if ((!p || Object.keys(p).length === 0) && e && e.postData && e.postData.contents) {
      try {
        p = JSON.parse(e.postData.contents);
      } catch (_) {}
    }

    // Honeypot – silently ignore bots
    if (p.website) return json_({ result: "success" });

    // 1. Careers job application (if routed to this endpoint)
    if (p.position || p.resumeData) {
      sendCareerEmail_(p);
      return json_({ result: "success" });
    }

    // 2. Enquiry or Brochure Download lead
    var type = SHEETS[p.formType] ? p.formType : "enquiry";
    if (!p.fullName || !p.email || !p.phone) {
      return json_({ result: "error", error: "Missing required fields" });
    }

    var sheetSaved = false;
    var sheetErrMsg = "";
    try {
      var cfg = SHEETS[type];
      var row = [new Date()].concat(
        cfg.fields.map(function (f) {
          return clean_(p[f]);
        })
      );
      getSheet_(type).appendRow(row);
      sheetSaved = true;
    } catch (sheetErr) {
      sheetErrMsg = String(sheetErr && sheetErr.message ? sheetErr.message : sheetErr);
      console.error("Sheet append failed: " + sheetErrMsg);
    }

    // Send email for enquiries (or as a fallback for brochure leads if the sheet write failed)
    var emailSent = false;
    var emailErrMsg = "";
    if (type === "enquiry" || !sheetSaved) {
      try {
        sendEnquiryEmail_(p, type === "brochure");
        emailSent = true;
      } catch (mailErr) {
        emailErrMsg = String(mailErr && mailErr.message ? mailErr.message : mailErr);
        console.error("Lead email failed: " + emailErrMsg);
      }
    }

    // If neither sheet nor email succeeded, surface the error
    if (!sheetSaved && !emailSent) {
      return json_({ result: "error", error: emailErrMsg || sheetErrMsg || "Failed to process lead" });
    }

    return json_({ result: "success", sheetSaved: sheetSaved, emailSent: emailSent });
  } catch (err) {
    return json_({ result: "error", error: String(err && err.message ? err.message : err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ result: "ok", message: "AEPL lead endpoint is live." });
}

/** Emails a Contact / Enquiry form submission (or Brochure lead fallback). */
function sendEnquiryEmail_(p, isBrochure) {
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

  var text =
    heading +
    "\n\n" +
    rows
      .map(function (r) {
        return r[0] + ": " + r[1];
      })
      .join("\n");
  var html =
    '<div style="font-family:Arial,sans-serif;font-size:14px;color:#222">' +
    '<h2 style="margin:0 0 12px">' +
    esc_(heading) +
    "</h2>" +
    '<table cellpadding="6" style="border-collapse:collapse">' +
    rows
      .map(function (r) {
        return (
          '<tr><td style="font-weight:bold;border-bottom:1px solid #eee;vertical-align:top">' +
          esc_(r[0]) +
          '</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">' +
          esc_(r[1]) +
          "</td></tr>"
        );
      })
      .join("") +
    '</table><p style="color:#666">Reply to this email to contact the sender.</p></div>';

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

  var text =
    "New job application\n\n" +
    rows
      .map(function (r) {
        return r[0] + ": " + r[1];
      })
      .join("\n");
  var html =
    '<div style="font-family:Arial,sans-serif;font-size:14px;color:#222">' +
    '<h2 style="margin:0 0 12px">New job application</h2>' +
    '<table cellpadding="6" style="border-collapse:collapse">' +
    rows
      .map(function (r) {
        return (
          '<tr><td style="font-weight:bold;border-bottom:1px solid #eee">' +
          esc_(r[0]) +
          '</td><td style="border-bottom:1px solid #eee">' +
          esc_(r[1]) +
          "</td></tr>"
        );
      })
      .join("") +
    '</table><p style="color:#666">' +
    (attachments.length > 1
      ? "Resume and cover letter are attached."
      : "Resume is attached (no cover letter provided).") +
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

/** Run once from the editor to set up sheet tabs, check mail delivery, and grant permissions. */
function testEmail() {
  try {
    setup();
  } catch (_) {}
  MailApp.sendEmail({
    to: TO_EMAIL,
    bcc: BCC_EMAILS,
    name: "AEPL Website",
    subject: "AEPL website enquiry form – test email",
    body: "If you can read this, the enquiry form mailer is working (To: info@adaptive-engg.com, BCC: mayank.thacker@honestsol.com, support@honestsol.com).",
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
