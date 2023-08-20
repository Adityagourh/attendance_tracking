const nodemailer = require("nodemailer");
const empSchema = require("../models/empSchema");
const empLeaveSchema = require("../models/empLeavesSchema");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendMail = async (link, empEmail, subject) => {
  let value  = false
  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: empEmail,
    subject: subject,
    text: `<a href=${link}></a>`,
  });
// Check if the email was sent successfully
  if (info != null && info.accepted.includes(empEmail)) {
    value = true;
  }
  return value; 
};

module.exports = { transporter, sendMail };
