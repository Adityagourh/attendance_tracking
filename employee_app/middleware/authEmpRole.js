let empSchema = require("../../models/empSchema");
let role = async (req, res, next) => {
  let bodyEmail = await req.body.empEmail;
  let empData = await empSchema.findOne({
    empEmail: bodyEmail,
  });
  if (empData) {
    if (empData.empRole === "employee") {
      next();
    } else {
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

module.exports = { role };
