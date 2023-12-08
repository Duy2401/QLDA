const Department = require("../models/Department");
const Project = require("../models/Project");
const User = require("../models/User");

const departmentController = {
  //Create Department => for admin
  createDeparment: async (req, res) => {
    try {
      const newDepartment = new Department({
        departmentName: req.body.departmentName,
        manage: req.body.manage,
        users: req.body.users,
        projects: req.body.projects,
      });
      const saveDepartment = await newDepartment.save();
      if (req.body.manage) {
        const users = User.findById(req.body.manage);
        await users.updateMany({
          $set: { isRole: 2003, OfDepartment: saveDepartment._id },
        });
      }
      if (req.body.projects) {
        const project = Project.findById(req.body.projects);
        await project.updateMany({
          $set: { department: saveDepartment._id },
        });
      }
      if (req.body.users) {
        const users = User.findById(req.body.manage);
        await users.updateMany({
          $set: { OfDepartment: saveDepartment._id },
        });
      }
      if (req.body.users === req.body.manage) {
        const users = User.findById(req.body.manage);
        await users.updateMany({
          $set: { OfDepartment: saveDepartment._id },
        });
      }
      return res.status(200).json(saveDepartment);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //Delete Department => for admin
  deleteDepartment: async (req, res) => {
    try {
      await Department.findByIdAndDelete(req.params.id);
      await User.updateOne(
        { OfDepartment: req.params.id },
        { $set: { OfDepartment: null } },
        { $set: { isRole: 2001 } }
      );
      await Project.updateMany({
        $set: { department: null },
      });
      return res.status(200).json("Delete Department Successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Get All Department => for admin
  getAllDepartments: async (req, res) => {
    try {
      const departments = await Department.find()
        .populate("users")
        .populate("manage")
        .populate({
          path: "projects",
          populate: { path: "users" },
        })
        .populate({
          path: "projects",
          populate: { path: "tasks" },
        });
      res.status(200).json(departments);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Get A Department
  getADepartment: async (req, res) => {
    try {
      const department = await Department.findById(req.params.id)
        .populate("users")
        .populate("manage")
        .populate({
          path: "projects",
          populate: { path: "users" },
        })
        .populate({
          path: "projects",
          populate: { path: "tasks" },
        });
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Update Department
  updateDepartment: async (req, res) => {
    try {
      const department = await Department.findById(req.params.id);
      await department.updateOne({ $set: req.body });
      return res.status(200).json("Update Department Successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Remove User get out the department
  removeUserInDepartment: async (req, res) => {
    try {
      await Department.updateOne({
        $pull: { users: req.params.id },
      });
      const user = await User.findById(req.params.id);
      await user.updateOne({ OfDepartment: null });
      return res.status(200).json("Remove User In Department SuccessFully");
    } catch (error) {
      res.status(500).json(error);
    }
    ``;
  },
  // Add user into the department
};
module.exports = departmentController;
