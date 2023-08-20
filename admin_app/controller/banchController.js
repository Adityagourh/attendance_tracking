let empSchema = require("../../models/empSchema");

module.exports = {
  employeesList: async (req, res) => {
    try {
      const list = await empSchema
        .find({
          empRole: "employee",
        })
        .select("empName empEmail  empWrokingStatus  updatedAt -_id");
      res.status(200).json({
        success: true,
        message: list,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  //Employee banch status  change
  changeBanchStatus: async (req, res) => {
    try {
      const email = req.params.email;
      const updated = req.body.updatedStatus;
      const empData = await empSchema
        .findOneAndUpdate(
          {
            empEmail: email,
          },
          {
            empWorkingStatus: updated,
          },
          { new: true }
        )
        .select("empName empEmail empWorkingStatus updateAt -_id");
      if (!empData) {
        res.status(401).json({
          success: false,
          message: "Unable to update ",
        });
      } else {
        res.status(200).json({
          success: true,
          status: empData,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  //Search employee by latter
  searchEmpByParams: async (req, res) => {
    try {
      let { letter } = req.params;
      const empData = await empSchema.aggregate([
        {
          $match: {
            empRole: "employee",
            $or: [
              { empName: { $regex: `^${letter}`, $options: "i" } },
              { empEmail: { $regex: `^${letter}`, $options: "i" } },
            ],
          },
        },
        {
          $project: {
            _id: 0,
            empName: 1,
            empEmail: 1,
            empWorkingStatus: 1,
            updatedAt: 1,
          },
        },
      ]);
      if (empData.length > 0) {
        res.status(200).json({
          success: true,
          message: "Employees found successfully.",
          empData: empData,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "No employee found",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
