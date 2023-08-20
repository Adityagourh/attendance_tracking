const express = require("express");
const banch = require("../controller/banchController")
let banchRouter = express.Router();

banchRouter.get("/list", banch.employeesList);
banchRouter.get("/findemp/:letter", banch.searchEmpByParams);
module.exports = banchRouter;
