var express = require("express");
var memberRouter = express.Router();
const memberController = require("../controllers/memberController");

memberRouter.route("/login").post(memberController.login);
memberRouter
  .route("/signin")
  .get(memberController.showSigninPage)
  .post(memberController.signin);

module.exports = memberRouter;
