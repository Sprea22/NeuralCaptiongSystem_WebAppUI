import React, { Component } from 'react';
import { Jumbotron, Input, Button, Form, FormGroup, Label, Container} from 'reactstrap';
import { connect } from 'react-redux';
import NavbarApp from './Navbar.js';
import { Row, Col } from 'reactstrap';
import ImageZoom from 'react-medium-image-zoom'
import PropTypes from 'prop-types';

import {getCaptions, addCaption} from './../actions/captionActions';

function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

class CaptionModal extends Component {
    static propTypes = {
        getCaptions: PropTypes.func.isRequired,
        addCaption: PropTypes.func.isRequired,
      };

      state = {
          initialized : false,
          current_image_id : -1,
          current_image_filename : "1.png",
          caption_content : "",
          age : "",
          gender : "",
          study : "",
          study_field : "",
          work : "",
          work_occupation : "",
          eng_certif : "",
          eng_certif_res : ""
      }

    componentDidMount() {
        var items = []
        var stored_captions = []
        var captions_counter = {}
        const { captions } = this.props.caption;
        this.props.getCaptions();

        for (var i = 1; i < 101; i++) {
            items.push(i + ".png")
          }

        for (var c = 0; c < captions.length; c++) {
            stored_captions.push(captions[c].img_filename)              
        }

        // Counting how many captions have been already stored for each image in the list
        for (var j = 0; j < items.length; j++) {
            var item = items[j]
            var count_item_captions = getOccurrence(stored_captions, item)
            captions_counter[item] = count_item_captions
        }

        // Selecting the images with less captions
        var keys   = Object.keys(captions_counter);
        var lowest = Math.min.apply(null, keys.map(function(x) { return captions_counter[x]} ));
        var match  = keys.filter(function(y) { return captions_counter[y] === lowest });

        // Select a random image between the images with less captions
        var newRandomItem = match[Math.floor(Math.random()*match.length)];

        this.setState({current_image_filename : newRandomItem})
        this.setState({current_image_id : newRandomItem.split(".")[0]})

    }
    
    onSubmit = e => {
        e.preventDefault()
        const newCaption = {
            id_caption : this.state.current_image_id,
            img_filename : this.state.current_image_filename,
            caption_content :  this.state.caption_content,
            age :  this.state.age,
            gender :  this.state.gender,
            study : this.state.study,
            study_field : this.state.study_field,
            work : this.state.work,
            work_occupation : this.state.work_occupation,
            eng_certif : this.state.eng_certif,
            eng_certif_res : this.state.eng_certif_res,
        }
        this.props.addCaption(newCaption);
        this.props.history.push('/plots-collection');
    }
        
