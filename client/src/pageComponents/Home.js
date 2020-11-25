import React, { Component } from 'react';
import { Container, Jumbotron, Row, Col} from 'reactstrap';
import { connect } from 'react-redux';
import NavbarApp from './Navbar.js';
import ImageZoom from 'react-medium-image-zoom'
import "./../Publication-design.css"
  
class Home extends Component {

    render() {
      return (
        <div>
        
        <NavbarApp/>

        <Jumbotron style={{ marginTop: '1rem', marginLeft: '1rem', marginRight: '1rem' }}>
          <Container fluid>
          <Row  class="align-items-center">
            <h4>AVI Conference 2020 - ACM Publication</h4>
              <hr/>
              <div class="multi-search multi-search--issue-item">
              <ul class="rlist ">
                  <li class="grid-item separated-block--dashed--bottom">
                      <div class="issue-item clearfix">
                          <div class="issue-item__citation">
                              <div class="issue-heading">short-paper</div>
                          </div>
                          <div class="issue-item__content">
                              <h5 class="issue-item__title"><a
                                      href="https://dl.acm.org/doi/10.1145/3399715.3399829?cid=99659584207">Neural
                                      Data-Driven Captioning of Time-Series Line
                                      Charts</a></h5>

                              <ul class="rlist--inline loa truncate-list"
                                  title="list of authors" data-lines="2">
                                  <li><a href="https://dl.acm.org/profile/99659584207"
                                          title="Andrea Spreafico"><img
                                              class="author-picture"
                                              src="https://dl.acm.org/do/10.1145/contrib-99659584207/rel-imgonly/img_9687.jpg"
                                              alt="Andrea Spreafico profile image" /><span>Andrea
                                              Spreafico</span></a><span
                                          class="loa_author_inst hidden">
                                          <p data-doi="10.1145/contrib-99659584207">
                                              University of Milano Bicocca, Italy</p>
                                      </span><span>, </span></li>
                                  <li><a href="https://dl.acm.org/profile/81100417032"
                                          title="Giuseppe Carenini"><img
                                              class="author-picture"
                                              src="https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg"
                                              alt="Giuseppe Carenini profile image" /><span>Giuseppe
                                              Carenini</span></a><span
                                          class="loa_author_inst hidden">
                                          <p data-doi="10.1145/contrib-81100417032">
                                              University of British Columbia, Canada</p>
                                      </span></li>
                              </ul>

                              <div class="issue-item__detail"><span>September
                                      2020</span><span class="dot-separator">pp 1-5
                                  </span><span><a
                                          href="https://doi.org/10.1145/3399715.3399829"
                                          class="issue-item__doi  dot-separator">https://doi.org/10.1145/3399715.3399829</a></span>
                              </div>
                              <div data-lines='4'
                                  class="issue-item__abstract truncate-text">
                                  <div class="issue-item__abstract truncate-text"
                                      data-lines="4">

                                      <p>The success of neural methods for image captioning suggests that
                                        similar benefits can be reaped for generating captions for information
                                        visualizations. In this preliminary study, we focus on the
                                        very popular line charts. We propose a neural model which aims to
                                        generate text from the same data used to create a line chart. Due to
                                        the lack of suitable training corpora, we collected a dataset through
                                        crowdsourcing. Experiments indicate that our model outperforms
                                        relatively simple non-neural baselines.
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </li>
              </ul>
          </div>  
          </Row>
          <br/><br/>
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
                <br/><br/>
                </Row>
                <Row class="align-items-center">
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
            </Row>
            
          </Container>
        </Jumbotron>
        </div>
        );
    }
  }
  
  export default connect()(Home);
  