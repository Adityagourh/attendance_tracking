const empNotificationSchema = require("../../models/empNotification");
const empSchema = require('../../models/empSchema')

module.exports = {
  createNotification: async (req, res) => {
    try {
      const email = req.params.email;
      const empData = await empSchema.findOne({
        empEmail: email
      });
      if (!empData) {
        res.status(400).json({
          success: false,
          message: "Employee not found check email",
        });
      }else {
        const empNotification = await empNotificationSchema(req.body);
        empNotification.empID = empData._id;
        const createNoti = await empNotification.save();
        res.status(201).json({
          success: true,
          message: "Notification saved successfully",
          notification: createNoti,
        });
      }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
  },

  //Subject and message  update in notifcation 
  updateNotification: async (req, res) => {
    try {
      const id = req.params.id;
      const updateNotification = await empNotificationSchema.findByIdAndUpdate(id , 
        {
            $set:{title: req.body.title , message: req.body.message}
        },
        {new: true}
      );
      if (!updateNotification) {
        res.status(400).json({
          success: false,
          message: "Notification updation failed",
        });
      }else {
          res.status(201).json({
          success: true,
          message: "Notification updated successfully",
          notification: updateNotification,
        });
      }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
  },  
  
  //Delete a notification
  deleteNotification: async (req, res) => {
    try {
      const id = req.params.id;
      const deleteNotification = await empNotificationSchema.findByIdAndDelete(id ,{new: true});
      if (!deleteNotification) {
        res.status(400).json({
          success: false,
          message: "Notification updation failed",
        });
      }else {
          res.status(201).json({
          success: true,
          message: "Notification delete successfully",
          deletedData: deleteNotification
        });
      }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
  }, 
};
