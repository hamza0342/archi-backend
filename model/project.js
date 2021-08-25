const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: "Title is required"
    },
    description:{
        type: String,
        required: "Description is required"
    },
    postedBy:{
        type:ObjectId,
        ref:"Client"
    },
    created:{
        type:Date,
        default: Date.now
    },
    team:[{
        type: ObjectId,
        ref:"SubContrator"
    }],
    updated: Date,
    comments: [{
        text: String,
        created: {type: Date, default: Date.now},
        postedBy: {type: ObjectId, ref: "Client"},
    }]
})

module.exports = mongoose.model("Project",projectSchema)