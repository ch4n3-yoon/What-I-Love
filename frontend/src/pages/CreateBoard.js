import React, {useState} from 'react';
import {Container, Header, Form, Segment, Divider, Button} from 'semantic-ui-react';
import http from '../utils/http';
import 'semantic-ui-css/semantic.min.css';

const CreateBoard = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [contentLocation, setContentLocation] = useState("");
    const [youtube, setYoutube] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const publish = () => {
        http.post('/')
    };

    return (
        <Container>
            <Divider hidden/>
            <Segment raised>

                <Button content='Publish' primary loading={isLoading}/>
            </Segment>
        </Container>
    )
};

export default CreateBoard;
