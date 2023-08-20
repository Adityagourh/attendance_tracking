const schema = require("./empValSchema");
const {unlinkSync} = require('fs');
module.exports = {
  empRegisValidation: async (req, res, next) => {
    const value = await schema.createEmplyee.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      req.file ? unlinkSync(req.file.path):null;//agar same name ki company ho to profile pic upload na ho 
      res.status(403).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },

  //User login validation
  loginEmpValidation: async (req, res, next) => {
    const value = await schema.loginEmpValidation.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      res.status(403).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },

};
