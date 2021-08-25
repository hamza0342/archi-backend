var express = require('express');
// var {folderById} = require("../controller/project")
const {upload} = require('../helpers/filehelper')
//const sum = require('../helpers/modelfile')
var { clientRequireSignin } = require("../controller/auth")
var {saveFile , getFiledata,deleteFile} = require("../controller/rvt")
var router = express.Router();


router.post("/rvt/upload/:projectId" ,upload.single('image'),saveFile)


module.exports = router;