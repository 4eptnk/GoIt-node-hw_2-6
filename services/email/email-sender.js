const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
require("dotenv").config();

class CreateSenderSendgrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return await sgMail.send({ ...msg, from: "Polivizator@outlook.com" });
  }
}

class CreateSenderNodemailer {
  async send(msg) {
    const config = {
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: true,
      auth: {
        user: "Polivizator@outlook.com",
        pass: process.env.PASSWORD,
      },
    };
    const transporter = nodemailer.createTransport(config);
    return await transporter.sendMail({
      ...msg,
      from: "Polivizator@outlook.com",
    });
  }
}

module.exports = { CreateSenderNodemailer, CreateSenderSendgrid };
