import React, { Component } from 'react';
import { Container, Jumbotron} from 'reactstrap';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';

import unimib from '../media/Images/UNIMIB-LOGO.png';
import ubc from '../media/Images/UBC-LOGO.png';


class NavbarApp extends Component {
  state = {
    isOpen: false
  };

  buttonStyle = {
    maxWidth: '165px', 
    maxHeight: '50px',
    minWidth: '165px', 
    minHeight: '50px'}

    render() {
      return (
        <div>

        <Jumbotron style={{ marginBottom: '1rem', backgroundColor: '#f2f2f2' }}>
          <Container fluid>
            <Row>
              <Col xs="12" align="center">        
                <h3> "A Neural Approach to Data-Driven Generation of Captions for Information Visualization."</h3>
              </Col>
            </Row>

            <Row class="align-items-center">
              <Col xs="12" align="center">   
              Andrea Spreafico*, Giuseppe Carenini**, Raimondo Schettini*, Paolo Napoletano*
              </Col>
            </Row>

          <hr/><br/>

            <Row class="align-items-center">
            <div class="col-5 col-md-5" align="center">        
              <img src={unimib} alt={"No pic available"}  width="50" /><br/><br/>
                <b> *University of Milano Bicocca </b><br/>
                Imaging and Vision Laboratory
              </div>
              <div class="col-2 col-md-2" align="center">        
              </div>
              <div class="col-5 col-md-5" align="center">        
                <img src={ubc} alt={"No pic available"}  width="50" /><br/><br/>
                <b> **University of British Columbia </b><br/>
                Computational Intelligence Lab
              </div>
            </Row>
          </Container>
        </Jumbotron>
      
        <Container style={{ marginBottom: '2rem', marginTop: '2rem'}}>
        <Row>
          <Col align="center">        
            <Link to={{ pathname: '/'}} style={{color: "black"}}>
              <Fab variant="extended" aria-label="Delete" style={this.buttonStyle}>
                About
              </Fab>
            </Link>
          </Col>


          <Col align="center">         
            <Link to={{pathname: '/plots-collection'}} style={{color: "gray"}}>
              <Fab variant="extended" aria-label="Delete" style={this.buttonStyle}>
                Plots Collection
              </Fab>
            </Link>
          </Col>
          
          <Col align="center">        
            <Link to={{ pathname: '/contribute'}} style={{color: "black"}}>
              <Fab variant="extended" aria-label="Delete" style={this.buttonStyle}>
                Contribute
              </Fab>
            </Link>
          </Col>

          <Col align="center">         
            <Link to={{pathname: '/demo'}} style={{color: "gray"}}>
              <Fab variant="extended" aria-label="Delete" style={this.buttonStyle} >
                Demo
              </Fab>
            </Link>
          </Col>

        </Row>
        </Container>

        </div>
        );
    }
  }
  
  export default connect()(NavbarApp);
  