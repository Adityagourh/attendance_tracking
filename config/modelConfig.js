const mongoose = require("mongoose");
const logger = require("../utils/empSystemLogger");

mongoose.connect(process.env.URL, {
  useNewUrlParser: "true",
});
mongoose.connection.on("error", (err) => {
  logger.log(`error`, "mongoose Connection Error");
});
mongoose.connection.on("connected", (err, res) => {
  logger.log("info", "Mongoose is connected");
});
