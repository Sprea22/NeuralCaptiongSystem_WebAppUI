import React, { Component } from 'react';
import { Container, Jumbotron, ListGroup, ListGroupItem} from 'reactstrap';
import { connect } from 'react-redux';
import NavbarApp from './Navbar.js';
import { Row, Col } from 'reactstrap';
import myJson from '../media/JSON_Files/Plots_Information.json';
import ImageZoom from 'react-medium-image-zoom'

class PlotsCollection extends Component {

    render() {
        
        var items = []
        for (var i = 1; i < 101; i++) {
            items.push(<li key={i}>{i + ".png"}</li>)
          }

        return (
            <div>

            <NavbarApp/>
            <Jumbotron style={{ marginTop: '1rem', marginLeft: '1rem', marginRight: '1rem' }}>
            <Container fluid align="center">
                <h2>Plots Collection</h2>
                </Container>
            </Jumbotron>

            <Container>
            <ListGroup>
                {items.map(({key}) => (
                    <ListGroupItem>
                        <Jumbotron>
                        <Container fluid align="center">
                            <h4> Plot #{key} - {myJson[key]["title"]} </h4>   
                        </Container>
                        <hr/>
                            <Row class="align-items-center">
                                <div class="col-12 col-md-8" align="center">
                                    <ImageZoom
                                        image={{
                                            src: require('../media/Plots_Collection/' + key + '.png'),
                                            alt: 'Pic not available',
                                            className: 'img',
                                            style: { width: '70%' }
                                        }}
                                        zoomImage={{
                                            src:  require('../media/Plots_Collection/' + key + '.png'),
                                            alt: 'Pic not available'
                                        }}
                                    />

                                </div>
                                <br/><br/>
                                <div class="col-12 col-md-4" align="left"> 
                                    <div> 
                                    <li> <b> Title: </b> {myJson[key]["title"]} </li>
                                    <li> <b> Data Freq: </b> monthly </li>
                                    <li> <b> Year: </b> {myJson[key]["year"]} </li>
                                    <li> <b> Location: </b> {myJson[key]["geo"]} </li>
                                    <li> <b> Unit of Measure: </b> {myJson[key]["unit_of_measure"]}</li>
                                    <li> <b> Source: </b> <url> https://www150.statcan.gc.ca </url></li>
                                    </div>
                                </div>
                            </Row>
                        </Jumbotron> 
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>  

            </div>
        );
    }
  }

  export default connect()(PlotsCollection);  