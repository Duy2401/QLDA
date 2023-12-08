const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    minlength: 4,
    maxlength: 50,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    minLength: 4,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 6,
  },
  infor: {
    name: {
      type: String,
      default: null,
      require: true,
    },
    gender: {
      type: String,
      default: null,
      require: true,
    },
    dateOfBirth: {
      type: Date,
      default: null,
      require: true,
    },
    numberPhone: {
      type: Number,
      default: null,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    position: {
      type: String,
      require: true,
      default: null,
    },
  },
  avatarUrl: {
    type: String,
    default: null,
  },
  isRole: {
    type: Number,
    default: "2001",
    unique: false,
  },
  OfDepartment: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    default: null,
  },
  OfProject: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
      default: null,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
