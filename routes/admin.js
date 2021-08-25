var express = require("express")
var { adminById, allAdmin, getAdmin, updateAdmin, deleteAdmin, deleteClient, deleteSC } =  require("../controller/admin")
var {requireSignin} = require("../controller/auth")

var router = express.Router();

router.get("/admins", allAdmin)
router.get("/admin/:adminId",requireSignin, getAdmin)
router.put("/admin/:adminId",requireSignin, updateAdmin)
router.delete("/admin/:adminId", requireSignin, deleteAdmin)
router.delete("/deleteclient", requireSignin, deleteClient);
router.delete("/deletesc", requireSignin, deleteSC);

router.param("adminId", adminById)

module.exports=router