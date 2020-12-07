const express = require('express');
const router = express.Router();
const { Photo } = require("../models/Photo");
const multer = require('multer');
const path = require('path');
const moment = require('moment');



//=================================
//             Photo
//=================================
router.post('/photo', (req, res) => {

    // save video
    const photo = new Photo(req.body);

    photo.save((err, doc) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true });
    });
})


module.exports = router;
