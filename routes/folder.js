var express = require('express');
var {projectById} = require("../controller/project")
var {createFolder,folderByProject , deleteFolder} = require("../controller/folder")
var { clientRequireSignin } = require("../controller/auth")
var router = express.Router();



router.post("/folder/new/:projectId",createFolder);
router.get("/folder/by/:projectId",clientRequireSignin, folderByProject);
router.delete("/folder/delete/:folderId",clientRequireSignin,deleteFolder);
router.param("projectId",projectById);


module.exports = router;
