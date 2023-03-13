const {User} = require('../models/users')
module.exports = async (req, res) => {
  console.log(req.body)
try {const user = new User(req.body)
  console.log(user)
    await user.save()
    req.session.userId = user._id
    res.redirect("/")
  }
  catch (error){
    const validationError = Object.keys(error.errors).map(key => error.errors[key].message)
    req.session.errors = validationError
    console.log(error);
    res.redirect("/signup")
  }}
 
    