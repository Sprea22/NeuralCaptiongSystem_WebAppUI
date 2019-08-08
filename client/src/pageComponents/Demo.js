import React, { Component } from 'react';
import { Container, Jumbotron} from 'reactstrap';
import { connect } from 'react-redux';
import NavbarApp from './Navbar.js';
import work_in_progress from './../media/work_in_progress.png';

class Demo extends Component {

    render() {

        return (
        <div>

        <NavbarApp/>

        <Jumbotron style={{ marginTop: '1rem', marginLeft: '1rem', marginRight: '1rem' }}>
        <Container fluid align="center">
                <h2>Demo of the auto captioning system:</h2>
                </Container>
            </Jumbotron>

                <Jumbotron style={{ marginTop: '1rem', marginLeft: '1rem', marginRight: '1rem' }}>
                    <Container fluid align="center">
                        <img src={work_in_progress} height="200" alt={"Work in progres.."}/>
                    </Container>
                </Jumbotron>

            </div>

        );
    }
  }
  

  export default connect()(Demo);  