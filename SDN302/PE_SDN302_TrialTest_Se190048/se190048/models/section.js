const mongoose = require("mongoose");
const sectionSchema = new mongoose.Schema(
  {
    sectionName: { type: String, require: true },
    sectionDescription: { type: String, require: true },
    duration: { type: Number, require: true },
    isMainTask: { type: Boolean, default: false },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      require: true,
    },
  },
  {
    timestamps: true,
  },
);
const Section = mongoose.model("section", sectionSchema);
module.exports = Section;