    toggleFAQ = e => {
        this.setState({ [e.target.name]: !e.target.value });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
    render() {
        return (
            <div>
            <NavbarApp/>
                <Jumbotron style={{ marginTop: '1rem', marginLeft: '1rem', marginRight: '1rem' }}>
                <Container fluid align="center">
                    <h2>Contribute to the research!</h2>
                    </Container>
                </Jumbotron>

                <Jumbotron style={{ marginTop: '1rem', marginLeft: '1rem', marginRight: '1rem' }}>
                    
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                            <Jumbotron style={{ marginTop: '-2rem', marginLeft: '1rem', marginRight: '1rem', marginBottom: '-1rem'}}>
                                <h4> Personal Details: </h4>    

                                <Label for="age">What's your age?</Label>
                                    <Input type="textarea" name="age" id="age" rows="1" placeholder=" -- select an option -- " onChange={this.onChange}/>

                                <Label for="gender" style={{ marginTop: '1rem' }}>What's your gender?</Label>
                                    <Input type="select" name="gender" id="gender" placeholder=" -- select an option -- " onChange={this.onChange}>
                                    <option disabled selected value> -- select an option -- </option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </Input>

                                <Label for="study" style={{ marginTop: '1rem' }}>Are you currently enrolled in or have you previously completed any academic studies?</Label>
                                    <Input type="select" name="study" id="study" onChange={this.onChange}>
                                        <option disabled selected value> -- select an option -- </option>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </Input>

                                {this.state.study === "Yes" ? 
                                (  <Container>    
                                        <Label for="study_field" style={{ marginTop: '1rem' }}> What is your field of study?</Label>
                                        <Input type="textarea" name="study_field" id="study_field" rows="1" onChange={this.onChange}></Input>
                                    </Container>
                                ) : (<Container/>)}

                                {this.state.study === "No" ? 
                                (
                                    <Container>                           
                                        <Label for="work" style={{ marginTop: '1rem' }}> Are you currently working?	</Label>
                                        <Input type="select" name="work" id="work" onChange={this.onChange}>
                                            <option disabled selected value> -- select an option -- </option>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </Input>
                                    </Container> 
                                ) : (<Container/>)}

                                {this.state.study === "No" && this.state.work === "Yes"? 
                                (  <Container>    
                                        <Label for="work_occupation" style={{ marginTop: '1rem' }}> What is your occupation? </Label>
                                        <Input type="textarea" name="work_occupation" id="work_occupation" rows="1" onChange={this.onChange}></Input>
                                    </Container>
                                ) : (<Container/>)}


                                <Label for="eng_certif" style={{ marginTop: '1rem' }}> Did you obtain any kind of certification of your English level?</Label>
                                    <Input type="select" name="eng_certif" id="eng_certif" onChange={this.onChange}>
                                        <option disabled selected value> -- select an option -- </option>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </Input>

                                {this.state.eng_certif === "Yes" ?
                                (  <Container>    
                                        <Label for="eng_certif_res" style={{ marginTop: '1rem' }}> What is your certified English level? </Label>
                                        <Input type="select" name="eng_certif_res" id="eng_certif_res" rows="1" onChange={this.onChange}>  
                                        <option disabled selected value> -- select an option -- </option>
                                        <option>C2 (Proficiency)</option>
                                        <option>C1 (Advanced)</option>
                                        <option>B2 (Upper-Intermediate)</option>
                                        <option>B1 (Intermediate)</option>
                                        <option>A2 (Elementary)</option>
                                        <option>A1 (Beginner) </option>
                                        </Input>
                                    </Container>
                                ) : (<Container/>)
                                }

                                {this.state.eng_certif === "No" ?
                                ( <Container>    
                                    <Label for="eng_certif_res" style={{ marginTop: '1rem' }}> How would you evaluate your English level? </Label>
                                    <Input type="select" name="eng_certif_res" id="eng_certif_res" rows="1" onChange={this.onChange}>  
                                    <option disabled selected value> -- select an option -- </option>
                                    <option>C2 (Proficiency)</option>
                                    <option>C1 (Advanced)</option>
                                    <option>B2 (Upper-Intermediate)</option>
                                    <option>B1 (Intermediate)</option>
                                    <option>A2 (Elementary)</option>
                                    <option>A1 (Beginner) </option>
                                    </Input>
                                </Container>) : (<Container/>)
                                }

                            </Jumbotron>

                            <Jumbotron style={{ marginTop: '-2rem', marginLeft: '1rem', marginRight: '1rem' }}>
                                <h4> General information: </h4>   
                            <hr/>
                                <h6>What is a figure caption?</h6>
                                <div>
                                    A figure caption is a textual description about the figure contents.
                                </div>
                            <hr/>
                                <h6>Why is it important to report a caption together with the figure?</h6>
                                <div>
                                    Because a figure caption, if well structured, would allows readers to better interpret and understand the figure itself.                                
                                </div>
                            <hr/>
                                <h6>How would a figure caption be?</h6>
                                <div>
                                    Captions should be concise but comprehensive. They should describe the data shown, draw attention to important features contained within the figure, and may sometimes also include interpretations of the data
                                </div>
                            <hr/>
                                <h6>Which are considered the most important features of a data chart?</h6>
                                <div>
                                Some examples of important features about a data chart image would be maximum/minimum value, trends, pattern or unusual values.
                                </div>
                            <hr/>

                                <h4 style={{ marginTop: '5rem' }}> Line chart caption form: </h4>   
                            <hr/>

                                <Row class="align-items-center" style={{ marginTop: '1rem' }}>
                                    <Col xs="6" align="left" >
                                      <Label for="caption_content"> <h6> What is the following graph about?  </h6> Describe the most significant trends, patterns and features about it. </Label>
                                      <Input type="textarea" name="caption_content" id="caption_content" rows="10" onChange={this.onChange}/>
                                    </Col>
                                    <Col xs="6" align="left">
                                        <ImageZoom
                                        image={{
                                            src: require('../media/Plots_Collection/' + this.state.current_image_filename),
                                            alt: 'Pic not available',
                                            className: 'img',
                                            style: { width: '100%' }
                                        }}
                                        zoomImage={{
                                            src:  require('../media/Plots_Collection/' + this.state.current_image_filename),
                                            alt: 'Pic not available'
                                        }}
                                        />
                                    </Col>
                                </Row>
                            <hr style={{ marginTop: '2rem'}}/>
                                <Button color='dark' style={{ marginTop: '2rem'}} block>
                                    Submit the form
                                </Button>
                            </Jumbotron>
                      
                            </FormGroup>
                        </Form>
            </Jumbotron>
            </div>
        );
    }
  }

  const mapStateToProps = state => ({
      caption: state.caption
  })

  export default connect(
      mapStateToProps, {getCaptions, addCaption}
  )(CaptionModal);  