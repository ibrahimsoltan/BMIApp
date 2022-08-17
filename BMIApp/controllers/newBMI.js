module.exports = (req, res) => {
  //if(req.session.userId){//checks the a user is logged in first 
    return res.render('addData', { title: 'Add new bmi' })
   //}
    //else {res.redirect('/signin')
    //}
  }