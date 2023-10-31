import nodemailer from "nodemailer";

export const emailRegister = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email information

  const info = await transport.sendMail({
    from: '"UpTask - Projects Administrator" <accounts@uptask.com>',
    to: email,
    subject: "UpTask - Confirm your account",
    text: "Confirm your account in UpTask",
    html: `<p>Hi ${name}, confirm your account in UpTask</p>
    <p>Your account is almost ready, you only have to confirm it in the next link:

    <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirm Account</a>

    <p>If you did not create this account, you can ignore the message</p>


    `,
  });
};

export const emailForgotPassword = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email Info

  const info = await transport.sendMail({
    from: '"UpTask - Projects Administrator" <accounts@uptask.com>',
    to: email,
    subject: "UpTask - Restore your Password",
    text: "Restore your Password",
    html: `<p>Hi ${name}, you have requested to restore your password</p>

    <p>Follow the next link to generate a new password:

    <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Restore your Password</a>

    <p>If you did not requested this email, you can ignore the message</p>


    `,
  });
};
