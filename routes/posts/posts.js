const express = require('express');
const router = express.Router();
const Post = require('../../models/post')

//this get all the posts
router.get('/',async (req, res)=>{
   try{
    const posts = await Post.find();
    res.json(posts)
   }catch(err){
        res.json({message: err})
    }
});

//add a post
router.post('/',async (req, res)=>{
    const post  = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try { 
        const savedPost = await post.save()
        res.json(savedPost);
    } catch(err){
        res.json({message: err})
    }
});

//this get a specific post
router.get('/:postId',async (req, res)=>{
   
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message: err})
    }
});

//delete a specific post
router.delete('/:postId',async (req, res)=>{
   
    try{
        const post = await Post.deleteOne({_id: req.params.postId});
        // res.json(post);
        res.json({
            status: 'successful',
        })
    }catch(err){
        res.json({message: err})
    }
});

////update a post
router.patch('/:postId',async (req, res)=>{
   
    try{
        const post = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {title: req.body.title}}
        );
        res.json(post);
    }catch(err){
        res.json({message: err})
    }
});


module.exports = router;