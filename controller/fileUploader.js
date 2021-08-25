const SingleFile = require("../model/singleFile")
const MultipleFile = require("../model/multipleFile")

const singleFileUpload = async (req, res, next) =>{
    try{
        const file = new SingleFile({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimeType,
            fileSize: fileSizeFormatter(req.file.size, 2) 
        })
        console.log(file.filePath)
        file.save()
        console.log(file)
        res.status(201).send("File uploaded successfully")

    }catch(e){
        res.status(400).send(e.message)
    }
}

const multiFileUpload = async (req, res, next) =>{
    console.log("haris here")
    try{
        let filesArray = [];
        req.files.forEach(element =>{
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimeType,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file)
        })
        const multipleFiles =  new MultipleFile({
            title: req.body.title,
            files: filesArray
        });
        console.log(multipleFiles)
        multipleFiles.save()
        res.status(201).send('Files Upload Successfully')
    } catch(e){
        res.status(400).send(e.message)
    }
}

const fileSizeFormatter = (bytes, decimal) =>{
    if(bytes ===0 ){
        return "0 bytes"
    }
    const dm = decimal || 2
    const sizes = ['Bytes','KB','MB','GB','TB','PB','EB','YB','ZB']
    const index = Math.floor(Math.log(bytes) / Math.log(1000))
    return parseFloat((bytes / Math.pow(1000,index)).toFixed(dm)) + " " +sizes[index]
}

const getAllSingleFiles = async(req, res, next) =>{
    try{
        const files =await SingleFile.find()
        res.status(200).send(files)
    }catch(e){
        res.status(400).send(e.message)
    }
}

const getAllMultipleFiles = async(req, res, next) =>{
    try{
        const files =await MultipleFile.find()
        res.status(200).send(files)
    }catch(e){
        res.status(400).send(e.message)
    }
}

module.exports = {
    singleFileUpload,
    multiFileUpload,
    getAllSingleFiles,
    getAllMultipleFiles
}