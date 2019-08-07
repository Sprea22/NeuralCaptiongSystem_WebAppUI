import React, { Component } from 'react';
import { Jumbotron, Input, Button, Form, FormGroup, Label, Container} from 'reactstrap';
import { connect } from 'react-redux';
import NavbarApp from './Navbar.js';
import { Row, Col } from 'reactstrap';
import ImageZoom from 'react-medium-image-zoom'
import PropTypes from 'prop-types';
import moment from 'moment';

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
          eng_certif : "",
          eng_certif_res : "",
          eng_nat_speaker : "",
          start_time : ""
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

        var end_time_nf = new Date();
        var end_time_f = end_time_nf.getHours() + ":" + end_time_nf.getMinutes() + ":" + end_time_nf.getSeconds();
        var start_time_f = this.state.start_time.getHours() + ":" + this.state.start_time.getMinutes() + ":" + this.state.start_time.getSeconds();

        var t1 = moment(start_time_f, "HH:mm:ss");
        var t2 = moment(end_time_f, "HH:mm:ss");
        var t3 = moment(t2.diff(t1, 'seconds'));

        const newCaption = {
            id_caption : this.state.current_image_id,
            img_filename : this.state.current_image_filename,
            caption_content :  this.state.caption_content,
            age :  this.state.age,
            gender :  this.state.gender,
            study : this.state.study,
            study_field : this.state.study_field,
            eng_certif : this.state.eng_certif,
            eng_certif_res : this.state.eng_certif_res,
            eng_nat_speaker : this.state.eng_nat_speaker,
            total_time : t3._i
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
        var end_time = new Date();
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

                                <Label for="age">What is your age?</Label>
                                    <Input type="select" name="age" id="age" placeholder=" -- select an option -- " onChange={this.onChange}>
                                    <option disabled selected value> -- select an option -- </option>
                                        <option>Under 18</option>
                                        <option>18-24</option>
                                        <option>25-34</option>
                                        <option>35-44</option>
                                        <option>45-54</option>
                                        <option>55-64</option>
                                        <option>Over 64</option>
                                    </Input>
                                <Label for="gender" style={{ marginTop: '1rem' }}> How do you identify your gender? </Label>
                                    <Input type="select" name="gender" id="gender" placeholder=" -- select an option -- " onChange={this.onChange}>
                                    <option disabled selected value> -- select an option -- </option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Prefer not to answer</option>
                                        <option>Others</option>
                                    </Input>

                                {this.state.gender === "Others" ? 
                                (  <Container>    
                                        <Label for="study_field" style={{ marginTop: '1rem' }}> You can specify here your gender: </Label>
                                        <Input type="textarea" name="study_field" id="study_field" rows="1" onChange={this.onChange}></Input>
                                    </Container>
                                ) : (<Container/>)}

                                <Label for="study" style={{ marginTop: '1rem' }}>What is the highest degree or level of school you have completed? If currently enrolled, select the highest degree you are currently enrolled in: </Label>
                                    <Input type="select" name="study" id="study" onChange={this.onChange}>
                                        <option disabled selected value> -- select an option -- </option>
                                        <option>Nursery school to 8th grade</option>
                                        <option>High school</option>
                                        <option>Bachelor’s degree</option>
                                        <option>Master’s degree</option>
                                        <option>Professional  degree</option>
                                        <option>Doctorate  degree</option>
                                    </Input>

                                {this.state.study !== "Nursery school to 8th grade" & this.state.study !== "" ? 
                                (  <Container>    
                                        <Label for="study_field" style={{ marginTop: '1rem' }}> What is your main field of study?</Label>
                                        <Input type="textarea" name="study_field" id="study_field" rows="1" onChange={this.onChange}></Input>
                                    </Container>
                                ) : (<Container/>)}

                                <Label for="eng_nat_speaker" style={{ marginTop: '1rem' }}> Are you a native English speaker? </Label>
                                    <Input type="select" name="eng_nat_speaker" id="eng_nat_speaker" onChange={this.onChange}>
                                        <option disabled selected value> -- select an option -- </option>
                                        <option>Yes</option>
                                        <option>No</option>
                                </Input>

                                {this.state.eng_nat_speaker === "No" ?
                                (<Container> 
                                    <Label for="eng_certif" style={{ marginTop: '1rem' }}> Did you obtain any kind of certification of your English level?</Label>
                                    <Input type="select" name="eng_certif" id="eng_certif" onChange={this.onChange}>
                                        <option disabled selected value> -- select an option -- </option>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </Input>
                                </Container>) : 
                                (<Container/>)
                                }


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
                            <Row class="align-items-center" style={{ marginTop: '1rem' }}>
                                <h6>What is a caption?</h6>
                                <div>
                                    A caption is a title or brief explanation appended to an article, illustration, cartoon, or poster. 
                                    It can also be attached also to a figure in order to provide textual description of the contents.
                                    <br/>
                                    A caption should be concise but comprehensive. They should describe the data shown, draw attention to 
                                    important features contained within the figure, and may sometimes also include interpretations of the data.
                                </div>
                            </Row>
                            <br/>
                            <Row style={{ marginTop: '1rem' }}>
                                <Col align="middle">
                                    <ImageZoom
                                        image={{
                                            src: require('../media/captions.png'),
                                            alt: 'Pic not available',
                                            className: 'img',
                                            style: { width: '100%' }
                                        }}
                                        zoomImage={{
                                            src:  require('../media/captions.png'),
                                            alt: 'Pic not available'
                                        }}
                                    /> 
                                    <br/><br/>
                                    Basic examples of general purpose images caption.
                                </Col>
                            </Row>
                              
                            <hr/>
                                <h4 style={{ marginTop: '5rem' }}> Contribute to the research: </h4>   
                            <hr/>

                                <Row class="align-items-center" style={{ marginTop: '1rem' }}>
                                    <Col xs="6" align="left" >
                                      <Label for="caption_content"> <h6> What is the following graph about?  
                                          </h6> Please write in the following input field a caption about the graph reported on the right.
                                          Try to describe it using less than 75 words. </Label>
                                        <Input type="textarea" name="caption_content" id="caption_content" rows="10" onChange={this.onChange}/>
                                        Words counter: {this.state.caption_content.split(" ").length}/75
                                        {this.state.caption_content.split(" ").length === 2 & this.state.start_time === "" ?
                                            (this.setState({start_time : new Date()})) : ("")
                                            }
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