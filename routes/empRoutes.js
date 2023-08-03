let express = require("express");
let employee = require("../controller/empController");
const {
  empRegisValidation,
  loginEmpValidation,
} = require("../validation/empValidation");
let router = express.Router();

router.post("/create", empRegisValidation, employee.createEmployee);
router.post("/login", loginEmpValidation, employee.empLogin);
router.post("/sendemail", employee.sendResetLink);
router.get("/resetpassword/:id/:token", employee.resetPassword);

module.exports = router;

//let {upload} = require("../middleware/imageUpload")
