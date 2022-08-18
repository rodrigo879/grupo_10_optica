function guestMiddleware(req, res, next) {
    if(!req.session.user){
        next();
    } else {
        res.redirect('/users/login')
    }
}

module.exports = guestMiddleware;