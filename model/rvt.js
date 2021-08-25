const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

// Creating a Schema for uploaded files
const modelFileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: [true, "Uploaded file must have a name"],
  },
  image:{
    type:String
  },
  belongsTo:{
    type:ObjectId,
    ref:"Project"
}
});

// Creating a tourFile Model from that Schema
const rvt = mongoose.model("rvt", modelFileSchema);

// Exporting the tourFile Model to use it in app.js File.
module.exports = rvt;