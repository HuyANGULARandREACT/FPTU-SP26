const Section = require("../models/section");
const Course = require("../models/course");

exports.getAllSections = async (req, res) => {
  try {
    const sections = await Section.find({}).populate("course");
    // res.json(sections);
    res.render("sections", { sections });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteSection = async (req, res) => {
  try {
    const sections = await Section.findByIdAndDelete(req.params.id);
    res.redirect("/view/sections");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
