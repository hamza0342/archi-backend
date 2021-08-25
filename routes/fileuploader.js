const express = require('express')
const {upload} = require('../helpers/filehelper')
const {singleFileUpload, multiFileUpload, getAllSingleFiles, getAllMultipleFiles} = require('../controller/fileuploader')

const router = express.Router()

router.post('/singleFile', upload.single('file'),singleFileUpload)
console.log(singleFileUpload)
router.post('/multipleFiles', upload.array('files'), multiFileUpload)
router.get('/getSingleFile', getAllSingleFiles)
router.get("/getMultipleFiles", getAllMultipleFiles)


module.exports = router