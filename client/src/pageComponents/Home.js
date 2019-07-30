import React, { Component } from 'react';
import { Container, Jumbotron} from 'reactstrap';
import { connect } from 'react-redux';
import NavbarApp from './Navbar.js';


class Home extends Component {

    render() {
      return (
        <div>
        
        <NavbarApp/>

        <Jumbotron style={{ marginTop: '1rem', marginLeft: '1rem', marginRight: '1rem' }}>
          <Container fluid>
            <h4>Aim of the research</h4>
            <p> 
              Image captioning aims to automatically generate a sentence description for an image.
              During last few years it has attracted much research attention in cognitive computing since the task is rather challeging.
              This research aims to create an auto captioning system for a specific category of images (data chart images) using a Deep Learning approach.
              There are few already existing encoder-decoder framework for natural images auto captioning, and none of them are specifically trained on data chart <br></br><br></br>
              So the final goal is to generate a system that, given in input a data chart image and/or its values series,
              it’s able to auto generate a caption about it.

              <hr></hr>
              <img src={ require('../media/LSTM.png')} alt="Model structure not available." />
              <br></br>
              Source: https://github.com/Hvass-Labs/TensorFlow-Tutorials/blob/master/22_Image_Captioning.ipynb
              <hr></hr>
            </p>
          </Container>
        </Jumbotron>
        </div>
        );
    }
  }
  
  export default connect()(Home);
  