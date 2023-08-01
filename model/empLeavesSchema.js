const mongoose = require('mongoose');

let empLeavesSchema = new mongoose.Schema({
    totalLeaves: {
        type : String ,
        required :true, 
    },
    casualLeaves: {
        type : String , 
        required: true,
    },
    sickLeaves: {
        type : String , 
        required: true,
    },
    leaveType: {
        type : Number , 
        required: true,
    },
    status: {
        type : String , 
        required: true,
    },
    message: {
        type : String , 
        required: true,
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
empLeavesSchema.set("timestamps", true);

module.exports = mongoose.model("leaves", empLeavesSchema);