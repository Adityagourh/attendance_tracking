require("dotenv").config();
require("./config/modelConfig");
const logger = require("./utils/empSystemLogger")
const express = require('express');
const urls = require('./urls');
const app = express();

app.use(express.json())
app.use('/', urls)

//Listener 
app.listen(process.env.PORT, (req, res)=>{
    logger.info(`Server is running on port ${process.env.PORT}`);
})