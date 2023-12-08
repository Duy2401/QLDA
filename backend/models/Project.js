const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new Schema({
  projectName: {
    type: String,
    require: true,
    unique: true,
  },
  manage: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
    require: true,
  },
  dateStart: {
    type: Date,
    // require: true,
  },
  dateEnd: {
    type: Date,
    // require: true,
  },
  costs: {
    type: Number,
    require: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    require: true,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
      default: null,
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      require: true,
    },
  ],
  status: {
    type: Number,
    require: true,
    default: "111",
  },
});
module.exports = mongoose.model("Project", projectSchema);
