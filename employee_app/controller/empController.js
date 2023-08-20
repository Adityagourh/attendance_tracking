const empSchema = require("../../models/empSchema");
const { unlinkSync } = require("fs");
const bcrypt = require("bcrypt");
const logger = require("../../utils/empLogger");
const jwt = require("jsonwebtoken");
const path = require("path");
const authService = require("../../services/authService");

module.exports = {
  // Create employee API
  createEmployee: async (req, res) => {
    try {
      let salt = await bcrypt.genSalt(10);
      let empDetails = new empSchema(req.body);
      let isEmailExists = await authService.isEmailExists(empDetails.empEmail);
      if (isEmailExists) {
        logger.log("error", "Employee already exists");
        res.status(401).json({
          success: false,
          message: "Employee already exists",
        });
      } else {
        empDetails.empPassword = await bcrypt.hash(req.body.empPassword, salt);
        if (empDetails.empGender === "Male") {
          const filePath = path.join(__dirname, "..", "..", "uploads/male.jpeg");
          empDetails.profilePic = filePath;
        } else if (empDetails.empGender === "Female") {
          const filePath = path.join(__dirname, "..", "..", "uploads/female.png");
          empDetails.profilePic = filePath;
        }
        let employee = await empDetails.save();
        //
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
      let { empEmail, empPassword } = await req.body;
      let { value, token } = await authService.validateEmployee(
        empEmail,
        empPassword
      );
      if (value) {
        logger.log("info", "Employee login successfully");
        res.status(200).json({
          success: true,
          message: "Employee login successfully",
          token: token,
        });
      }
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
      let { empData, token } = await authService.validateEmployee(empEmail);
      if (empData) {
        logger.log("info", "Email; send successfully");
        return res.status(201).json({
          success: true,
          message: "Email sent sucessfully",
          token: token,
          userID: empData._id,
        });
      } else {
        logger.log("error", "Email send failed");
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
  resetPassword: async (req, res) => {
    let { id, token } = req.params;
    let { newPassword, confirmPassword } = req.body;
    try {
      const checkEmp = await empSchema.findById(id);
      if (checkEmp != null) {
        const secretKey = checkEmp._id + process.env.SECRET_KEY;
        jwt.verify(token, secretKey);
        if (newPassword === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
          await empSchema.findByIdAndUpdate(checkEmp._id, {
            $set: { empPassword: bcryptPassword },
          });
          logger.log("info", "Password reset successfully");
          res.status(200).json({
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
    } catch (error) {
      res.status(500).json({
        success: false,
        error: `error occured ${error.message}`,
      });
    }
  },

  //empNewPassword
  empSetPassword: async (req, res) => {
    try {
      const { id } = req.params;
      let { oldPassword, newPassword, confirmPassword } = req.body;
      let { setPassword, oldPassMatch } = await authService.setNewPassword(
        id,
        oldPassword,
        newPassword,
        confirmPassword
      );
      if (oldPassMatch) {
        if (setPassword) {
          logger.log("info", "Password reset successfully");
          res.status(200).json({
            success: true,
            message: "Password reset  successfully",
          });
        } else {
          res.status(401).json({
            success: false,
            message: "New password and confirm password is not match",
          });
        }
      } else {
        res.status(401).json({
          success: false,
          message: "Please enter a valid oldPassword",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: `error occured ${error.message}`,
      });
    }
  },

  //profile update api
  updateProfile: async (req, res) => {
    try {
      let id = await req.params.id;
      let empData = await empSchema.findById(id);
      if (empData) {
        const filePath = `/uploads/employee/${req.file.filename}`;
        empData.profilePic = filePath;
        await empSchema.findByIdAndUpdate(
          empData._id,
          {
            $set: { profilePic: filePath },
          },
          { new: true }
        );
        res.status(201).json({
          success: true,
          message: "profile pic update successful",
        });
      } else {
        req.file ? unlinkSync(req.file.path) : null;
        res.status(401).json({
          suceess: false,
          message: `employee id not found`,
        });
      }
    } catch (error) {
      res.status(500).json({
        suceess: false,
        message: `error!`,
        error: `error occured ${error.message}`,
      });
    }
  },

  //Update address
  updateAddress: async (req, res) => {
    try {
      let empId = req.params.id;
      let empData = await empSchema.findById(empId);
      let newAddress = await req.body.newAddress;
      let address = await empSchema.findByIdAndUpdate(
        empData._id,
        {
          $set: { empAddress: newAddress },
        },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: `Address updated successful`,
        address: address,
      });
    } catch (error) {
      res.status(500).json({
        suceess: false,
        message: `error!`,
        error: `error occured ${error.message}`,
      });
    }
  },
};
