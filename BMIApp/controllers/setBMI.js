const {UserData} = require('../models/users')
//helper function
function getDate(){
  var currentdate = new Date(); 
  var datetime = "Done at: " + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();;
  return datetime
}

//helper function
function getStatus(bmi){
    if(bmi < 18.5)
      return "Underweight"
    else if (bmi < 25)
      return "Healthy"
    else if (bmi < 30)
      return "Overweight"
    else 
      return "Obese"

}

module.exports = async (req,res)=>{
    try{  
      const userBMI = new UserData(req.body)
      var bmi = userBMI.weight/((userBMI.height/100)*(userBMI.height/100))
      userBMI.bmi = bmi.toFixed(2)
      userBMI.date = getDate()
      userBMI.bmiStatus = getStatus(userBMI.bmi)
      var id = userBMI.id
      userBMI.userid = req.session.userId
      console.log(req.session.userId)
      await userBMI.save()
      var newLink = '/bmiRes/' + id 
      res.redirect(newLink)
    }
    catch (error) {
        console.error(error)
        }
    }