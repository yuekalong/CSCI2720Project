const express = require('express');
const router = express.Router();

const Comment = require('../../model/comment');

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
    let result = Comment.find({locationID: req.body.locID}).sort({ posted: -1 });
    console.log(result);
    res.send(result);
});

router.post("/postComment", (req, res) => {
    if(req.body.status == "general"){
        console.log(req.body);
        let comment = new Comment({
            commentID: generateCommentID(),
            locationID: req.body.locID,
            parent_id: "",
            userID: req.session.userID,
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
    else{
        res.send("error");
    }
});

module.exports = router;