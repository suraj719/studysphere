const Task = require("../models/taskmodel");

const updatetodo = async (req, res) => {
  try {
    // const { id: postid } = req.params;
    const ques = await Task.findOneAndUpdate(
      { email: req.body.email },
      {
        $push: { tasks: req.body.task },
      },
      {
        new: true,
      }
    );
    res.status(200).json({ ques });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find({});
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { email: em } = req.params;
    const task = await Task.findOne({ email: em });
    if (!task) {
      return res.status(404).json({ msg: `no task found with id ${em}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  const { id: taskid } = req.params;
  try {
    const ques = await Task.updateOne(
      { email: req.body.email, "tasks._id": taskid },
      {
        $set: {
          "tasks.$.title": req.body.title,
          "tasks.$.description": req.body.description,
        },
      }
    );
    res.status(200).json({ ques });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  const { id: taskid } = req.params;
  try {
    const ques = await Task.findOneAndUpdate(
      { email: req.body.email },
      {
        $pull: { tasks: { _id: taskid } },
      },
      {
        new: true,
      }
    );
    res.status(200).json({ ques });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateCompl = async (req, res) => {
  const { id: taskid } = req.params;
  try {
    const ques = await Task.updateOne(
      { email: req.body.email, "tasks._id": taskid },
      {
        $set: {
          "tasks.$.completed": req.body.completed,
        },
      }
    );
    res.status(200).json({ ques });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  updateCompl,
  updatetodo,
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
