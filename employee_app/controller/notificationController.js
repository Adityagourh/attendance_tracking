const empNotification = require("../../models/empNotification");
const empLogger = require('../../utils/empLogger');

module.exports = {
  showNotification: async (req, res) => {
    try {
      const { startDate, endDate } = req.query; // ! to use query we use ? it stands for giving query
      const notificationData = await empNotification
        .find({
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        })
        .select("title message createdAt -_id");
      if (notificationData.length === 0) {
        empLogger.log("error", "Notifications not found.");
        res.status(404).send({
          success: false,
          message: "Notifications not found.",
        });
      } else {
        empLogger.log("info", "Notifications found.");
        res.status(200).send({
          success: true,
          message: "Notifications for you.",
          data: notificationData,
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
};
