import sgMail from "@sendgrid/mail"

export const emailRegister = async (data) => {
  const { email, name, token } = data;

  sgMail.setApiKey(process.env.EMAIL_API_KEY)

  // Email Message

  const msg = {
    from: 'itsilvaudemy@gmail.com',
    to: email,
    subject: "UpTask - Confirm your account",
    text: "Confirm your account in UpTask",
    html: `<p>Hi ${name}, confirm your account in UpTask</p>
    <p>Your account is almost ready, you only have to confirm it in the next link:

    <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirm Account</a>

    <p>If you did not create this account, you can ignore the message</p>`,
  };

  sgMail.send(msg)
};

export const emailForgotPassword = async (data) => {
  const { email, name, token } = data;

  sgMail.setApiKey(process.env.EMAIL_API_KEY)

  // Email Message

  const msg = {
    from: 'itsilvaudemy@gmail.com',
    to: email,
    subject: "UpTask - Restore your Password",
    text: "Restore your Password",
    html: `<p>Hi ${name}, you have requested to restore your password</p>

    <p>Follow the next link to generate a new password:

    <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Restore your Password</a>

    <p>If you did not requested this email, you can ignore the message</p>`,
  };

  sgMail.send(msg)
};