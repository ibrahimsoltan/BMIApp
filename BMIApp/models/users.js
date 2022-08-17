const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const userDataSchema = new Schema(
    {
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userScheme'

        },
        userName:
        {
            type : String,
            required : true 
        },
        weight : {
            type : Number,
            required : true 
        },
        bmi : {
            type : Number,
            required : true
        },
        height : {
            type : Number,
            required : true
        },
        date:{
            type : String,
            required : true
        },
        bmiStatus:{
            type : String,
            required : true
        }
    },{
        timestamps : true
    }
)
const UserData = mongoose.model('UserData', userDataSchema)


const userSchema = new Schema(
    {
        userName: {
            type: String,
            required : true,
            unique: [true, "username already taken"]
        },
        password:{
            type: String,
            required :true
        },
        bmi:[{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'UserDataSchema'
        }]
    })

    userSchema.pre('save', function(next){
        const user = this
        bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
        })
        })
        

const User = mongoose.model('User', userSchema)
module.exports ={UserData,User}