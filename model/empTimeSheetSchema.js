const mongoose = require('mongoose');

let empTimeSheetSchema = new mongoose.Schema({
    clockIn: {
        type : String ,
        required :true, 
    },
    clockOut: {
        type : String , 
        required: true,
    },
    clockInIp: {
        type : String , 
        required: true,
    },
    hourslogged: {
        type : Number , 
        required: true,
    },
    workingFrom: {
        type : String , 
        required: true,
    },
    totalWorkingDay: {
        type : String , 
        required: true,
    },
    dayPresent: {
        type : String , 
        required: true,
    },
    halfDay: {
        type : String , 
        required: true,
    },
    daysAbsent: {
        type : String , 
        required: true,
    },
    daysLate: {
        type : String , 
        required: true,
    },
    daysHolidays: {
        type : String , 
        required: true,
    },
    empId: {
        type: mongoose.Types.ObjectId,
        ref: "employee",
        require: true,
      },
    // empImage: {
    //     type : String , 
    //     required: true,
    // },
    isActive: {
        type : String , 
        default: true,
    },
});
empTimeSheetSchema.set("timestamps", true);

module.exports = mongoose.model("timesheet", empTimeSheetSchema);