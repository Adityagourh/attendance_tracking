const express = require("express");
const notification = require("../controller/notificationController")
let notificationRouter = express.Router();

notificationRouter.post("/create/:email", notification.createNotification);
notificationRouter.patch("/update/:id", notification.updateNotification);
notificationRouter.patch("/delete/:id", notification.deleteNotification);

module.exports = notificationRouter;
