import React, { Component } from 'react';
import { Jumbotron, Input, Collapse,
    Alert, Button, Form, FormGroup, 
    Label, Modal, ModalHeader, ModalBody, 
    ModalFooter, Container} from 'reactstrap';
import { connect } from 'react-redux';
import NavbarApp from './Navbar.js';
import { Row, Col } from 'reactstrap';
import ImageZoom from 'react-medium-image-zoom'
import PropTypes from 'prop-types';
import moment from 'moment';

import {getCaptions, addCaption} from './../actions/captionActions';
import formValidation from './FormValidation.js';

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

      constructor(props) {
        super(props);
        this.toggleTips = this.toggleTips.bind(this);
        this.state = {
            tipsSection: false,
            errors: [],
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
            start_time : "",
            modal : false
        }
      }
  

    getRandomChart() {
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

    componentDidMount() {
        this.getRandomChart()
    }

    toggleTips() {
        this.setState(state => ({ tipsSection: !state.tipsSection }));
      }
    
    onSubmit = e => {
        e.preventDefault()

        if(this.state.start_time !== "") {
            var end_time_nf = new Date();
            var end_time_f = end_time_nf.getHours() + ":" + end_time_nf.getMinutes() + ":" + end_time_nf.getSeconds();
            var start_time_f = this.state.start_time.getHours() + ":" + this.state.start_time.getMinutes() + ":" + this.state.start_time.getSeconds();
    
            var t1 = moment(start_time_f, "HH:mm:ss");
            var t2 = moment(end_time_f, "HH:mm:ss");
            var t3 = moment(t2.diff(t1, 'seconds'));
            var total_time_f = t3._i
        } else {
            total_time_f = ""
        }

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
            total_time : total_time_f
        }

        const errors = formValidation(newCaption);

        if (errors.length > 0) {
          this.setState({ errors });
          return;
        }
        else {
            this.props.addCaption(newCaption);
            this.setState({ errors : []})
            this.setState({ modal: !this.state.modal });
        }
    }
        
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

    toggleExit  = e => {
        this.props.history.push('/');
    }

    toggleAnotherCaption  = e =>{
        this.setState({ modal: !this.state.modal });
        this.setState({ caption_content: "" });
        document.getElementById("caption_content").value = "";

        this.getRandomChart()
        this.props.history.push('/contribute');
    }
    
    render() {

        const { errors } = this.state;

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
                                        <option>Others</option>
                                        <option>Prefer not to answer</option>
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
                                        <option>8th grade or below</option>
                                        <option>High school</option>
                                        <option>Bachelor degree</option>
                                        <option>Master degree</option>
                                        <option>Professional  degree</option>
                                        <option>Doctorate  degree</option>
                                    </Input>

                                {this.state.study !== "8th grade or below" & this.state.study !== "" ? 
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
                                        It can also be attached to a data chart in order to provide textual description and interpretation of the contents.
                                        A caption should be concise but comprehensive. It should describes the data shown, draw attention to 
                                        important features contained within the figure, and may sometimes also include interpretations of the data.
                                    </div>
                                </Row>

                                <br/>
                                
                                <Row style={{ marginTop: '1rem', marginBottom: '3rem' }}>
                                    <Col align="middle">
                                        <ImageZoom
                                            image={{
                                                src: require('../media/captions.jpg'),
                                                alt: 'Pic not available',
                                                className: 'img',
                                                style: { width: '80%' }
                                            }}
                                            zoomImage={{
                                                src:  require('../media/captions.jpg'),
                                                alt: 'Pic not available'
                                            }}
                                        /> 
                                        <br/><br/>
                                        Examples of image captions.
                                    </Col>
                                </Row>
                            
                            <Button color="secondary" onClick={this.toggleTips} style={{ marginTop: '1rem', marginBottom: '1rem' }}> Show the tips.. </Button>
                            <Collapse isOpen={this.state.tipsSection} name="tipsSection" id="tipsSection">
                    
                            <hr/> 
                            <h6 style = {{ display: "inline-block"}}> Adverbs: </h6> dramatically, rapidly, hugely, massive, sharply, steeply, considerably, substantially, significantly, slightly, minimally, markedly.
                                   <hr/> 
                                    <Row class="align-items-center" style={{ marginTop: '1rem' }}>
                                        <Col xs="3" align="left" >                 
                                            <h6>Verbs - Upward:</h6>              
                                            rise, increase, grow, climb, jump, surge, gain, soar, raise, advance, boost
                                        </Col>
                                        <Col xs="3" align="left" > 
                                            <h6>Verbs - Downward:</h6> 
                                            fall, decline, drop, slip, plunge, slide, lose, tumble, plummet, ease, decrease, reduce, dip, shrink
                                        </Col>
                                        <Col xs="3" align="left" > 
                                            <h6>Verbs - Constant:</h6> 
                                            remain stable, remain steady, stay constant, maintain the same level, no changes
                                        </Col>
                                        <Col xs="3" align="left" > 
                                            <h6>Verbs - Upward/Downard:</h6>
                                            fluctuate, oscillate, alternate <br/>
                                        </Col>
                                    </Row>
                            </Collapse>

                         <hr/>
                            <h4> Contribute to the research: </h4>   
                            <hr/>

                                <Row class="align-items-center" style={{ marginTop: '1rem' }}>
                                    <Col xs="6" align="left" >
                                      <Label for="caption_content"> <h6> What is the following graph about?  
                                          </h6> Please write a caption about the graph shown on the right in the following input field.
                                          Try to describe it using less than 75 words. </Label>
                                        <Input type="textarea" name="caption_content" id="caption_content" rows="10" onChange={this.onChange} ref={el => this.caption_content = el}/>
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

                            {errors.length > 0 ? (<Alert color='danger'> {errors.map(error => (<p key={error}>Error : {error}</p>))}</Alert>) : null}

                                <Button color='dark'style={{ marginTop: '2rem'}} block>
                                    Submit the form
                                </Button>
                                <Modal isOpen={this.state.modal}className={this.props.className}>
                                    <ModalHeader>Thanks for your contribution!</ModalHeader>
                                    <ModalBody>
                                        Thank you again for taking the time to contribute to our research. We truly value the information you have provided.
                                        <br/><br/>
                                        If you have time to submit an another caption it would be great for the research, and we would be extremely grateful with you!
                                        <br/><br/>
                                        <b/>Note: <b/>you will not have to insert your personal details again! 
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.toggleAnotherCaption}>Submit a new caption</Button>{' '}
                                        <Button color="secondary" onClick={this.toggleExit}>Exit</Button>
                                    </ModalFooter>
                                </Modal>
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