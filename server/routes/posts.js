const express = require('express');
const router = express.Router();
const { Post } = require("../models/Post");

//=================================
//             Post
//=================================
router.post('/free', (req, res) => {

    // save video
    const post = new Post(req.body);

    post.save((err, doc) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true });
    });
})

router.get('/free', (req, res) => {
    Post.find({"type": "free"})
        .sort('-postId')
        .populate('writer')
        .exec((err, posts) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, posts })
        });
});

router.get('/:postType/:postId', (req, res) => {
    console.log(req.params.postType);
    console.log(req.params.postId);
    Post.findOne({"type" : req.params.postType , "postId" : req.params.postId })
        .populate('writer')
        .exec((err, post) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, post })
        });
});

router.post('/qna', (req, res) => {

    // save video
    const post = new Post(req.body);

    post.save((err, doc) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true });
    });
})

router.get('/qna', (req, res) => {
    Post.find({"type": "qna"})
        .sort('-postId')
        .populate('writer')
        .exec((err, posts) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, posts })
        });
});

module.exports = router;
