const User = require("../models/User");
const Department = require("../models/Department");
const { cloudinary } = require("../utils/cloudinary");
const userController = {
  // Get all staff iff account of admin
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find()
        .populate("OfDepartment")
        .populate({
          path: "OfProject",
          populate: { path: "tasks" },
        });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Get a user
  getAUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .populate({
          path: "OfDepartment",
          populate: { path: "manage" },
        })
        .populate({
          path: "OfDepartment",
          populate: {
            path: "projects",
            populate: { path: "manage" },
          },
        })
        .populate({
          path: "OfProject",
          populate: { path: "manage" },
        })
        .populate({
          path: "tasks",
          populate: { path: "user" },
        });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //DELETE USER
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Department.updateMany(
        { manage: req.params.id },
        { $set: { manage: null } }
      );
      await Department.updateMany(
        { users: req.params.id },
        { $pull: { users: req.params.id } }
      );
      return res.status(200).json("Delete user Successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //Update INFOR USER
  updateProfileUser: async (req, res) => {
    try {
      const profileUser = await User.findById(req.params.id);
      if (req.body.avatarUrl) {
        const result = await cloudinary.uploader.upload(req.body.avatarUrl, {
          upload_preset: "avatar_upload",
        });
        await profileUser.updateOne({
          $set: { ...req.body, avatarUrl: result.secure_url },
        });
      } else {
        await profileUser.updateOne({ $set: req.body });
      }
      return res.status(200).json("Update Infor Success");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  searchUser: async (req, res) => {
    const searchValue = new RegExp(req.params.title, "i");
    if (searchValue !== "") {
      try {
        const search_result = await User.find({
          username: searchValue,
        }).populate("OfDepartment");
        res.status(200).json(search_result);
      } catch (error) {
        return res.status(404).json(error);
      }
    } else {
      return res.status(404).json("There are no values in the system");
    }
  },
};

module.exports = userController;
