let express = require('express');
let router = require("./empRoutes");

let mainRoutes = express.Router();
mainRoutes.use("/employee", router);

module.exports = mainRoutes;