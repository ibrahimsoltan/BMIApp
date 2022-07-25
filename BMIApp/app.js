const express = require('express')
const { result } = require('lodash')
const mongoose  = require('mongoose')
const morgan =  require('morgan')
const User = require('./models/users')

// express app
const app = express()

const DbURI = 'mongodb+srv://user1:TestApp2022@cluster0.dp8rbp4.mongodb.net/UsersDb?retryWrites=true&w=majority'
mongoose.connect(DbURI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err)
)


// register view engine
app.set('view engine', 'ejs')

//access static files in public folder
app.use(express.static('public') )

app.use(morgan('tiny'))

//get the data from html
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.redirect('/bmi');
});

app.get('/about', (req, res) => {
res.render('about', { title: 'About' })
});

app.get('/bmi', (req, res) => {
  res.render('addData', { title: 'Add new bmi' })
});

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

app.post('/bmi' , (req,res)=>{
    const user = new User(req.body)
    var bmi = user.weight/((user.height/100)*(user.height/100))
    user.bmi = bmi.toFixed(2)
    user.date = getDate()
    user.bmiStatus = getStatus(user.bmi)
    user.save()
    .then((result)=> {
        res.redirect('/bmiRes')
    })
    .catch(err => {
        console.log(err)
      });
  })

app.get('/allResults', (req, res) => {
    User.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('result', { users: result, title: 'All BMIs' });
      })
      .catch(err => {
        console.log(err)
      })
  })



app.get('/bmiRes', (req, res) => {
  User.find().limit(1).sort({ createdAt: -1 })
    .then(result => {
      res.render('bmiRes', { users: result, title: 'All BMIs' })
    })
    .catch(err => {
      console.log(err)
    })
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
});