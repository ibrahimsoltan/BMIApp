const {User} = require('D:/NodeJS/BMIApp/models/users')
//checks if the user is allowed to access a specific page if not, user will be redirected to the home page
module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user ) =>{
    if(error || !user )
    return res.redirect('/signin')
    next()
    })
    }
    