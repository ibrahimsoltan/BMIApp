const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema(
    {
        userName: {
            type: String,
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

const User = mongoose.model('User', userSchema)
module.exports = User