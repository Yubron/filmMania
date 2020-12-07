const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');
const dateKorean = moment.tz(Date.now(), "Asia/Seoul").format('YYYY-MM-DDTHH:mm:ss');


const photoSchema = mongoose.Schema({
    postId: {
        type: String,
    },

    filename: {
        type: String,
    },
    
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    cameraType: {
        type: String,
    },

    type1: { // 인물, 배경, 동물, 사물
        type: String,
    },

    type2: { // 색감 (빨강, 파랑, 주황)
        type: String,
    }


});


const Photo = mongoose.model('Photo', photoSchema);

module.exports = { Photo }