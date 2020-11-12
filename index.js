const express = require('express')
const app=express()
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const cors =require("cors")
const path=require('path')
app.use(cors())
app.use(bodyParser.json())
let port = process.env.PORT||3001;
require('dotenv/config')
//middlewares ==run this when routes are hit

// app.use("/posts",(req,res)=>{
//     console.log("this is a middleware runnings")
//     res.redirect("/")
// })

const postsRoute=require("./routes/posts")
const userRoute=require("./routes/user")
//-------------------------middleware
app.use(function (req, res, next) {
    // res.Header('Access-Control-Allow-Origin', '*')
    // // Rest methods you wish to allow
    // res.Header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.Header('Access-Control-Allow-Headers', 'Content-Type');
  
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("preflightContinue", false)
  res.setHeader("optionsSuccessStatus",204)
    // Pass to next layer of middleware
    next();
  });












app.use('/posts',postsRoute) //if user goes to /posts give him postsroute that is home route in posts route
//we use this syntax because /posts/blah blah blah can have anything
app.use("/user",userRoute)
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true},
()=>console.log("connected to db")
)

app.get("/",(req,res)=>{
    res.send("we are on home")
})

if(process.env.NODE_ENV ==='production'){
  app.use(express.static('subfill2/build'))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'subfill2','build','index.html'))
  })
}

app.listen(port,(req,res)=>{
    console.log("server started at 3000")
})