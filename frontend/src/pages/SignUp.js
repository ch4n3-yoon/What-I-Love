import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Container, Header, Form, Segment, Divider, Button, Transition, Message, List, Grid} from 'semantic-ui-react';
import http from '../utils/http';
import 'semantic-ui-css/semantic.min.css';


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState({});
    const [error, setError] = useState({});

    const history = useHistory();

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        http.post('/user/sign-up', {
            username: username,
            password: password,
            email: email,
        })
            .then((resp) => {
                const {data: status} = resp;

                if (status) {
                    console.log('[ INFO ] Success to sign in. welcome !');
                    setSuccess({
                        status: true,
                        message: `Welcome ${username} 🎉`,
                    });
                } else {
                    setError({
                        status: true,
                        message: 'Failed to sign up. 😥',
                    });
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
            history.push('/');
        }, 2000);
    };

    return (
        <Container>
            <Divider hidden/>
            <Segment raised>
                <Header as="h2" color="violet">
                    Sign Up
                </Header>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        label='email'
                        type='email'
                        placeholder='E-mail'
                        onChange={handleEmail}
                    />
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
                    content='Sign Up'
                    onClick={handleSubmit}
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

                {success.status && (
                    <Message
                        key={1}
                        positive
                        header='Success !'
                        content={success.message}
                    />
                )}
            </Transition.Group>
        </Container>
    );
};


export default SignUp;
