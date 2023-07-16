const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: String,
  email: String,
  tasks: [
    {
      title: String,
      description: String,
      completed: {
        type:Boolean,
        default:false,
    },
    },
  ],
});

module.exports = mongoose.model("task", TaskSchema);
