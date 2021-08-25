const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,"./uploads")
    },
    filename: (req, file, cb) =>{
        cb(null,new Date().toISOString().replace(/:/g, '-')+ '-'+ file.originalname)
    }
})

// const filefilters = (req, file, cb) =>{
//     if(file.mimetype == 'application/pdf'){
//         cb(null,true)
//     }else{
//         cb(null,false)
//         return cb(new Error("only pdf allowed"))
//     }
// }

const upload = multer({storage: storage})

module.exports = { upload }