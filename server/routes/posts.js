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
        .populate('writer')
        .exec((err, posts) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, posts })
        });
});

module.exports = router;
