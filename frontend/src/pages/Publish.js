import React, {useState} from 'react';
import {Container, Header, Form, Segment, Divider, Button} from 'semantic-ui-react';
import http from '../utils/http';
import 'semantic-ui-css/semantic.min.css';

const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [contentLocation, setContentLocation] = useState("");
    const [youtube, setYoutube] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleContent = (event) => {
        setContent(event.target.value);
    };

    const handleContentLocation = (event) => {
        setContentLocation(event.target.value);
    };

    const handleYoutube = (event) => {
        setYoutube(event.target.value);
    };

    const handleSubmit = () => {
        setIsLoading(true);
        http.post('/article/publish', {
            title: title,
            content: content,
            location: contentLocation,
            youtube: youtube,
        }).then(resp => {
            console.log('[ DEBUG ] resp :', resp);
            if (resp.data.status) {
                console.log('[ INFO ] Success to publish your article !');
            }

            setIsLoading(false);
        }).catch(error => {
            console.log(`[ ERROR ] ${error}`);

            setIsLoading(false);
        });
    };

    return (
        <Container>
            <Divider hidden/>
            <Segment raised>
                <Header as="h2" color="purple">
                    🚀 Publish Your Article
                </Header>
                <Form onSubmit={handleSubmit} loading={isLoading}>
                    <Form.Input
                        label='title'
                        type='text'
                        placeholder='title'
                        onChange={handleTitle}
                    />
                    <Form.TextArea
                        label='content'
                        placeholder='Talking about what you feel, what you like ...'
                        onChange={handleContent}
                    />
                    <Form.Input
                        label='location'
                        placeholder='Seoul, Korea'
                        onChange={handleContentLocation}
                    />
                    <Form.Input
                        label='Youtube URL'
                        placeholder='http://youtube.com/'
                        onChange={handleYoutube}
                    />
                    <Divider hidden />
                    <Button content='Publish' primary loading={isLoading}/>
                </Form>

            </Segment>
        </Container>
    )
};

export default Publish;
