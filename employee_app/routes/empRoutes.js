let express = require("express");
let employee = require("../controller/empController");
const {
  empRegisValidation,
  loginEmpValidation,
} = require("../validation/empValidation");
const notification = require("../controller/notificationController");
let { upload } = require("../../middlewares/imageUpload");
let roleAuth = require("../../middlewares/isAuthRole");
let router = express.Router();

router.post("/create", empRegisValidation, employee.createEmployee);
router.post("/login", loginEmpValidation, roleAuth.empRole, employee.empLogin);
router.post("/sendemail", employee.sendResetLink);
router.patch("/resetpassword/:id/:token", employee.resetPassword);
router.patch("/newpassword/:id", employee.empSetPassword);
router.patch(
  "/updateprofile/:id",
  upload.single("profilePic"),
  employee.updateProfile
);
router.patch("/adress/:id", employee.updateAddress);
//See all notication based on employee id
router.get("/shownotification", notification.showNotification);

module.exports = router;
