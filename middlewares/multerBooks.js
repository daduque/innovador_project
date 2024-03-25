const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname + '/../public/images/books'));
    },
    
    filename: (req, file, cb)=>{
        cb(null, req.body.title + '_' + 'cover' + path.extname(file.originalname));
    }
})

const upload = multer({storage : storage});

module.exports = upload;