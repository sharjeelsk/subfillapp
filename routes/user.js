const express=require("express")
const app=express()
const cors =require("cors")
app.use(cors())
const { findOneAndUpdate } = require("../models/User")
const User=require("../models/User")
router=express.Router()
app.use(function (req, res, next) {
    // res.Header('Access-Control-Allow-Origin', '*')
    // // Rest methods you wish to allow
    // res.Header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.Header('Access-Control-Allow-Headers', 'Content-Type');
  
    // Website you wish to allow to connect
    res.Header('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.Header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.Header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.Header('Access-Control-Allow-Credentials', true);
    res.Header("preflightContinue", false)
  res.Header("optionsSuccessStatus",204)
    // Pass to next layer of middleware
    next();
  });
router.get("/",(req,res)=>{
    res.send("we are on user")
})
router.get("/signin",(req,res)=>{
    res.send("you are on signin")
    console.log(User.find()
    )
})
router.post("/signin",async (req,res)=>{

const response = await User.findOne({username:req.body.username,password:req.body.password})
console.log(response)
if(response){
    res.json(response)
}else{
    res.send("Invalid Username or Password")
}
})
router.post("/signup",async (req,res)=>{
    console.log(req.body.username)
    const response = await User.findOne({username:req.body.username})
    console.log(response)
    if(response){
        res.send("sorry the user with the given username already exists")
    }
    else{
        const user=new User({
            username:req.body.username,
            password:req.body.password
        })
        user.save()
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.json({message:err})
        })
    }
 
 
})
router.get("/signup",(req,res)=>{
    res.send("you are on signup")
})


router.post("/addexchange",(req,res)=>{
   const username=req.body.username
    const url=req.body.url
    const type=req.body.type
    const platform=req.body.platform
    User.update({username:username},{$set:{url:url,platform:platform,type:type}})
    .then(data=>res.send("succesfully added"))
})

router.post("/viewexchange",(req,res)=>{
 const platform=req.body.platform
    User.find({platform})
    .then(data=>res.json(data))
})
module.exports = router