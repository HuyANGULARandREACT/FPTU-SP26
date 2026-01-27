var express = require("express");
var courseRouter = express.Router();
const courseController = require("../controllers/courseController");
const auth = require("../middleware/auth");

courseRouter.route("/").get(auth, courseController.getAllCourses);
courseRouter.route("/").post(courseController.createCourse);
courseRouter.route("/:id").get(courseController.getDetailOfCourse);
courseRouter.route("/:id").delete(courseController.deleteCourse);
courseRouter.route("/:id").put(courseController.updateCourse);
module.exports = courseRouter;
