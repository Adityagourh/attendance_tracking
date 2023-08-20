const moment = require("moment");
const ipService = require("../services/ipService");
const empTimeSheetSchema = require("../../models/empTimeSheetSchema");

module.exports = {
  //Clock in api
  empClockIn: async (req, res) => {
    const empId = req.params.id;
    try {
      const clockInTime = new empTimeSheetSchema(req.body);
      const { empClockInIP } = await ipService.ipAddress(req.body.empClockInIP);
      clockInTime.empClockInIP = empClockInIP;
      clockInTime.empClockIn = moment().format("YYYY-MM-DD HH:mm:ss");
      clockInTime.empID = empId;
      await clockInTime.save();
      res.status(201).json({
        success: true,
        message: "Employee clock in time",
        info: clockInTime,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  //Clock out api
  empClockOut: async (req, res) => {
    try {
      const timeSheetId = req.params.id;
      const clockOutTime = await empTimeSheetSchema.findByIdAndUpdate(
        timeSheetId,
        { empClockOut: moment().format("YYYY-MM-DD HH:mm:ss") },
        { new: true }
      );
      const clockIn = moment(clockOutTime.empClockIn, "YYYY-MM-DD HH:mm:ss");
      const clockOut = moment(clockOutTime.empClockOut, "YYYY-MM-DD HH:mm:ss");
      const hoursWorked = clockOut.diff(clockIn, "hours");
      if (hoursWorked >= 8) {
        clockOutTime.empAttendanceStatus = "present";
        // Increment the presentDays if the employee is present for more than or equal to 5 hours.
        clockOutTime.empDaysPresent = parseInt(clockOutTime.empDaysPresent) + 1;
      } else {
        clockOutTime.empAttendanceStatus = "half-day";
      }
      // Calculate late clock-ins
      const expectedClockIn = moment(
        clockOutTime.empClockIn,
        "YYYY-MM-DD HH:mm:ss"
      );
      const minutesLate = clockIn.diff(expectedClockIn, "hours");
      if (minutesLate > 0) {
        // Increment the empDaysLate if the employee clocked in late.
        clockOutTime.empDaysLate = (clockOutTime.empDaysLate || 0) + 1;
      }
      clockOutTime.empHoursLoggedIn = `${hoursWorked} hours`;
      await clockOutTime.save();
      res.status(200).json({
        success: true,
        message: "Clock out successful",
        info: clockOutTime,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error!",
        error: error.message,
      });
    }
  },
};
