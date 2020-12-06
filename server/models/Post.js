const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');
const dateKorean = moment.tz(Date.now(), "Asia/Seoul").format('YYYY-MM-DDTHH:mm:ss');


const postSchema = mongoose.Schema({
    postId: {
        type:Number,
        maxlength:50
    },
    type: {
        type: String,
    },
    title: {
        type:String,
        maxlength:100,
        required: true
    },
    content: {
        type:String,
        maxlength:10000,
        required: true,
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    views: {
        type: Number,
        default: 0,
    },
    like: {
        type: Number,
        default: 0,
    },
    isDel: {
        type: Boolean,
        default: false,
    },
    delDt: {
        type: String
    },
    createdDt : {
        type: String,
        default: dateKorean,
    },
    updatedDt : {
        type: String,
        default: dateKorean,
    }

});

postSchema.pre('save', function( next ) {
    var newPost = this;
    console.log(newPost.createdDt);
    Post.findOne({type: this.type})
    .sort('-postId')
    .exec(function(err, post) {
        if(err) {
            return res.json({success: false, err});
        } else {
            if(post) {
                newPost.postId = post.postId + 1;
            } else {
                newPost.postId = 1;
            }
            next();
        }
    });
});

const Post = mongoose.model('Post', postSchema);

module.exports = { Post }