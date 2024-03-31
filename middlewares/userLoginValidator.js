const { check } = require('express-validator');

const userLoginValidator = [
    check('email', 'El campo Email es obligatorio').trim().notEmpty().isEmail().withMessage('Debes ingresar un email válido').bail(),
    check('password', 'El campo Password es obligatorio').trim().notEmpty().bail()
        .isLength({ min: 8, max: 30 }).withMessage('La contraseña debe tener más de 8 caracteres y menos de 30'),
];

module.exports = userLoginValidator;