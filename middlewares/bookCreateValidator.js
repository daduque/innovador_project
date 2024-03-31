const {check} = require('express-validator');
const path = require('path');

const acceptedExtensions = ['.png', '.jpg', '.webp'];

const bookCreateValidator = [
    check('cover').custom((value, { req }) => {
        let cover = req.file.cover;
        if(!cover){
            throw new Error ('Tienes que subir una portada')
        }else{
            if(!acceptedExtensions.includes(path.extname(cover.originalname))){
                throw new Error (`El archivo ${cover.originalname} no es una imagen válida, los archivos aceptados son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true
    })
]

module.exports = bookCreateValidator;