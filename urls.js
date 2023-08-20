const  express = require("express");
const  empRouter = require("./employee_app/routes/empRoutes");
const  timeSheetRouter = require('./employee_app/routes/timeSheetRouter')
const empLeave = require('./employee_app/routes/empLeavesRoutes');
const adminRouter = require('./admin_app/routes/adminRoutes');
const notificationRouter = require("./admin_app/routes/notificationRoutes");
const banchRouter = require('./admin_app/routes/banchRoutes')
const  mainRoutes = express.Router();

mainRoutes.use("/employee", empRouter);
mainRoutes.use("/timesheet", timeSheetRouter);
mainRoutes.use("/leave", empLeave);
mainRoutes.use("/admin", adminRouter);
mainRoutes.use("/banch", banchRouter);
mainRoutes.use("/notification", notificationRouter);

module.exports = mainRoutes;
