// backend/utils/sendStatusEmail.js
const nodemailer = require('nodemailer');

async function sendStatusEmail(to, status, firstName) {
  // 1️⃣ Configure transporter (same as your forgotPassword)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // 2️⃣ Determine subject and HTML message
  let subject = '';
  let html = '';

  if (status === 'approved') {
    subject = 'Your LMS Account is Approved!';
    html = `
      <p>Hello ${firstName || 'User'},</p>
      <p>🎉 Good news! Your LMS account has been <strong>approved</strong>.</p>
      <p>You can now <a href="${process.env.FRONTEND_URL || FRONTEND_URL_MOBILE}/login" style="color:#1976d2;">log in</a> and start using our services immediately.</p>
      <p>We’re excited to have you on board!</p>
      <br>
      <p>Thanks,<br/>The LMS Team</p>
    `;
  } else if (status === 'rejected') {
    subject = 'Your LMS Account Request was Rejected';
    html = `
      <p>Hello ${firstName || 'User'},</p>
      <p>We’re sorry to inform you that your LMS account request has been <strong>rejected</strong>.</p>
      <p>If you think this was a mistake or have questions, please contact our support team at <a href="mailto:support@lms.com">support@lms.com</a>.</p>
      <br>
      <p>Thanks,<br/>The LMS Team</p>
    `;
  } else {
    return; // do nothing for other statuses
  }

  // 3️⃣ Send email
  await transporter.sendMail({
    from: `"LMS Team" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}

module.exports = sendStatusEmail;
