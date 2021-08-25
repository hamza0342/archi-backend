var express = require('express');
// var {folderById} = require("../controller/project")
const {upload} = require('../helpers/filehelper')
//const sum = require('../helpers/modelfile')
var { clientRequireSignin } = require("../controller/auth")
var {saveFile , getFiledata,deleteFile} = require("../controller/modelFile")
var router = express.Router();


router.post("/modelFile/upload/:folderId" , upload.single('image'),saveFile)
// router.put("/modelFile/upload/:folderId",upload.single('image'),saveFile)

router.get("/modelFile/get/:folderId" , clientRequireSignin ,getFiledata);


router.delete("/modelFile/delete/:fileId",deleteFile);
// router.get("/folder/by/:projectId", folderByProject);
// router.get("/modelFile/get",((req,res)=>{
//     res.send("Api called")
// }));
// router.param("folderId",folderById);


module.exports = router;