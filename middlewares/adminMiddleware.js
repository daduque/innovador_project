function adminMiddleware (req, res, next){
    if (req.session.user) {
        if (['admin', 'editor'].includes(req.session.user.role)) 
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