const mongoose = require("mongoose");

const schema = mongoose.Schema;
const feedbackSchema = new schema(
  {
    rating: {
      type: Number,
      require: true,
      min: 1,
      max: 5,
    },
    content: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const pattmeeSchema = new schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    price: {
      type: Number,
      require: true,
    },
    feedbacks: [feedbackSchema],
  },
  { timestamps: true }
);
const Pate = mongoose.model("pate", pateSchema);
module.exports = Pate;
