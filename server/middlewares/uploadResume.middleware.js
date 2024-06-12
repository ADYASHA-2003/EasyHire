//Contains multer configuration and instance creation
const multer = require('multer')

const upload = multer({
    limits:{fileSize:300000},
    fileFilter:(req,file,cb)=>{
        if(file.mimetype !== 'application/pdf'){
            return cb(new Error('Only PDF files are allowed'))
        }
        cb(null,true)
    }
})

module.exports = upload