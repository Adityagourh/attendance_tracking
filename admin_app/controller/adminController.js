const empSchema = require("../../models/empSchema");
const empTimeSheetSchema = require("../../models/empTimeSheetSchema");
const empLeaveSchema = require("../../models/empLeavesSchema");
const logger = require("../../utils/adminLogger");
const { sendMail } = require("../../services/emailService");
module.exports = {
  //create notification by admin to employee
  empDeskbord: async (req, res) => {
    try {
      const today = new Date();
      const startOfDay = new Date(today);
      startOfDay.setHours(0, 0, 0, 0); //Set hours (0,0,0,0) (hour, minutes,seconds, miliseconds)
      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 9999);
      const empData = await empTimeSheetSchema
        .find({
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        })
        .select("empClockIn empClockOut -_id")
        .populate({ path: "empID", select: "empName empEmail" });
      if (!empData) {
        res.status(400).json({
          success: false,
          message: "No employees were present today",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Employees data fetched successfully",
          empData: empData,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  //Leave approved or not
  leaveAprovel: async (req, res) => {
    let leaveId = req.params.id;
    let { empStatus } = req.body;
    try {
      let updateData = await empLeaveSchema.findByIdAndUpdate(
        leaveId,
        {
          $set: { status: empStatus },
        },
        { new: true }
      );
      if (!updateData) {
        res.status(400).json({
          success: false,
          message: "Employee updation failed",
        });
      } else {
        let empData = await empSchema.findById(updateData.empId);
        if (empStatus === "approved") {
          if (updateData.leaveType === "Casual") {
            updateData.casualLeaves -= 1;
          } else if (updateData.leaveType === "Sick") {
            updateData.sickLeaves -= 1;
          } else {
            updateData.totalLeaves -= 1;
          }
        }
        await updateData.save();
        //await Promise.all([updateData.save(), empNotification.save()]);
        let subject = "Leave approvel";
        let link = `Your requirest hass been ${updateData.status}`;
        let isSendMail = await sendMail(link, empData.empEmail, subject);
        if (!isSendMail) {
          res.status(403).json({
            success: false,
            message:
              "Leave application update successfully but unable to send mail",
          });
        } else {
          res.status(202).json({
            LeaveType: `${updateData.leaveType}`,
            status: `${updateData.status}`,
          });
        } //mail send or not
      } //employee fetch
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "error!",
        error: `error: ${error.message}`,
      });
    }
  },
};
