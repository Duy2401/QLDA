const Project = require("../models/Project");
const Department = require("../models/Department");
const User = require("../models/User");
const projectController = {
  //Create a project for a department
  createProject: async (req, res) => {
    try {
      const newProject = new Project({
        projectName: req.body.projectName,
        manage: req.body.manage,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        costs: req.body.costs,
        manage: req.body.manage,
        department: req.body.department,
        status: req.body.status,
        users: req.body.users,
      });
      const project = await newProject.save();
      if (req.body.department) {
        const department = Department.findById(req.body.department);
        await department.updateOne({ $push: { projects: project._id } });
      }
      if (req.body.users) {
        const users = User.findById(req.body.users);
        await users.updateOne({ $push: { OfProject: project._id } });
      }
      if (req.body.manage) {
        const users = User.findById(req.body.manage);
        await users.updateMany({
          $push: { OfProject: project._id },
          $set: { isRole: 2004 },
        });
      }
      res.status(200).json("Create Project Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //Delete the project when completed
  deleteProject: async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.params.id);
      await User.updateMany(
        { OfProject: req.params.id },
        { $pull: { OfProject: req.params.id } },
        { $set: { isRole: 2001 } }
      );
      await Department.updateMany({ $pull: { projects: req.params.id } });
      res.status(200).json("Delete Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //GET ALL PROJECT IN A DEPARTMENT
  getAllProject: async (req, res) => {
    try {
      const projects = await Project.find()
        .populate("manage")
        .populate({
          path: "tasks",
          populate: { path: "user" },
        })
        .populate({
          path: "users",
          populate: { path: "tasks" },
        });
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // GET A PROJECT
  getAProject: async (req, res) => {
    try {
      const project = await Project.findById(req.params.id)
        .populate("manage")
        .populate({
          path: "tasks",
          populate: { path: "user" },
        })
        .populate("users");
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Update Project
  updateProject: async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      await project.updateOne({ $set: req.body });
      return res.status(200).json("Update Project Successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // SearchProject
  searchProject: async (req, res) => {
    const searchValue = new RegExp(req.params.title, "i");
    if (searchValue !== "") {
      try {
        const search_result = await Project.find({
          projectName: searchValue,
        }).populate("manage");
        res.status(200).json(search_result);
      } catch (error) {
        return res.status(404).json(error);
      }
    } else {
      return res.status(404).json("There are no values in the system");
    }
  },
  // ADD Staff into Projects
  makeStaff: async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      await project.updateOne({ $push: { users: req.body.users } });
      if (req.body.users) {
        const users = User.findById(req.body.users);
        await users.updateOne({ $push: { OfProject: project._id } });
      }
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = projectController;
