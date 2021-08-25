var express = require('express');
var {getProject, createProject, projectByAdmin, projectById, isPoster, deleteProject, updateProject, singleProject, comment, uncomment, addSubContractor} = require("../controller/project")
var { clientRequireSignin } = require("../controller/auth")
var {createProjectValidator} = require("../validator/index")
var {clientById, subContractorSignup} = require("../controller/client")
var router = express.Router();

router.get("/projects",getProject)
router.get("/project/:projectId", singleProject)
router.post("/project/new/:clientId",clientRequireSignin,createProjectValidator,createProject)
router.get("/project/by/:clientId", clientRequireSignin, projectByAdmin)
router.delete("/project/:projectId", clientRequireSignin, deleteProject)
router.put("/project/update/:projectId", clientRequireSignin, updateProject)
router.put("/project/addTeamMember", clientRequireSignin, addSubContractor)
router.put("/project/comment", clientRequireSignin, comment)
router.put("/project/uncomment", clientRequireSignin, uncomment)


router.param("clientId",clientById)

router.param("projectId",projectById)

module.exports = router;

// 
// 