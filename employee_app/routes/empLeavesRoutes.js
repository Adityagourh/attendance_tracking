const  express = require('express');
const empLeave = require('../controller/empLeavesController'); 
let router = express.Router();

router.post('/leaveapply/:id' , empLeave.leaveApply);

module.exports = router;