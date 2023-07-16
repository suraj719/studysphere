const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  name:String,
  title:String,
  description:String,
  image:String,
  answers:[{
    answer:String,
    answeredBy:String
}],
});

module.exports = mongoose.model("question", QuestionSchema);
