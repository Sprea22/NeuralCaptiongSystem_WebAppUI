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
            <h4>Aim of the research</h4>
              <hr/>
              <p> 
              While neural approaches are among the most widely used and successful types of
              methods for images captioning, this study is the first to explore how similar benefits
              can be reaped for the task of generating captions for information visualizations. In
              particular, it is focused on a simple but very popular type of visualizations, namely
              line charts. 
              <br/>
              This study focus on a neural model architecture which aims to generate
              text from the same data used to create a line chart,including time series values, title,
              labels for axis and other related information. Such a system could be used for
              reducing user’s effort in generating insights and descriptions of charts, that can be
              very helpful in many real-world applications and can greatly reduce the workload
              of data analysts. Due to the lack of suitable corpora containing both charts and their
              descriptive captions, it was decided to create a dataset from scratch through a crowd
              sourcing process. This work provides an overview of the implemented model’s architecture
              and its evaluation results, when compared with relatively simple nonneural
              baselines. <br/><br/>
              </p>
              </Row>
              <Row  class="align-items-center">
              <br/><br/><br/>
                  <ImageZoom
                      image={{
                          src: require('../media/Images/Teaser_2.png'),
                          alt: 'Pic not available',
                          className: 'img',
                          style: { width: '100%' }
                      }}
                      zoomImage={{
                          src:  require('../media/Images/Teaser_2.png'),
                          alt: 'Pic not available'
                      }}
                      />   
                  <br/>
              </Row>

            <h4 style={{paddingTop: "4rem"}}>Implemented Models</h4>
            <hr/>
            <Row class="align-items-center">
                <p> 
                In this study, besides the (Encoder-Decoder LSTM) neural model, we consider two
                simpler baselines (Bi-Gram and Similarity), which accomplish the task through nonneural,
                but still data-driven, approaches. Possible inputs for these models comprise
                a training set of normalized time-series with their associated captions, as well as the
                normalized time-series data for which a caption should be generated. Each normalized
                time series is composed by 12 values in the range [1, 100], where each value is
                associated with a specific month of the time series, so for example x1 with January, x2
                with February and so on. For each model type, we developed two variants: one generating
                one sentence about the chart, the other producing a sequence of sentences,
                i.e., a complete caption.
                </p>
                <Col xs="6">
                <br/>
                The model we've been working on (M0) is a standard neural model composed by two LSTMs: an encoder and a
                decoder. The core concept of this model is the cell state, which can carry relevant
                information throughout the processing of the sequence; so even information from
                the earlier time steps can influence later time steps, reducing the effects of short-term
                memory. One of the main advantage of this kind of model is that the input and
                the output sequences can be of different length. As shown in the next Figure, the encoder LSTM accepts as input the sequence of values
                xt of the time series and produces as output a vector of features called Encoder Vector
                which is fed into the decoder. The LSTM decoder predicts an output ht at time step
                t which, by applying a softmax function and a detokenization process,
                allow to obtain the output word wt.
                </Col>
                <Col xs="6" align="center"> 
                <br/>
                  <ImageZoom
                      image={{
                          src: require('../media/Images/Model_Architecture.png'),
                          alt: 'Pic not available',
                          className: 'img',
                          style: { width: '100%' }
                      }}
                      zoomImage={{
                          src:  require('../media/Images/Model_Architecture.png'),
                          alt: 'Pic not available'
                      }}
                      />   
                  <br/>
                </Col>
            </Row>
            
          </Container>
        </Jumbotron>
        </div>
        );
    }
  }
  
  export default connect()(Home);
  