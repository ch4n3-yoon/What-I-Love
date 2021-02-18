import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Container, Header, Form, Segment, Divider, Button} from 'semantic-ui-react';
import http from '../utils/http';
import 'semantic-ui-css/semantic.min.css';

const ListArticle = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();

    const loadArticles = () => {
        http.get('/article/latest')
            .then(resp => {
                if (!resp.data.status) {
                    console.log(`[ ERROR ] ${resp.data.message}`);
                    return -1;
                }

                console.log('[ DEBUG ] resp :', resp.data);
                setArticles(resp.data.data);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        loadArticles();

    }, [history]);

    return (
        <Container>
            <Divider hidden/>
            <Segment raised loading={isLoading}>
                <Header as='h2' content='✋ My Memorials'/>
                <Segment.Group>
                    {(articles.map(article => (
                        <Segment>
                            <Header>{article.title}</Header>
                        </Segment>
                    )))}
                </Segment.Group>
                <Button
                    compact
                    color='violet'
                    onClick={() => {history.push('/article/publish')}}
                    content='Publish'
                />
            </Segment>
        </Container>
    );
};

export default ListArticle;
