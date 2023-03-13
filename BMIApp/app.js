const express = require('express')
const mongoose  = require('mongoose')
const morgan =  require('morgan')
const cors = require("cors");
const {UserData,User} = require('./models/users')
const expressSession = require('express-session')
const authMiddleware = require('./middleware/authMiddleware')
const loginMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware")
// express app
const app = express()
app.use(express.json());

// const DbURI = 'mongodb+srv://user1:TestApp2022@cluster0.dp8rbp4.mongodb.net/UsersDb?retryWrites=true&w=majority'
// mongoose.connect(DbURI,
//     { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(result => app.listen(3000))
//     .catch(err => console.log(err)
// )


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ibrahim:ibrahim1234@student.lmygtpz.mongodb.net/BankDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  if (err) {
    console.log(err);
    return;
  }

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
  // perform actions on the collection object
});
/*we register the expressSession middleware in our app and
pass in a configuration object with a value to secret property. secret string is
used by the express-session package to sign and encrypt the session ID
cookie being shared with the browser.*/
app.use(expressSession({
  secret: 'keyboard cat'
  }))

//We first declare a global variable loggedIn that will be accessible from all our EJS files. 
global.loggedIn = null;


// register view engine
app.set('view engine', 'ejs')

//access static files in public folder
app.use(express.static('public') )

app.use(morgan('tiny'))

//get the data from html
app.use(express.urlencoded({extended:true}))

/*we specify with the wildcard *,
that on all requests, this middleware should be executed. In it, we assign
loggedIn to req.session.userId.*/

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next()
  });
app.get('/signup',loginMiddleware, require("./controllers/singup"))
app.post('/signup', require("./controllers/userSave"))

app.post('/signuptest',async (req, res) => {
  try {const user = new User(req.body)
      await user.save()
      req.session.userId = user._id
      //res.redirect("/")
    }
    catch (error){
      //const validationError = Object.keys(error.errors).map(key => error.errors[key].message)
      //req.session.errors = validationError
      console.error(error);
      return error
      //res.redirect("/signup")
    }})

app.get('/signin',loginMiddleware, require("./controllers/signin"))
app.post('/signin',require("./controllers/signinUser"))

app.get("/signout",require("./controllers/signout"))
  

app.get('/', (req, res) => {
  res.redirect('/bmi');
});
app.get('/about', require("./controllers/aboutPage"))

const newBMIController = require("./controllers/newBMI")
app.get('/bmi', newBMIController);



const setApp = require("./controllers/setBMI")
app.post('/bmi' ,setApp)

const allBMIsController = require("./controllers/getAllBMIs");
app.get('/allResults',authMiddleware, allBMIsController)

const bmiById = require("./controllers/getBMIById")
app.get('/bmiRes/:id', bmiById) 
 
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
});
