const {UserData} = require('../models/users')
module.exports = async (req,res) =>{
    try {
    const id = req.params.id;
    const result = await UserData.findById(id)
    res.render("bmiRes",{user : result , title : 'BMI details'} )
}
    catch(err){
      console.log(err)
    }
  } 