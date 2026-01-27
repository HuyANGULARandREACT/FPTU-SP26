const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
    courseName: {type: String, require: true},
    courseDescription: {type: String, require: true}
}, {timestamps: true})
const Course = mongoose.model('course', courseSchema)
module.exports=Course