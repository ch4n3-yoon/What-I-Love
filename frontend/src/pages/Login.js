import React, {useState} from 'react';
import {Container, Header, Form, Segment, Divider, Button} from 'semantic-ui-react';
import http from '../utils/http';
import 'semantic-ui-css/semantic.min.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

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
                    // sign-in success !
                } else {
                    console.log('[ INFO ] Failed to sign in');
                }
            })
            .catch((error) => {
                console.log(`[ ERROR ] error : ${error}`);
                setError(true);
            });
    }

    if (error) {
        return (
            <div>
                error !
            </div>
        )
    }

    return (
        <Container>
            <Divider hidden/>
            <Segment raised>
                <Header as="h2" color="purple">
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
                    <Button>Sign in</Button>
                </Form>
            </Segment>
        </Container>
    );
};

export default Login;