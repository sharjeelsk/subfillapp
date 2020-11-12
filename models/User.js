const mongoose = require("mongoose")

const UserSchema=mongoose.Schema({
    username:String,
    password:String,
    url:[],
    platform:[],
    type:[]
})

module.exports = mongoose.model("Users",UserSchema)