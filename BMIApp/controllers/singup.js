module.exports = ((req,res) => res.render('signup', { title: 'singup', errors: req.session.validationError }))