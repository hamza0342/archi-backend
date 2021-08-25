const rvt = require('../model/rvt')

exports.saveFile = (req,res) =>{
    console.log("In rvt Controller")
    console.log(req.body.name)
    console.log(req.file.path)
    console.log(req.params.projectId)
    let file = new rvt({
        name :  req.body.name,
        image: req.file.path
    })
    let projectId = req.params.projectId; 
    console.log(projectId)
    file.belongsTo = projectId

    file.save((err,result)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.status(200).json({
            folder:result
        })
    })

}