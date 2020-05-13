import React from "react";
import axios from "axios";
import { Toast } from "react-bootstrap";

class CommentBox extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        // const classes = useStyles();
        return(
        <Toast style={{"max-width": "100%"}}>
            <Toast.Header closeButton={false}>
                <strong className="mr-auto">Bootstrap</strong>
            </Toast.Header>
            <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        );
    }
}

export default CommentBox;

