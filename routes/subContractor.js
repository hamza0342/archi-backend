var express = require("express")
var { subContractorById, allSubContractors, getSubContractor, updateSubContractor , deleteSubContractor, getProject, acceptProject } =  require("../controller/subContractor")
var { subContractorRequireSignin } = require("../controller/auth")
var {projectById} = require("../controller/project")


var router = express.Router();

router.get("/subContractors", allSubContractors)
router.get("/subContractor/:subContractorId",subContractorRequireSignin, getSubContractor)
router.put("/subContractor/:subContractorId",subContractorRequireSignin, updateSubContractor)
router.delete("/subContractor/:subContractorId", subContractorRequireSignin, deleteSubContractor)



router.param("subContractorId", subContractorById)
router.param("projectId",projectById)

module.exports=router