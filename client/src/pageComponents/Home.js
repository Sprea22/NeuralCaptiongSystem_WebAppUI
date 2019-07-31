import React, { Component } from 'react';
import { Container, Jumbotron, Row, Col} from 'reactstrap';
import { connect } from 'react-redux';
import NavbarApp from './Navbar.js';
import ImageZoom from 'react-medium-image-zoom'


class Home extends Component {

    render() {
      return (
        <div>
        
        <NavbarApp/>

        <Jumbotron style={{ marginTop: '1rem', marginLeft: '1rem', marginRight: '1rem' }}>
          <Container fluid>
          <Row  class="align-items-center">
                <Col xs="6"> 
            <h4>Aim of the research</h4>
              <hr/>
              <p> 
                Image captioning aims to automatically generate a sentence description for an image.
                During last few years it has attracted much research attention in cognitive computing since the task is rather challeging.<br/>
                This research aims to create an auto captioning system for a specific category of images (data chart images) using a Deep Learning approach.<br/>
                So the final goal is to generate a system that, given in input a data chart image and/or its values series,
                it’s able to auto generate a caption about it. <br/><br/>
              </p>
              </Col>
                <Col xs="6" align="center"> 
                <br/><br/><br/>
                  <ImageZoom
                      image={{
                          src: require('../media/basic_problem.png'),
                          alt: 'Pic not available',
                          className: 'img',
                          style: { width: '100%' }
                      }}
                      zoomImage={{
                          src:  require('../media/basic_problem.png'),
                          alt: 'Pic not available'
                      }}
                      />   
                  <br/>
                  </Col>
            </Row>

            <h4 style={{paddingTop: "4rem"}}>System structure:</h4>
              <hr/>
            <Row class="align-items-center">
                <Col xs="6">
                <p> 
                There are few already existing encoder-decoder framework for natural images auto captioning, but none of them are specifically trained on data chart. <br/>
                The image on the right shows a common structure used to implement image captioning system, that consists in two main components:
                <li> Image features extractor </li>
                <li> Long short term memory model (LSTM)</li><br/>
                Several reseraches demonstrated the efficiency of this kind of structure in generating captions for general purpose images. 
                At the same time, it would probably turn out very inaccurate on data chart images because
                because it doesn't consider the text displayed within the image (title, values, annotations,..) which provides a significant amount of information about the graphic itself.
                </p>
                </Col>
                <Col xs="6" align="center"> 
                  <ImageZoom
                      image={{
                          src: require('../media/LSTM.png'),
                          alt: 'Pic not available',
                          className: 'img',
                          style: { width: '60%' }
                      }}
                      zoomImage={{
                          src:  require('../media/LSTM.png'),
                          alt: 'Pic not available'
                      }}
                      />   
                  <br/>
                  <b>Source: </b>https://github.com/Hvass-Labs/TensorFlow-Tutorials/blob/master/22_Image_Captioning.ipynb
                </Col>
            </Row>
            
          </Container>
        </Jumbotron>
        </div>
        );
    }
  }
  
  export default connect()(Home);
  