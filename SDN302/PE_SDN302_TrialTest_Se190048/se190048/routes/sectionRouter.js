var express = require("express");
var sectionRouter = express.Router();
const sectionController = require("../controllers/sectionController");

sectionRouter.get("/", sectionController.getAllSections);
sectionRouter.get("/:id",sectionController.deleteSection)
module.exports = sectionRouter;
