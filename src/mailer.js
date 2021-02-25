import nodemailer from 'nodemailer';

const from = '"Bookworm" <info@bookworm.com>';

function setup() {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
}

export default function sendConfirmationEmail(user) {
    const transport = setup();
    const email = {
        from,
        to: user.email,
        subject: "welcome to Bookworm",
        text: `
        welcome to Bookworm. please , confirm your email.

        ${user.generateConfirmationUrl()}
        `
    };

    transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Reset Password",
    text: `
    To reset password follow this link
    ${user.generateResetPasswordLink()}
    `
  };

  tranport.sendMail(email);
}