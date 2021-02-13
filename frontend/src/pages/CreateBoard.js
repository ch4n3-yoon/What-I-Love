import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Container, Divider, Segment, Header, Grid} from 'semantic-ui-react';

const DockerCompose = () => {
    const dummy_data = [
        {
            id: 1,
            name: 'test project',
            description: 'for debug and test'
        },
        {
            id: 2,
            name: 'test project 2',
            description: 'testtestsetset'
        }
    ];

    const [projectId, setProjectId] = useState(0);
    const history = useHistory();

    const handleClick = (clickedProjectId) => {
        setProjectId(clickedProjectId);
        history.push(`/project/${projectId}`);
    };

    return (
        <Container>
            <Divider hidden/>
            <Segment raised>
                <Header as="h1">Your Docker Projects</Header>
                <Divider hidden />
                {(dummy_data.map((project) => (
                    <Segment>
                        <Grid celled="internally">
                            <Grid.Row onClick={() => handleClick(project.id)}>
                                <Grid.Column width={4}>
                                    <Header>{project.name}</Header>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <div>{project.description}</div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                )))}
            </Segment>
        </Container>
    )
}

export default DockerCompose;
