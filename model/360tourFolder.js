const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const folderSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Folder must have a name"],
        
    },

    belongsTo:{
        type:ObjectId,
        ref:"Project"
    }
    
    
})

module.exports = mongoose.model("tourFolder",folderSchema)