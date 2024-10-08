const { genSalt } = require('bcrypt');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const {v4:uuidv4} = require('uuid')

const userModel = new mongoose.Schema({
    id:{
        type:String,
        default:uuidv4
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
})

userModel.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

const Users = mongoose.model('users',userModel);
module.exports = Users;

//TITLE DESCRIPTION IMAGE PRICE THIS IS THE MODEL SCHEMA FOR GET
// SUB TOTAL TO BE DONE AT LAST  