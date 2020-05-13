import React from "react";
import axios from "axios";
import { Toast } from "react-bootstrap";

class CommentBox extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const detail = this.props.detail
        return(
            
        <Toast style={{"max-width": "100%"}}>
            <Toast.Header closeButton={false}>
                <strong className="mr-auto">{detail.author.username}</strong>
                <small>{detail.posted}</small>
            </Toast.Header>
            <Toast.Body>{detail.text}</Toast.Body>
        </Toast>
        );
    }
}

export default CommentBox;

