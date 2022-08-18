function authMiddleware(req, res, next) {
    if(req.session.user){
        next();
    } else {
        res.redirect('/users/login')
    }
        res.redirect('/login')
}

module.exports = authMiddleware;