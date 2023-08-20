const mongoose = require("mongoose");

const empTimeSheetSchema = new mongoose.Schema({
  empClockIn: {
    type: String,
    default:"",
  },
  empClockOut: {
    type: String,
    default: "",
  },
  empHoursLoggedIn: {
    type: String,
    default: "0",
  },
  empClockInIP: {
    type: String,
    default: "",
  },
  empWorkingFrom: {
    type: String,
    default: "",
  },
  empWorkingDays: {
    type: String,
    default: "",
  },
  empDaysPresent: {
    type: String,
    default: "" ,
  },
  empHalfDays: {
    type: String,
    default: "active",
  },
  empDaysAbsent: {
    type: String,
    default: "",
  },
  empHolidays: {
    type: String,
    default: "employee",
  },
  empDaysLate: {
    type: String,
    default: "",
  },
  empAttendanceStatus: {
    type: String,
    default: "absent",
  },
  isActive: {
    type: String,
    default: "true",
  },
  empID: {
    type: mongoose.Types.ObjectId,
    ref: "employee",
  },
});
empTimeSheetSchema.set("timestamps", true);

module.exports = mongoose.model("timeSheet", empTimeSheetSchema);