var express = require("express")
var { clientById, allClients, getClient, updateClient, deleteClient } =  require("../controller/client")
var { clientRequireSignin } = require("../controller/auth")
var {subContractorByClient} = require("../controller/subContractor")
var router = express.Router();

router.get("/clients", allClients)
router.get("/client/:clientId",clientRequireSignin, getClient)
router.put("/client/:clientId",clientRequireSignin, updateClient)
router.delete("/client/:clientId", clientRequireSignin, deleteClient)
router.get("/subContractor/by/:clientId", clientRequireSignin, subContractorByClient)
router.param("clientId", clientById)

module.exports=router