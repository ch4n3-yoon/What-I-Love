import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Container, Header, Form, Segment, Divider, Button, Transition, Message, List} from 'semantic-ui-react';
import http from '../utils/http';
import 'semantic-ui-css/semantic.min.css';

const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [contentLocation, setContentLocation] = useState("");
    const [youtube, setYoutube] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isPublishDisabled, setIsPublishDisabled] = useState(false);
    const [selectedFile, setSelectedFile] = useState({});

    const history = useHistory();

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
            setIsSuccess(true);
            setIsPublishDisabled(true);

            setTimeout(() => {
                setIsSuccess(false);
                history.push('/article');
            }, 2000);
        }).catch(error => {
            console.log(`[ ERROR ] ${error}`);

            setIsLoading(false);
        });
    };

    const handleFileUpload = (event) => {
        const {target: {files: [file]}} = event;
        console.log('[ DEBUG ] file :', file);

        if (file) {
            setSelectedFile(file);
        }

        const formData = new FormData();
        formData.append('file', file);
        http.post('/file/upload/1', formData)
            .then(response => {
                console.log('[ DEBUG ] upload response :', response);
            })
            .catch(error => {
                console.log('[ ERROR ]', error);
            });

        event.target.value = null;
        console.log('[ DEBUG ] selectedFile :' ,selectedFile);
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

                    <Transition.Group
                        duration={200}
                        as={List}
                        verticalAlign='middle'
                    >
                        <Form.Input
                            type='file'
                            label='Related Files'
                            onChange={handleFileUpload}
                        />
                    </Transition.Group>

                    <Divider hidden/>
                    <Button
                        primary
                        compact
                        disabled={isPublishDisabled}
                        content='Publish'
                        loading={isLoading}
                    />
                    <Button
                        secondary
                        compact
                        content='List'
                        onClick={() => {
                            history.push('/article')
                        }}
                    />
                </Form>
            </Segment>
            <Transition.Group
                duration={200}
                as={List}
                verticalAlign='middle'
            >
                {isSuccess && (
                    <Message
                        key={1}
                        positive
                        header='Success !'
                        content='Successfully Published 🌭'
                    />
                )}
            </Transition.Group>
        </Container>
    )
};

export default Publish;
