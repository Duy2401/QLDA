const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");
const taskController = {
  // Create task
  createTask: async (req, res) => {
    try {
      const newTask = new Task({
        taskName: req.body.taskName,
        createUser: req.body.createUser,
        description: req.body.description,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        user: req.body.user,
        project: req.body.project,
        status: req.body.status,
      });
      const saveTask = await newTask.save();
      if (req.body.project) {
        const project = Project.findById(req.body.project);
        await project.updateMany({ $push: { tasks: saveTask._id } });
      }
      if (req.body.user) {
        const user = User.findById(req.body.user);
        await user.updateOne({ $push: { tasks: saveTask._id } });
      }
      res.status(200).json("Create Task Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Delete task
  deleteTask: async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      await Project.updateMany(
        { tasks: req.params.id },
        { $pull: { tasks: req.params.id } }
      );
      await User.updateMany(
        { tasks: req.params.id },
        { $pull: { tasks: req.params.id } }
      );
      res.status(200).json("Delete Task Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Get All Tasks
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find().populate("user");
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // GET A TASK
  getATask: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id).populate({
        path: "user",
      });
      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Update task
  updateTask: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      await task.updateOne({ $set: req.body });
      res.status(200).json("Update Task Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // ADD task for staff
  updateStatusTask: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      await task.updateOne({ $set: { ...req.body, status: req.body.status } });
      return res.status(200).json("Upate thành công");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Search Tasks
  searchTask: async (req, res) => {
    const searchValue = new RegExp(req.params.title, "i");
    if (searchValue !== "") {
      try {
        const search_result = await Task.find({
          taskName: searchValue,
        })
          .populate("user")
          .populate("project");
        return res.status(200).json(search_result);
      } catch (error) {
        return res.status(404).json(error);
      }
    } else {
      return res.status(404).json("There are no values in the system");
    }
  },
};
module.exports = taskController;
