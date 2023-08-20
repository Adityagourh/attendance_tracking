const express = require("express");
let admin = require("../controller/adminController");
const banch = require("../controller/banchController")
let { adminAuth } = require("../middleware/authAdmin");
let roleAuth = require('../../middlewares/isAuthRole')
let employee = require("../../employee_app/controller/empController");
let adminRouter = express.Router();

adminRouter.post("/login", roleAuth.adminRole, employee.empLogin);
adminRouter.post("/empstatus", admin.empDeskbord);
adminRouter.patch("/leaveaprovel/:id", admin.leaveAprovel);
adminRouter.patch("/update/:email", banch.changeBanchStatus);


module.exports = adminRouter;
