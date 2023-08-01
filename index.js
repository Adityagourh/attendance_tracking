require("dotenv").config();
require("./config/modelConfig");
const logger = require("./utils/empLogger")
const express = require('express');
const mainRouter = require('./routes/mainRoutes');
const app = express();

app.use(express.json())
app.use('/', mainRouter)
app.listen(process.env.PORT, (req, res)=>{
    logger.info(`Listener is working on port ${process.env.PORT}`);
})