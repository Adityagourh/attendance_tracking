const mongoose = require('mongoose');

let employeeSchema = new mongoose.Schema({
    empName: {
        type : String ,
        required :true, 
    },
    empPassword: {
        type : String , 
        required: true,
    },
    empEmail: {
        type : String , 
        required: true,
    },
    empPhone: {
        type : Number , 
        required: true,
    },
    empGender: {
        type : String , 
        required: true,
    },
    empAddress: {
        type : String , 
        default : "",
    },
    empCity: {
        type : String , 
        required: true,
    },
    profilePic: {
        type : String , 
        // ?: true,
    },
    isActive: {
        type : String , 
        default: true,
    },
});
employeeSchema.set("timestamps", true);

module.exports = mongoose.model("employee", employeeSchema);