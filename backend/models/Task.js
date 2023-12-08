const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  taskName: {
    type: String,
    require: true,
    unique: true,
  },
  createUser: {
    type: String,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  dateStart: {
    type: Date,
    require: true,
  },
  dateEnd: {
    type: Date,
    require: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    require: true,
  },
  fileSource: {
    type: Buffer,
    require: true,
    default: null,
  },
  status: {
    type: Number,
    require: true,
    default: "111",
  },
});
module.exports = mongoose.model("Task", taskSchema);
