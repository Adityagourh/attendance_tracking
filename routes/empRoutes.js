let express = require('express');
let employee = require('../controller/empController')
 
let router= express.Router();

router.post("/create", employee.createEmployee);

module.exports = router;