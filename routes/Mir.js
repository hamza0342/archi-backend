var express = require('express');
var {createMir,MirByProject , deleteMir} = require("../controller/Mir")
var { clientRequireSignin } = require("../controller/auth")
var router = express.Router();



router.post("/mir/new/:projectId",createMir);
router.get("/mir/by/:projectId",MirByProject);
router.delete("/mir/delete/:MirId",deleteMir);

module.exports = router