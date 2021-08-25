const _ =require("lodash")
var Client = require("../model/client")
var SubContractor= require("../model/subContractor");
var Project= require("../model/project");
exports.clientById = (req,res,next,id) =>{
    Client.findById(id).exec((err, client) =>{

        if(err|| !client){
            return res.status(400).json({
                error:"Client not found"
            })
        }

        req.profile = client
        console.log(req.profile)
        next()

    })
}

exports.hasAuthorization = (req, res, next) =>{
    var authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorized){
        return res.status(403).json({
            error: "Client is not authorized to perform this action"
        })
    }
}


exports.allClients = (req, res) =>{
    Client.find((err, client) =>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json({
            client
        })
    }).select("name email cnic age phone address gender updated created")
}


exports.getClient = (req,res) =>{
    console.log(req.body)
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
}

exports.updateClient = (req,res, next)=>{
    let client = req.profile
    client = _.extend(client, req.body);// extend - mutate the source object
    client.updated = Date.now();
    client.save((err)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                error: "You are not authorized  to perform this action"
    
            })
        }
        client.hashed_password = undefined;
        client.salt = undefined;
        res.json({
            client
        });
    
    })    
};



exports.deleteClient = (req,res,next) => {
    let client = req.profile
    client.remove((err, client)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        client.hashed_password = undefined
        client.salt = undefined
        res.json({
            message:"Client has been deleted"
        })
    })
}

exports.subContractorSignup = async (req, res) => {
    console.log(req.body);
    console.log(req.auth);
    const subContractorExists = await SubContractor.findOne({ email: req.body.email });

    if (subContractorExists) {
        return res.status(403).json({
            error: "Sub Contractor is already registered",
        });
    }
    const subContractor = await new SubContractor(req.body);
    subContractor.createdBy = req.auth._id;
    subContractor.projectOf= req.projectID;
    await subContractor.save();
    res.status(200).json({
        message: "Team Member Registered succesfully",
    });
};