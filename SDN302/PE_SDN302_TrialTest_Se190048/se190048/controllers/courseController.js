const Course = require("../models/course");
const Section = require("../models/section");
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json({
      status: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createCourse = async (req, res) => {
  try {
    const courses = await Course.create(req.body);
    res.status(201).json({
      status: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getDetailOfCourse = async (req, res) => {
  try {
    const detailCourse = await Course.findById(req.params.id);
    if (!detailCourse) {
      return res.status(404).json({ message: "course not found" });
    }
    res.json({ status: true, data: detailCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const findCourse = await Section.countDocuments({ course: req.params });
    if (findCourse > 0)
      return res
        .status(400)
        .json({ status: false, message: "can not delete this course" });
    const detailCourse = await Course.findByIdAndDelete(req.params.id);
    if (!detailCourse) {
      return res.status(404).json({ message: "course not found" });
    }
    res.json({ status: true, data: detailCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateCourse = async (req, res) => {
  try {
    const detailCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    if (!detailCourse) {
      return res.status(404).json({ message: "course not found" });
    }
    res.json({ status: true, data: detailCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
