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
    ref:"tourFolder"
}
});

// Creating a tourFile Model from that Schema
const tourFile = mongoose.model("tourFile", modelFileSchema);

// Exporting the tourFile Model to use it in app.js File.
module.exports = tourFile;