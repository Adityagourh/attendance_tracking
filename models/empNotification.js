const mongoose = require('mongoose');

let empNotificationSchema = new mongoose.Schema({
    title: {
        type : String ,
        default : "", 
    },
    message: {
        type : String , 
        default : "",
    },
    empId: {
        type: mongoose.Types.ObjectId,
        ref: "employee",
        require: true,
      },
    isActive: {
        type : String , 
        default: true,
    },
});
empNotificationSchema.set("timestamps", true);

module.exports = mongoose.model("notification", empNotificationSchema);