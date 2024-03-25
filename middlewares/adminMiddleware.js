function adminMiddleware (req, res, next){
    if (req.session.user) {
        if (req.session.user.rol.includes('admin', 'editor')) 
        {
            next()
        }else {
            res.redirect('/')
        }  
    }else {
        res.redirect('/user/login')
    }       
};

module.exports = adminMiddleware;