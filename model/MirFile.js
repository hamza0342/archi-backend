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
    ref:"MIR"
}
});

// Creating a tourFile Model from that Schema
const mirFile = mongoose.model("mirFile", modelFileSchema);

// Exporting the tourFile Model to use it in app.js File.
module.exports = mirFile;