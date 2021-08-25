var express = require("express")
var { 
    signup,
    signin, 
    signout,
    subContractorSignup,
    subContractorSignin,
    subContractorSignout,
    clientSignup,
    clientSignin,
    clientSignout,
    requireSignin 
} = require("../controller/auth")
var { adminSignupValidator } = require("../validator/index")
var { adminById } = require("../controller/admin")
const { subContractorById } = require("../controller/subContractor")
const { clientById } = require("../controller/client")


var router = express.Router()


//admin
router.post("/signup", adminSignupValidator, signup)
router.post("/signin", signin)
router.get("/signout", signout)

router.param("adminId", adminById)

//general contractor

router.post("/subContractorSignup",requireSignin, adminSignupValidator, subContractorSignup)
router.post("/subContractorSignin", subContractorSignin)
router.get("/subContractorSignout", subContractorSignout)

router.param("subContractorId", subContractorById)

//client

router.post("/clientSignup",requireSignin, adminSignupValidator, clientSignup)
router.post("/clientSignin", clientSignin)
router.get("/clientSignout", clientSignout)

router.param("clientId", clientById)


module.exports = router;