const nodemailer = require("nodemailer");
/*
sending verification email using new dawn school official email
*/
const sendEmail = (email, message) => {
  try {
    const transport = nodemailer.createTransport({
     
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.TRANSPORT_EMAIL,
        pass: process.env.TRANSPORT_PASSWORD,
      },
    });
    transport.sendMail({
      from: `"E-commerce" <${process.env.TRANSPORT_EMAIL}>`,
      to: email,
      subject: "Verification ✔",
      text: "",
      html: message,
    });
  } catch (error) {
    console.log(error)
  }
};

module.exports = sendEmail;