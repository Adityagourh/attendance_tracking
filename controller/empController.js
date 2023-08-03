const empSchema = require("../model/empSchema");
const {transporter} = require("../services/emailService");
const { unlinkSync } = require("fs");
const bcrypt = require("bcrypt");
const logger = require("../utils/empLogger");
const jwt = require("jsonwebtoken");
const path = require("path");
const authService =require("../services/authService")

module.exports = {
 // Create employee API
  createEmployee: async (req, res) => {
    try {
      let salt = await bcrypt.genSalt(10);
      let empDetails = new empSchema(req.body);
      let isEmailExists = await authService.isEmailExists(empDetails.empEmail)
      if (isEmailExists) {
          logger.log("error", "Employee already exists");
          res.status(401).json({
          success: false,
          message: "Employee already exists",
        });
      } else {
        empDetails.empPassword = await bcrypt.hash(
          req.body.empPassword,
          salt
        );
        if (empDetails.empGender === "Male") {
          const filePath = path.join(__dirname, "..", "uploads/male.jpeg");
          empDetails.profilePic = filePath;
        } else if(empDetails.empGender === "Female"){
          const filePath = path.join(__dirname, "..", "uploads/female.png");
          empDetails.profilePic = filePath;
        }
        let employee = await empDetails.save();
        logger.log("info", "Employee register successfully");
        res.status(201).json({
          suceess: true,
          message: "Employee register successfully",
          empDetails: employee,
        });
      }
    } catch (error) {
      logger.log("error", error.message); // Log the error here
      res.status(500).json({
        suceess: false,
        error: error.message,
      });
    }
  },

  // Login user API
  empLogin: async (req, res) => {
    try {
      let {empEmail , empPassword} = await req.body;
      let {value, token} = await authService.validateEmployee(empEmail, empPassword);
      if (value) { 
          logger.log("info", "Employee login successfully");
          res.status(200).json({
            success: true,
            message: "Employee login successfully",
            token: token,
          });
         }
      // else {
      //     logger.log("error", "Wrong email or password");
      //     res.status(403).json({
      //       success: false,
      //       message: "Wrong email or password",
      //     });
      //   }
      // }
       else {
        logger.log("error", "Wrong email address");
        res.status(403).json({
          success: false,
          message: "Wrong email or password",
        });
      }
    } catch (error) {
      logger.log("error", error.message); // Log the error here
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  //Employee  Send Email for reset password API
  sendResetLink: async (req, res) => {
    const { empEmail } = req.body;
    try {
      const empData = await empSchema.findOne({
        empEmail: req.body.empEmail,
      });
      if (empData != null) {
        const secret = empData._id + process.env.SECRET_KEY;
        const token = jwt.sign({ empID: empData._id }, secret, {
          expiresIn: "20m",
        });
        const link = `http://127.0.0.1:3000/employee/reset-password/${empData._id}/${token}`;
        let info = await transporter.sendMail({
          from: "aditya.ca777@gmail.com",
          to: empEmail,
          subject: "reset password link",
          html: `<a href=${link}>click here</a>`,
        });
        logger.log("info", "Email; send successfully")
        return res.status(201).json({
          success: true,
          message: "Email sent sucessfully",
          token: token,
          userID: empData._id,
        });
      } else {
        logger.log("error", "Email send failed")
        res.status(403).json({
          success: false,
          message: "Please enter valid email",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occur ${error.message}`,
      });
    }
  },

  //Reset Password
  resetPassword: async (req,res) => {
    let {id , token} = req.params;
    let {newPassword, confirmPassword} = req.body;
    try{
        const checkEmp = await empSchema.findById(id);
        if(checkEmp != null){
            const secretKey = checkEmp._id + process.env.SECRET_KEY;
            jwt.verify(token , secretKey);
            if(newPassword === confirmPassword){
                const salt = await bcrypt.genSalt(10);
                const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
                console.log(bcryptPassword)
                await empSchema.findByIdAndUpdate(checkEmp._id, {
                    $set: { empPassword: bcryptPassword },
                });
                logger.log("info", "Password reset successfully")
                res.status(203).json({
                    success: true,
                    message: "Password reset successfully",
                  });
                } else {
                  res.status(401).json({
                    success: false,
                    message: "New password and confirm password is not same",
                  });
                }
            } else {
                res.status(403).json({
                  success: false,
                  message: "User id is not found",
                });
            }
     }catch(error){
        res.status(500).json({
            success: false,
            error: `error occured ${error.message}`,
        })
    }
  }
};
