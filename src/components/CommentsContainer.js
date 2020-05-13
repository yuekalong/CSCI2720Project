import React from "react";
import axios from "axios";
import {Form, Button, Card} from "react-bootstrap";
import CommentBox from "./CommentBox";

const port = "";

class CommentsContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            locID: this.props.locID,
            text: ""
        }
        this.inputText = this.inputText.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    inputText(e){
        this.setState({text: e.target.value});
    }

    postComment(e){
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
            console.log(res.data);
        });
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <Card style={{ width: '100%' }}>
                    <Card.Body>
                        <Card.Title>Comments: </Card.Title>
                        <CommentBox />
                    </Card.Body>
                    <Card.Body>
                        <Form onSubmit={this.postComment}>
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