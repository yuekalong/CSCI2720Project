const express = require('express');
const router = express.Router();

const Comment = require('../../model/comment');
const User = require('../../model/user');

// generate random location ID
function generateCommentID() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    var charactersLength = characters.length;
    for (var i = 0; i < 22; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

router.post("/fetchComments", (req, res) => {
    Comment.find({locationID: req.body.locID})
    .populate({path: 'author', select: 'username'})
    .sort({ posted: -1 })
    .exec((err, comments)=>{
        general = comments.filter(comment => comment.parent_id == "");
        reply = comments.filter(comment => comment.parent_id != "");
        result = [];
        general.forEach(parent => {
            result.push({
                general: parent,
                reply: reply.filter(comment => comment.parent_id == parent.commentID)
            })
        }); 
        console.log(result);
        res.send(result);
    });
});

router.post("/postComment", (req, res) => {
    if(req.body.status == "general"){
        console.log(req.body);
        User.findOne({userID: req.session.userID},'_id', (err, user)=>{
            if (err) {
                res.send("error");
            }
            else {
                console.log(user);
                let comment = new Comment({
                    commentID: generateCommentID(),
                    locationID: req.body.locID,
                    parent_id: "",
                    author: user._id,
                    text: req.body.text
                });
                comment.save((err)=>{
                    if (err) {
                        res.send("error");
                    }
                    else {
                        res.send("done");
                    }
                });
            }
        });
    }
    else{
        console.log(req.body);
        User.findOne({userID: req.session.userID},'_id', (err, user)=>{
            if (err) {
                res.send("error");
            }
            else {
                console.log(user);
                let comment = new Comment({
                    commentID: generateCommentID(),
                    locationID: req.body.locID,
                    parent_id: req.body.parent_id,
                    author: user._id,
                    text: req.body.text
                });
                comment.save((err)=>{
                    if (err) {
                        res.send("error");
                    }
                    else {
                        res.send("done");
                    }
                });
            }
        });
    }
});

module.exports = router;