/**
 * Adaptive Engineering – Website leads → Google Sheet (+ email for enquiries)
 *
 * Handles two form types posted from the website:
 *   formType = "enquiry"   → sheet "Enquiries" AND an email to the recipients below (Contact / Home page form)
 *   formType = "brochure"  → sheet "Brochure Downloads" only (Learn more / Resources downloads)
 *
 * Setup:
 * 1. Create a Google Sheet. Extensions → Apps Script. Paste this file into Code.gs.
 * 2. Run `setup` once from the editor (authorize when asked).
 * 3. Deploy → New deployment → Type: Web app
 *      Execute as: Me
 *      Who has access: Anyone
 *    Copy the Web app URL (ends with /exec) into web/.env.local as NEXT_PUBLIC_SHEET_ENDPOINT
 *    (and into Netlify → Site configuration → Environment variables).
 * 4. Optional: run `testEnquiryEmail` once to confirm delivery (and grant the email permission).
 *
 * After editing this script: Deploy → Manage deployments → Edit → Version: New version
 * (keeps the same URL). Adding email needs a one-time re-authorisation (Gmail "send email" permission).
 */

// Enquiry email recipients – same as the careers form. Fixed here (not taken from the request).
const ENQUIRY_TO = 'info@adaptive-engg.com,mayank.thacker@honestsol.com';
const ENQUIRY_BCC = 'support@honestsol.com';

const SHEETS = {
  enquiry: {
    name: 'Enquiries',
    headers: ['Timestamp', 'Full Name', 'Company', 'Designation', 'Email', 'Phone', 'City',
              'Interest', 'Message', 'Consent', 'Page', 'Client Time', 'User Agent'],
    fields:  ['fullName', 'company', 'designation', 'email', 'phone', 'city',
              'interest', 'message', 'consent', 'page', 'submittedAt', 'userAgent'],
  },
  brochure: {
    name: 'Brochure Downloads',
    headers: ['Timestamp', 'Full Name', 'Company', 'Designation', 'Email', 'Phone', 'City',
              'Brochure', 'Message', 'Consent', 'Page', 'Client Time', 'User Agent'],
    fields:  ['fullName', 'company', 'designation', 'email', 'phone', 'city',
              'brochure', 'message', 'consent', 'page', 'submittedAt', 'userAgent'],
  },
};

function setup() {
  Object.keys(SHEETS).forEach(function (k) { getSheet_(k); });
  SpreadsheetApp.getActive().toast('Sheets ready: ' + Object.keys(SHEETS).map(function (k) { return SHEETS[k].name; }).join(', '));
}

function getSheet_(type) {
  const cfg = SHEETS[type];
  const ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName(cfg.name);
  if (!sheet) sheet = ss.insertSheet(cfg.name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(cfg.headers);
    sheet.getRange(1, 1, 1, cfg.headers.length)
      .setFontWeight('bold')
      .setBackground('#118674')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Prevent formula injection (e.g. a value starting with "=")
function clean_(v) {
  v = String(v == null ? '' : v).slice(0, 5000);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const p = (e && e.parameter) || {};

    // honeypot – silently ignore bots
    if (p.website) return json_({ result: 'success' });

    const type = SHEETS[p.formType] ? p.formType : 'enquiry';
    if (!p.fullName || !p.email || !p.phone) {
      return json_({ result: 'error', error: 'Missing required fields' });
    }

    const cfg = SHEETS[type];
    const row = [new Date()].concat(cfg.fields.map(function (f) { return clean_(p[f]); }));
    getSheet_(type).appendRow(row);

    // Enquiries are also emailed. The row is already saved, so an email problem
    // never loses the lead – it is just logged.
    if (type === 'enquiry') {
      try {
        sendEnquiryEmail_(p);
      } catch (mailErr) {
        console.error('Enquiry email failed: ' + mailErr);
      }
    }

    return json_({ result: 'success' });
  } catch (err) {
    return json_({ result: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ result: 'ok', message: 'AEPL lead endpoint is live.' });
}

/** Emails a Contact / enquiry form submission (same format as the careers mailer). */
function sendEnquiryEmail_(p) {
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(p.email || '');
  const rows = [
    ['Name', p.fullName],
    ['Company', p.company || '-'],
    ['Designation', p.designation || '-'],
    ['Email', p.email],
    ['Phone', p.phone],
    ['City', p.city || '-'],
    ['Interested in', p.interest || '-'],
    ['Message', p.message || '-'],
    ['Consent to contact', p.consent || '-'],
    ['Submitted from', (p.page || '') + '  ' + (p.submittedAt || '')],
  ];

  const text = 'New website enquiry\n\n' + rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n');
  const html =
    '<div style="font-family:Arial,sans-serif;font-size:14px;color:#222">' +
    '<h2 style="margin:0 0 12px">New website enquiry</h2>' +
    '<table cellpadding="6" style="border-collapse:collapse">' +
    rows.map(function (r) {
      return '<tr><td style="font-weight:bold;border-bottom:1px solid #eee;vertical-align:top">' + esc_(r[0]) +
        '</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">' + esc_(r[1]) + '</td></tr>';
    }).join('') +
    '</table><p style="color:#666">Reply to this email to contact the sender. This enquiry is also saved in the "Enquiries" sheet.</p></div>';

  const subject = 'Website Enquiry – ' + (p.interest || 'General') + ' – ' + p.fullName + (p.company ? ' (' + p.company + ')' : '');
  const mail = {
    to: ENQUIRY_TO,
    bcc: ENQUIRY_BCC,
    name: 'AEPL Website',
    subject: String(subject).slice(0, 240),
    body: text,
    htmlBody: html,
  };
  if (validEmail) mail.replyTo = p.email;
  MailApp.sendEmail(mail);
}

/** Run once from the editor to check mail delivery and grant the email permission. */
function testEnquiryEmail() {
  MailApp.sendEmail({
    to: ENQUIRY_TO,
    bcc: ENQUIRY_BCC,
    name: 'AEPL Website',
    subject: 'AEPL website enquiry form – test email',
    body: 'If you can read this, the enquiry form mailer is working.',
  });
}

function esc_(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

