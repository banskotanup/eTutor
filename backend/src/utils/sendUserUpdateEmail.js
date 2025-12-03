const nodemailer = require('nodemailer');

async function sendUserUpdateEmail(to, firstName) {
  if (!to) return;

  // 1️⃣ Configure transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true if using port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // 2️⃣ Email content
  const subject = 'Your LMS Account has been Updated ✅';
  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
      <p>Hello ${firstName || 'User'},</p>
      <p>We wanted to let you know that your account details on LMS have been successfully <strong>updated</strong>.</p>
      <p>If you did not make these changes, please contact our support team immediately at 
         <a href="mailto:support@lms.com" style="color:#1976d2; text-decoration:none;">support@lms.com</a>.
      </p>
      <br/>
      <p>Thank you for keeping your information up-to-date!</p>
      <br/>
      <p>Best regards,<br/><strong>The LMS Team</strong></p>
    </div>
  `;

  // 3️⃣ Send email
  await transporter.sendMail({
    from: `"LMS Team" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}

module.exports = sendUserUpdateEmail;
