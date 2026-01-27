var express = require("express");
var memberRouter = express.Router();
const memberController = require("../controllers/memberController");

memberRouter.route("/").post( memberController.login);

module.exports = memberRouter;
