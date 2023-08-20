let empLeavesSchema = require("../../models/empLeavesSchema");
const empSchema = require("../../models/empSchema");

module.exports = {
  leaveApply: async (req, res) => {
    try {
      let id = await req.params.id;
      let empData = await empLeavesSchema.findById(id);
      if(!empData) {
        res.status(400).json({
          success: false, 
          message: "Employee alreay exist"
        })
      }else{
      let leaveData = new empLeavesSchema(req.body);
      leaveData.empId = id;
      await leaveData.save();
      res.status(201).json({
        status: true,
        message: `Your ${leaveData.leaveType} leave request send successfully `,
        empData : leaveData
      });
      
     }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "error!",
        error: `error: ${error.message}`,
      });
    }
  },
};
