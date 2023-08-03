const empSchema = require('../model/empSchema');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

// Method to check if an email exists in the database
let isEmailExists = async (email) => {

  let value = false;
  let emailFound = await empSchema.findOne({ 
    empEmail: email
  })
  if(emailFound){
    value = true; 
  }
  return value;
}

let validateEmployee = async (email, password = 0) => {
  let token = "";
  let value = false;
  let empData = await empSchema.findOne({
      empEmail: email
  })
  if(empData){
    const hashPassword = await bcrypt.compare(
      password,
      empData.empPassword
      );
     if (empData && hashPassword) {
      const secret = empData._id + process.env.SECRET_KEY;
      token = jwt.sign({ employeeID: empData._id }, secret, {
        expiresIn: "20m",
      });
      value = true; 
  }
 }
 return {value, token, }
}

module.exports = {isEmailExists, validateEmployee};