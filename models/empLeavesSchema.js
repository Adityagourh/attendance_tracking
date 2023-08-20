const mongoose = require('mongoose');

let empLeaveSchema = new mongoose.Schema({
    totalLeaves: {
        type : Number ,
        default : 22, 
    },
    casualLeaves: {
        type : Number , 
        default : 10,
    },
    sickLeaves: {
        type : Number , 
        default : 10,
    },
    leaveType: {
        type : String , 
        default : "paid",
    },
    startDate : {
        type : Date, 
        require : true, 
    },
    endDate : {
        type : Date , 
        require : true ,
    },
    status: {
        type : String , 
        default : "panding" ,
    },
    message: {
        type : String , 
        default :"",
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
empLeaveSchema.set("timestamps", true);

module.exports = mongoose.model("leaves", empLeaveSchema);