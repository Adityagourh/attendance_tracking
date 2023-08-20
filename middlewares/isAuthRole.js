let empSchema = require("../models/empSchema");
let empLogger = require('../utils/empLogger');
let adminLogger = require("../utils/adminLogger")
//employee role authorization middleware
let empRole = async (req, res, next) => {
  let bodyEmail = await req.body.empEmail;

  let empData = await empSchema.findOne({
    empEmail: bodyEmail,
  });
  if (empData) {
    if (empData.empRole === "employee") {
      next();
    } else {
      empLogger.log("error", `Invalid role specified`)
      res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid mail id ",
    });
  }
};

//Admin role authontication
let adminRole = async (req, res, next) => {
  let bodyEmail = req.body.empEmail;
  let empData = await empSchema.findOne({
    empEmail: bodyEmail,
  });
  if (empData) {
    if (empData.empRole === "admin") {
      next();
    } else {
      adminLogger.log("error", `Invalid role specified`)
      res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid email id ",
    });
  }
};

module.exports = { empRole, adminRole };
