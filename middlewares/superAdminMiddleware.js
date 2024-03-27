function adminMiddleware (req, res, next){
    if (req.session.user) {
        if (req.session.user.rol === 'admin') 
        {
            next()
        }else {
            res.redirect('/admin')
        }  
    }else {
        res.redirect('/user/login')
    }       
};

module.exports = adminMiddleware;