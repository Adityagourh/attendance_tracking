const empSchema   = require('../model/empSchema');

module.exports = {
    createEmployee: async (req,res)=> {
        try{
            let employeeDetails = await empSchema(req.body);
            let isEmpExist = await empSchema.findOne({
                empEmail: req.body.empEmail
            })
            if(isEmpExist) {
                res.status(401).json({
                    success: false,
                    message: "Employee already exists",
                })
            }else{
             let employee = await employeeDetails.save()
             res.status(200).json({
                suceess: true,
                message: "Employee register successfully",
             }) 
            }
        }catch(error){
              res.status(500).json({
                suceess: false,
                error: error.message,
              })
        }
    }
}