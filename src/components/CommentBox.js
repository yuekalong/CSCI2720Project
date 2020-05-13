import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { Toast, Button, Form } from "react-bootstrap";


const port = "";

class Comment extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Toast.Header closeButton={false}>
                    <strong className="mr-auto">{this.props.author}</strong>
                    <small>{this.props.time}</small>
                </Toast.Header>
                <Toast.Body>{this.props.text}</Toast.Body>
            </div>
        );
    }
}

class CommentBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            locID: this.props.locID,
            showReplyBox: false,
            showReply: false,
            text: ""
        }
        this.callReplyBox = this.callReplyBox.bind(this);
        this.reply = this.reply.bind(this);
        this.inputText = this.inputText.bind(this);
        this.viewReply = this.viewReply.bind(this);
    }

    callReplyBox(e){
        this.setState({
            showReplyBox: !this.state.showReplyBox
        });
    }

    viewReply(e){
        this.setState({
            showReply: !this.state.showReply
        });
    }

    inputText(e){
        this.setState({text: e.target.value});
    }

    reply(e){
        if (this.state.text != ""){
            ReactDOM.findDOMNode(this.replyForm).reset();
            axios({
                method: 'post',
                url: port+'/api/comments/postComment',
                data: {
                    locID: this.state.locID,
                    text: this.state.text,
                    parent_id: this.props.detail.general.commentID,
                    status: "reply"
                }
            })
            .then((res) => {
                this.setState({
                    text: "",
                    showReplyBox: false
                });
                this.props.replied(true);
            });
        }
        e.preventDefault();
    }

    render(){
        const general = this.props.detail.general;
        const reply = this.props.detail.reply;
        return(
            
        <Toast style={{"max-width": "100%"}}>
            <Comment author={general.author.username} time={general.posted} text={general.text}/>
            <div className="mb-2 ml-2">
                {this.state.showReplyBox ? null : <Button size="sm" variant="outline-dark" onClick={this.callReplyBox}>Reply</Button>}{' '}
                {Object.keys(reply).length > 0 ? <Button size="sm" variant="outline-primary" onClick={this.viewReply}>See {Object.keys(reply).length} reply</Button> : null}
                {this.state.showReply ? 
                    <div className="ml-5 mt-2">
                        {reply.map(comment=><Comment author={comment.author.username} time={comment.posted} text={comment.text}/>)}
                    </div>
                : null
                }
                {this.state.showReplyBox ?
                    <Form className="mt-2" onSubmit={this.reply} ref={ form => this.replyForm = form }>
                        <Form.Group>
                            <Form.Control as="textarea" rows="1" placeholder="your reply" onChange={this.inputText}/>
                        </Form.Group>
                        <Button size="sm" variant="outline-dark" type="submit">Reply</Button>
                    </Form>
                : null
                }
            </div>
        </Toast>
        );
    }
}

export default CommentBox;

