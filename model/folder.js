const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const folderSchema = new mongoose.Schema({
    title:{
        type: String,
        
    },

    belongsTo:{
        type:ObjectId,
        ref:"Project"
    }
    
    
})

module.exports = mongoose.model("Folder",folderSchema)