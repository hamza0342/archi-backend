const tourFolder = require('../model/360tourFolder')



exports.createtourFolder = (req,res) =>{
   console.log("In tourFolder Controller")
    console.log(req.body)
    console.log(req.params.projectId)
    let tourfolder = new tourFolder({
        title:req.body.title
    })
    console.log("Creating tourFolder ", req.body)
    let projectId = req.params.projectId; 
    console.log(projectId)
    tourfolder.belongsTo = projectId

    tourfolder.save((err,result)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.status(200).json({
            message:"folder created"+result
        })
    })
}

exports.tourFolderByProject = (req, res) =>{
    
    let projectId = req.params.projectId
    console.log(projectId)
    tourFolder.find({
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


exports.deletetourFolder = (req,res)=>{
    let tourFolderId= req.params.tourfolderId
    console.log(tourFolderId);
    tourFolder.findOne({_id:tourFolderId}).then((resp)=>{
        console.log(resp._id)
        tourFolder.deleteOne({_id:tourFolderId})
        .then(()=>{
            res.status(400).json( resp._id + " deleted")
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }).catch(()=>{
        res.send("tourFolder doesnot exist")
    })
}


