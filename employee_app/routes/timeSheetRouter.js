const express = require('express');

let timeSheet = require("../controller/timeSheetController");

let router = express.Router();

router.post("/clockin/:id", timeSheet.empClockIn);
router.patch('/clockout/:id' , timeSheet.empClockOut);

module.exports = router;