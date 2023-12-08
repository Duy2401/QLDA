const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const departmentSchema = new Schema({
  departmentName: {
    type: String,
    require: true,
    unique: true,
  },
  manage: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  ],
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
  ],
});

module.exports = mongoose.model("Department", departmentSchema);
