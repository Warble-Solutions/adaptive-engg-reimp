/**
 * AEPL Careers – job application mailer (Google Apps Script web app).
 *
 * Receives the application form from /careers/<job>/ and emails it, with the
 * resume (and cover letter, if provided) attached, to the recipients below.
 *
 * SETUP (one time, ~3 minutes)
 *  1. Go to https://script.google.com → New project → paste this whole file → Save.
 *  2. Deploy → New deployment → type "Web app".
 *       Execute as: Me            (emails are sent from this Google account)
 *       Who has access: Anyone
 *  3. Authorise when asked (it needs permission to send email), then copy the Web app URL (ends with /exec).
 *  4. In Netlify → Site configuration → Environment variables, add:
 *       NEXT_PUBLIC_CAREERS_ENDPOINT = <that /exec URL>
 *     then trigger a new deploy (the value is baked in at build time).
 *  5. Optional: run testEmail() once from the editor to confirm delivery.
 *
 * If you change this file later: Deploy → Manage deployments → edit → New version.
 */

// Recipients are fixed here (not taken from the request), so the endpoint can only ever mail HR.
var RECIPIENTS = "info@adaptive-engg.com,mayank.thacker@honestsol.com";

var MAX_FILE_BYTES = 4 * 1024 * 1024; // safety net; the form already limits files to 3 MB
var ALLOWED_EXT = /\.(pdf|doc|docx)$/i;

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};

    // Honeypot – bots fill the hidden "website" field. Pretend success, send nothing.
    if (p.website) return json_({ result: "success" });

    var required = ["position", "fullName", "email", "phone", "resumeData"];
    for (var i = 0; i < required.length; i++) {
      if (!p[required[i]]) throw new Error("Missing field: " + required[i]);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(p.email)) throw new Error("Invalid email");

    var attachments = [blob_(p.resumeData, p.resumeName, p.resumeType, "Resume")];
    if (p.coverLetterData) {
      // Cover letter is optional.
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
        return '<tr><td style="font-weight:bold;border-bottom:1px solid #eee">' + esc_(r[0]) +
          '</td><td style="border-bottom:1px solid #eee">' + esc_(r[1]) + "</td></tr>";
      }).join("") +
      "</table><p style=\"color:#666\">" + (attachments.length > 1 ? "Resume and cover letter are attached." : "Resume is attached (no cover letter provided).") + " Reply to this email to contact the applicant.</p></div>";

    MailApp.sendEmail({
      to: RECIPIENTS,
      replyTo: p.email,
      name: "AEPL Careers",
      subject: "Job Application – " + p.position + " – " + p.fullName,
      body: text,
      htmlBody: html,
      attachments: attachments,
    });

    return json_({ result: "success" });
  } catch (err) {
    return json_({ result: "error", error: String(err && err.message ? err.message : err) });
  }
}

/** Run once from the editor to check mail delivery and permissions. */
function testEmail() {
  MailApp.sendEmail({
    to: RECIPIENTS,
    name: "AEPL Careers",
    subject: "AEPL Careers form – test email",
    body: "If you can read this, the careers form mailer is working.",
  });
}

function blob_(b64, name, type, fallbackName) {
  var bytes = Utilities.base64Decode(b64);
  if (bytes.length > MAX_FILE_BYTES) throw new Error(fallbackName + " is too large");
  var safe = String(name || fallbackName).replace(/[^\w.\- ()]/g, "_");
  if (!ALLOWED_EXT.test(safe)) throw new Error(fallbackName + " must be a PDF, DOC or DOCX file");
  return Utilities.newBlob(bytes, type || "application/octet-stream", safe);
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
