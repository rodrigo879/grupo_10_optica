function adminMiddleware(req, res, next) {
    if(req.session.user && req.session.user.authorities[0].role == 'role_admin'){
        next();
    } else {
        res.redirect('/')
    }
}

module.exports = adminMiddleware;