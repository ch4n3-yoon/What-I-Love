import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Container, Header, Form, Segment, Divider, Button, Transition, Message, List, Grid} from 'semantic-ui-react';
import http from '../utils/http';
import 'semantic-ui-css/semantic.min.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});

    const history = useHistory();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        http.post('/user/sign-in', {
            username: username,
            password: password,
        })
            .then((resp) => {
                console.log('[ DEBUG ] resp :', resp);
                if (resp.data.status) {
                    console.log('[ INFO ] Success to sign in. welcome !');
                    history.push('/articles');
                } else {
                    console.log('[ INFO ] Failed to sign in');
                    setError({
                        status: true,
                        message: 'We cannot find such user. Try again 😥',
                    })
                }
            })
            .catch((error) => {
                console.log(`[ ERROR ] error : ${error}`);
                setError({
                    status: true,
                    message: error,
                });
            });

        setTimeout(() => {
            setError(false);
        }, 2000);
    };

    const handleSignUp = () => {
        history.push('/sign-up');
    };

    return (
        <Container>
            <Divider hidden/>
            <Segment raised>
                <Header as="h2" color="violet">
                    Login
                </Header>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        label='username'
                        type='text'
                        placeholder='Username'
                        onChange={handleUsername}
                    />
                    <Form.Input
                        label='password'
                        type='password'
                        placeholder='Password'
                        onChange={handlePassword}
                    />
                </Form>
                <Divider hidden/>
                <Button
                    color='violet'
                    content='sign in'
                    onClick={handleSubmit}
                />
                <Button
                    color='olive'
                    content='sign up'
                    onClick={handleSignUp}
                />
            </Segment>
            <Transition.Group
                duration={200}
                as={List}
                verticalAlign='middle'
            >
                {error.status && (
                    <Message
                        key={1}
                        negative
                        header='Error !'
                        content={error.message}
                    />
                )}
            </Transition.Group>
        </Container>
    );
};

export default Login;