const {UserData} = require('D:/NodeJS/BMIApp/models/users')
module.exports = async(req, res) => {
    try {  
    const result = await UserData.find().sort({ createdAt: -1 })
    console.log(req.session)
    res.render('result', { usersBMI: result, title: 'All BMIs' });
      }
      catch (error) {
        console.error(error)
        }
    }