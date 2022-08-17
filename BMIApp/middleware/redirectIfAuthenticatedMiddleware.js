//if user is already logged in
module.exports = (req, res, next) =>{
    if(req.session.userId){
    return res.redirect('/allResults') // if user logged in, redirect to home page
    }
    next()
    }
    