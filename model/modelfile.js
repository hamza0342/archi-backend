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
    ref:"Folder"
}
});

// Creating a Model from that Schema
const File = mongoose.model("ModelFile", modelFileSchema);

// Exporting the Model to use it in app.js File.
module.exports = File;