const mongoose = require('mongoose')
const uuidv1 = require("uuidv1")
const crypto = require("crypto")
const { ObjectId } = mongoose.Schema

const clientSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required: true,
        // match:[
        //     new RegExp('^[a-z]+$', 'i'),
        //     'Name Should have alphabets'
        // ]
    },
    cnic:{
        type: String,
        trim: true,
        required: true,
        unique: true

    },
    age:{
        type: Number,
        trim: true,
        required: true,
        min:1,
        max: [100, 'You are too old']
    },
    phone:{
        type: String,
        trim: true,
        required: true,
        unique: true

    },
    gender:{
        type: String,
        trim: true,
        lowercase: true,
        enum : {
            values: ['male','female','others'],
            message: '{PATH] with {VALUE} is not correct'
        },
        default: 'male'
    },
    address:{
        type: String,
        trim:true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique:true
    },
    hashed_password:{
        type: String,
        required: true

    },
    salt:String,
    created:{
        type: Date,
        default: Date.now
    },
    createdBy:{
        type: ObjectId,
        ref: "Admin"
    },
    updated: Date

})


clientSchema.virtual('password')
.set(function(password){
    this._password = password
    // generate a timestamp
    this.salt = uuidv1()
    // encrypt password
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

clientSchema.methods = {

    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function(password){
        if(!password) return "";
        try{
            return crypto
                    .createHmac("sha1", this.salt)
                    .update(password)
                    .digest('hex');
        }catch (err){
            return ""
        }
    }
}
module.exports = mongoose.model("Client", clientSchema)