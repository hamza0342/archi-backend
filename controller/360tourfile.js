const { model } = require('mongoose')
const tourModelFile = require('../model/36tourFile')


exports.saveFile = (req,res) =>{
    console.log("In model file  Controller")
    console.log(req.body.name)
    console.log(req.file.path)
    console.log(req.params.folderId)
    let file = new tourModelFile({
        name :  req.body.name,
        image: req.file.path
    })
    console.log("Creating File ", req.body)
    let folderId = req.params.folderId; 
    console.log(folderId)
    file.belongsTo = folderId

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


exports.getFiledata = async(req, res, next) =>{
    try{
        console.log("In get file ")
        console.log("FolderId==>",req.params.folderId)
        const folderId = req.params.folderId
        const files =await tourModelFile.find({belongsTo:folderId})
        files.map((file)=>{
            console.log(file._id)
        })
        res.status(200).send(files)
        res.end()
    }catch(e){
        res.status(400).send(e.message)
    }
}

exports.deleteFile = (req,res)=>{
    let fileId= req.params.fileId
    tourModelFile.findOne({_id:fileId}).then((resp)=>{
            console.log(res._id)
        tourModelFile.deleteOne({_id:fileId}).then((resp)=>{
            res.status(400).json({message:"Deleted"})
        }).catch((err)=>{
            res.status(400).json({
                error:"Can't delete"
            })
        })

    }).catch((err)=>{
        res.status(400).json({
            error:"No File found"
        })
    })
   

}