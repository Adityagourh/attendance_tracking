let empSchema = require("../../models/empSchema");
let logger = require("../../utils/adminLogger")
//admin authorization
let adminAuth = async (req, res, next) => {
  let id = req.params.id;
  let adminData = await empSchema.findById(id);
  if (adminData) {
    if (adminData.empRole === "admin") {
      next();
    } else {
      logger.log('error', 'Invalid admin role')
      res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid user",
    });
  }
};

module.exports = { adminAuth };
