var express = require('express');
var {projectById} = require("../controller/project")
var {createtourFolder,tourFolderByProject , deletetourFolder} = require("../controller/360tourFolder")
var { clientRequireSignin } = require("../controller/auth")
var router = express.Router();



router.post("/tourfolder/new/:projectId",createtourFolder);
router.get("/tourfolder/by/:projectId",clientRequireSignin,tourFolderByProject);
router.delete("/tourfolder/delete/:tourfolderId",clientRequireSignin,deletetourFolder);
// router.param("projectId",projectById);


module.exports = router;
