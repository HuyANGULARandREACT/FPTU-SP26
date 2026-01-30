var express = require("express");
var sectionRouter = express.Router();
const sectionController = require("../controllers/sectionController");
const authInView = require("../middleware/authInView");
sectionRouter.get("/", authInView, sectionController.getAllSections);
sectionRouter.get("/:id", sectionController.deleteSection);
module.exports = sectionRouter;
