const Mir = require('../model/Mir')





exports.createMir = (req,res) =>{
   console.log("In Mir Controller")
    console.log(req.body)
    let mir = new Mir(req.body)
    console.log("Creating Mir ", req.body)
    let projectId = req.params.projectId; 
    console.log(projectId)
    mir.belongsTo = projectId

    mir.save((err,result)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.status(200).json({
            mir:result
        })
    })
}

exports.MirByProject = (req, res) =>{
    
    let projectId = req.params.projectId
    console.log(projectId)
    Mir.find({
        belongsTo: projectId
    })
    .populate("belongsTo","title -_id")
    // .populate('comments.postedBy', '_id name')
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


exports.deleteMir = (req,res)=>{
    let MirId= req.params.MirId
    console.log(MirId);
    Mir.findOne({_id:MirId}).then((resp)=>{
        console.log(resp._id)
        Mir.deleteOne({_id:MirId})
        .then(()=>{
            res.status(400).json( resp._id + " deleted")
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }).catch(()=>{
        res.send("Mir doesnot exist")
    })
}
