const _ =require("lodash")
var SubContractor = require("../model/subContractor")


exports.subContractorById = (req,res,next,id) =>{
    SubContractor.findById(id).exec((err, subContractor) =>{

        if(err|| !subContractor){
            return res.status(400).json({
                error:"Sub Contractor not found"
            })
        }

        req.profile = subContractor
        next()

    })
}

exports.hasAuthorization = (req, res, next) =>{
    var authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorized){
        return res.status(403).json({
            error: "Sub-Contractor is not authorized to perform this action"
        })
    }
}


exports.allSubContractors = (req, res,) =>{
    SubContractor.find((err, subContractor) =>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json({
            subContractor
        })
    }).select("name email cnic age phone address gender updated created projects")
}


exports.getSubContractor = (req,res) =>{
    console.log(req.body)
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
}

exports.updateSubContractor = (req,res, next)=>{
    let subContractor = req.profile
    subContractor = _.extend(subContractor, req.body);// extend - mutate the source object
    subContractor.updated = Date.now();
    subContractor.save((err)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                error: "You are not authorized  to perform this action"
    
            })
        }
        subContractor.hashed_password = undefined;
        subContractor.salt = undefined;
        res.json({
            subContractor
        });
    
    })    
};

exports.subContractorByClient = (req, res) =>{
    SubContractor.find({
        createdBy: req.profile._id
    })
    .populate("postedBy","_id name")
    .sort("_created")
    .exec((err, projects) => {
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json(projects)
    })
}

exports.deleteSubContractor = (req,res,next) => {
    let subContractor = req.profile
    subContractor.remove((err, subContractor)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        subContractor.hashed_password = undefined
        subContractor.salt = undefined
        res.json({
            message:"Sub-Contractor has been deleted"
        })
    })
}

exports.getProjects = (req,res) =>{
    res.json(req.profile)
}

exports.acceptProject = (req,res) =>{
    let project = req.project
    const updatedProject = {
        status: 'Accepted'
    }
    project = _.extend(project,updatedProject)
    project.updated = Date.now()
    project.save(err => {
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json(project)
    })
}