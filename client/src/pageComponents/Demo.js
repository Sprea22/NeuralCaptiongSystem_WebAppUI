import React, { Component } from 'react';
import { Container, Jumbotron,  Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import NavbarApp from './Navbar.js';

import myJson from '../media/Plots_Information.json';
import output_captions from '../media/system_output_captions.json';
import ImageZoom from 'react-medium-image-zoom'

class Demo extends Component {

    constructor(props) {
      super(props);
      this.handleUp = this.handleUp.bind(this);
      this.state = {
          output_sentence: "",
          output_caption: "",
          items: [],
          selected_key: -1          
      };
    }

    handleUp = event => {
      var new_id = event.target.id 
      this.setState(state => ({ selected_key: new_id }));
    }
    
    sentenceGen = e => {
      // random number between the 0 or 1 and the len of output_captions[this.state.selected_key]["caption"]
      var new_sentence_idx = 1
      var new_sentence = output_captions[this.state.selected_key]["sentence"][new_sentence_idx]
      this.setState(state => ({ output_sentence: new_sentence }));
    }

    captionGen = e => {
      // random number between the 0 or 1 and the len of output_captions[this.state.selected_key]["caption"]
      var new_caption_idx = 1
      var new_caption = output_captions[this.state.selected_key]["caption"][new_caption_idx]
      this.setState(state => ({ output_caption: new_caption }));
    }
    render() {
        
        while(this.state.items.length < 10){
            var r = Math.floor(Math.random()*100) + 1;
            if(this.state.items.indexOf(r) === -1) this.state.items.push(<li key={r}>{r + ".png"}</li>)
        }
        
        /* Sequence of indexes
        var items = []
        for (var i = 1; i < 6; i++) {
            items.push(<li key={i}>{i + ".png"}</li>)
          }
        */
        return (
        <div>
        <NavbarApp/>
        <Jumbotron style={{ marginTop: '1rem', marginLeft: '1rem', marginRight: '1rem' }}>
            <Container fluid align="center">
            <Row>
            {this.state.items.map(({key}) => (
                <Col>        
                    <Container fluid align="center">
                    <ImageZoom
                        image={{
                            src: require('../media/Plots_Collection/' + key + '.png'),
                            alt: 'Pic not available',
                            className: 'img',
                            style: { width: '200px', padding: '10px' }
                        }}
                    />
                    <br/>
                    <Button id={key} className='ml-3'color={this.state.colorButton} onClick={this.handleUp} >Line chart #{key}</Button>
                </Container>
                </Col>
                ))}
            </Row>
            </Container>

            <Container>
            <br/>
            <hr/>
            <br/>
            {this.state.selected_key !== -1 ? (
            <Row class="align-items-center">
            <Col xs="6" align="left"> 
                    <div> 
                        <li> <b> Title: </b> {myJson[this.state.selected_key]["title"]} </li>
                        <li> <b> Data Freq: </b> monthly </li>
                        <li> <b> Year: </b> {myJson[this.state.selected_key]["year"]} </li>
                        <li> <b> Location: </b> {myJson[this.state.selected_key]["geo"]} </li>
                        <li> <b> Unit of Measure: </b> {myJson[this.state.selected_key]["unit_of_measure"]} </li>
                    </div>
                </Col>
                <Col xs="6" align="left">

                        <ImageZoom
                        image={{
                            src: require('../media/Plots_Collection/' + this.state.selected_key + '.png'),
                            alt: 'Pic not available',
                            className: 'img',
                            style: { width: '70%' }
                        }}
                        zoomImage={{
                            src:  require('../media/Plots_Collection/' + this.state.selected_key + '.png'),
                            alt: 'Pic not available'
                        }}
                    />
                </Col>
                </Row>)
               
                : (<div> </div>)}
         
            </Container>  
        </Jumbotron>

        <Jumbotron style={{ marginTop: '1rem', marginLeft: '1rem', marginRight: '1rem' }}>
        <Row>
          <Col align="center">        
            <Button className='ml-3' onClick={this.sentenceGen} > Sentence Generation</Button>
              <hr/>
              {this.state.output_sentence}
          </Col>

          <Col align="center">     
            <Button className='ml-3' onClick={this.captionGen} > Caption Generation</Button>
            <hr/>
            {this.state.output_caption}
          </Col>
          
        </Row>
        </Jumbotron>

        </div>

        );
    }
  }
  
  export default connect()(Demo);  