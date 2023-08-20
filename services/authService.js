const empSchema = require("../models/empSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter } = require("./emailService");
const { sendMail } = require("../services/emailService");


// Method to check if an email exists in the database
let isEmailExists = async (email) => {
  let value = false;
  let emailFound = await empSchema.findOne({
    empEmail: email,
  });
  if (emailFound) {
    value = true;
  }
  return value;
};

// login and sendresetlink
let validateEmployee = async (email, password = 0) => {
  let token = "";
  let value = false;
  let empData = await empSchema.findOne({
    empEmail: email,
  });
  if (empData) {
    const secret = empData._id + process.env.SECRET_KEY;
    const token = jwt.sign({ empID: empData._id }, secret, {
      expiresIn: "20m",
    });
    if (password == 0) {//When send reset Link on employee mail id
      const subject = "Resent password reset link";
      const link = `http://127.0.0.1:3000/employee/reset-password/${empData._id}/${token}`;
      const text = `<a href = ${link} for reset password ></a>`
      await sendMail(text, email, subject)
      return { empData, token };
    } else {//When employee want to login
      const hashPassword = await bcrypt.compare(password, empData.empPassword);
      if (empData && hashPassword) {
        value = true;
        return {value , token}
      }
    }
  }
  return { value };
};

//Set new password after login 
let setNewPassword = async (id, oldPassword, newPassword, confirmPassword) => {
  let setPassword = false;
  let oldPassMatch = false;
  const isUserExists = await empSchema.findById(id);
  if (isUserExists) {
    const hashPassword = await bcrypt.compare(
      oldPassword,
      isUserExists.empPassword
    );
    if (hashPassword) {
      oldPassMatch = true;
      if (newPassword === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
        await empSchema.findByIdAndUpdate(isUserExists._id, {
          $set: { empPassword: bcryptPassword }}, { new : true 
        });
        setPassword = true;
      }//newpass and confirm password
    } // old password is match or not
   }// user is exist or not
  return { setPassword , oldPassMatch}
};

module.exports = { isEmailExists, validateEmployee, setNewPassword };
