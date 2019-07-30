import React, { Component } from 'react';
import { Container, Jumbotron} from 'reactstrap';
import { connect } from 'react-redux';
import NavbarApp from './Navbar.js';

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
                    Work in progress..
                </Jumbotron>

            </div>

        );
    }
  }
  

  export default connect()(Demo);  