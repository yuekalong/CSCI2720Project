import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {Alert, Form, Button, Card} from "react-bootstrap";
import CommentBox from "./CommentBox";

const port = "";

class CommentsContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            locID: this.props.locID,
            text: "",
            comments: []
        }
        this.inputText = this.inputText.bind(this);
        this.postComment = this.postComment.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        axios({
            method: 'post',
            url: port+'/api/comments/fetchComments',
            data: {
                locID: this.state.locID
            }
        })
        .then((res) => {
            this.setState({
                comments: res.data
            })
        });
    }

    inputText(e){
        this.setState({text: e.target.value});
    }

    postComment(e){
        if(this.state.text != ""){
            ReactDOM.findDOMNode(this.commentForm).reset();
            axios({
                method: 'post',
                url: port+'/api/comments/postComment',
                data: {
                    locID: this.state.locID,
                    text: this.state.text,
                    status: "general"
                }
            })
            .then((res) => {
                this.setState({text: ""});
                axios({
                    method: 'post',
                    url: port+'/api/comments/fetchComments',
                    data: {
                        locID: this.state.locID
                    }
                })
                .then((res) => {
                    this.setState({
                        comments: res.data
                    })
                });
            });
        }
        e.preventDefault();
    }

    refresh(e){
        if(e){
            axios({
                method: 'post',
                url: port+'/api/comments/fetchComments',
                data: {
                    locID: this.state.locID
                }
            })
            .then((res) => {
                this.setState({
                    comments: res.data
                })
            });
        }
    }

    render(){
        return(
            <div>
                <Card style={{ width: '100%' }}>
                    <Card.Body>
                        <Card.Title>Comments: </Card.Title>
                        {this.state.comments.length == 0 ?
                            <Alert variant='light' style={{"text-align": "center", "font-size": "30px"}}>
                                No any comments
                            </Alert>
                        :
                            <div style={{ height: "300px", overflow: "scroll"}}>
                                {this.state.comments.map(comment => <CommentBox replied={this.refresh} locID={this.state.locID} detail={comment}/>)}
                            </div>
                        }
                    </Card.Body>
                    <Card.Body>
                        <Form onSubmit={this.postComment} ref={ form => this.commentForm = form }>
                            <Form.Group>
                                <Form.Label>Your comment</Form.Label>
                                <Form.Control as="textarea" rows="3" onChange={this.inputText}/>
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default CommentsContainer;