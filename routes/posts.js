const express=require("express")
const Post = require("../models/Post")
const router=express.Router()


//get all the posts
router.get("/",async (req,res)=>{
  try{
    const posts=await Post.find()
    res.json(posts)
  }catch(err){
      res.json({message:err})
  }
})


//submits all teh posts
router.post("/",(req,res)=>{
    console.log(req.body)
    const post=new Post({
        title:req.body.title,
        description:req.body.description
    })
    post.save() //this returns a promise
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json({message:err})
    })
})
//specific posts
router.get("/:postId",async (req,res)=>{
    const post= await Post.findById(req.params.postId )
    res.json(post)
})
//delete a specific posts

router.delete("/:postId",async (req,res)=>{
   const removedPost= await Post.remove({_id:req.params.postId})
    res.send(removedPost)
})
//update a post

router.patch("/:postId",async (req,res)=>{
   const updatedpost= await Post.updateOne({_id:req.params.postId},{$set:{title:req.body.title}})
   res.json(updatedpost)
})
module.exports=router;