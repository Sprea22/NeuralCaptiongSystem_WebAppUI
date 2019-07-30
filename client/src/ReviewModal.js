import React, { Component } from 'react';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Jumbotron,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import { addReview } from '../../actions/reviewActions';
import PropTypes from 'prop-types';
import formValidation from './../../validationForms/ReviewValidation.js';

class ReviewModal extends Component {
  state = {
    errors: [],
    startMobility: "toFill",
    endMobility: "toFill",
    id_reviewer: "toFill",
    id_university_reviewed: "toFill",
    university_Q1: 0,
    university_Q2: 0,
    university_Q3: 0,
    university_Q4: 0,
    university_QE: "",
    faculty_Q1: 0,
    faculty_Q2: 0,
    faculty_Q3: 0,
    faculty_QE: "",
    city_Q1: 0,
    city_Q2: 0,
    city_Q3: 0,
    city_Q4: 0,
    city_QE: "",
    housing_Q1: 0,
    housing_Q2: 0,
    housing_Q3: 0,
    housing_Q4: 0,
    housing_Q5: 0,
    housing_Q6: 0,
    housing_QE: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault()
    console.log(this)
    const newReview = {
      id_reviewer: this.props.location.state.user_id,
      id_university_reviewed: this.props.location.state.university_id,
      startMobility: this.state.startMobility,
      endMobility: this.state.endMobility,
      university_Q1: this.state.university_Q1,
      university_Q2: this.state.university_Q2,
      university_Q3: this.state.university_Q3,
      university_Q4: this.state.university_Q4,
      university_QE: this.state.university_QE,
      faculty_Q1: this.state.faculty_Q1,
      faculty_Q2: this.state.faculty_Q2,
      faculty_Q3: this.state.faculty_Q3,
      faculty_QE: this.state.faculty_QE,
      city_Q1: this.state.city_Q1,
      city_Q2: this.state.city_Q2,
      city_Q3: this.state.city_Q3,
      city_Q4: this.state.city_Q4,
      city_QE: this.state.city_QE,
      housing_Q1: this.state.housing_Q1,
      housing_Q2: this.state.housing_Q2,
      housing_Q3: this.state.housing_Q3,
      housing_Q4: this.state.housing_Q4,
      housing_Q5: this.state.housing_Q5,
      housing_Q6: this.state.housing_Q6,
      housing_QE: this.state.housing_QE
    };

    console.log("Sending the form to the validation..")
    // Check if there is an invalid field within the Review Form
    const errors = formValidation(newReview);

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }
    else {
      // Add review via addReview action
      this.props.addReview(newReview);
  
      // Redirecting to the home page
      this.props.history.push('/');
    }
  };

  render() {
    const { errors } = this.state;
    
    console.log(this)
    return (
        <div>
          <Jumbotron style={{ marginLeft: '1rem', marginRight: '1rem' }}>
            <Container fluid>
            <h4> Review form: </h4>          
            </Container>
          </Jumbotron>

            <Form onSubmit={this.onSubmit}>

              <FormGroup>
              <Jumbotron style={{ marginLeft: '1rem', marginRight: '1rem' }}>
                <Container fluid>
                <h4 > About the mobility period..</h4>  
                <hr/>
                <Label for="startMobility">Start date of your mobility</Label>
                  <Input
                    type="date"
                    name="startMobility"
                    id="startMobility"
                    placeholder="date placeholder"
                    onChange={this.onChange}
                  />

                <Label for="endMobility"  style={{ marginTop: '1rem' }}>End date of your mobility</Label>
                  <Input
                    type="date"
                    name="endMobility"
                    id="endMobility"
                    placeholder="date placeholder"
                    onChange={this.onChange}
                  />
                </Container>
              </Jumbotron>

              <Jumbotron style={{ backgroundColor: '#d9c9fc', marginLeft: '1rem', marginRight: '1rem' }}>
               <Container fluid>
               <h4> About the university..</h4><hr/> 
                <Label for="university_Q1">How would you evaluate the host university support about pre-mobility bureaucracy?</Label>
                  <Input type="select" name="university_Q1" id="university_Q1" onChange={this.onChange}>
                    <option disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                <Label for="university_Q2" style={{ marginTop: '1rem' }}>How would you evaluate the host university welcomming services and quality?</Label>
                  <Input type="select" name="university_Q2" id="university_Q2" onChange={this.onChange}>
                    <option disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>

                <Label for="university_Q3" style={{ marginTop: '1rem' }}>How would you evaluate the host university buildings, laboratories and study rooms?</Label>
                  <Input type="select" name="university_Q3" id="university_Q3" onChange={this.onChange}>
                    <option disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>

                <Label for="university_Q4" style={{ marginTop: '1rem' }}>How would you evaluate the host university services? (Canteen, sports facilities, libraries, etc..) </Label>
                  <Input type="select" name="university_Q4" id="university_Q4" onChange={this.onChange}>
                    <option disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>

                <Label for='university_QE' style={{ marginTop: '1rem' }}>Do you have any other tips or remarks about the host university that you would like to share?</Label>
                <Input type='text' name="university_QE" maxLength="2000" placeholder='Extra question..' id="university_QE" onChange={this.onChange} />
              </Container>
            </Jumbotron>

            <Jumbotron style={{ backgroundColor: '#d8f4cc', marginLeft: '1rem', marginRight: '1rem' }}>
              <Container fluid>
              <h4 > About the faculty..</h4> 
              <hr/>
                <Label for="faculty_Q1">Were the pre required language skills coherent with the host university's courses language requirements? </Label>
                  <Input type="select" name="faculty_Q1" id="faculty_Q1" onChange={this.onChange}>
                    <option disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>

                <Label for="faculty_Q2" style={{ marginTop: '1rem' }}>How would you on average evaluate the courses you attended and their quality?</Label>
                  <Input type="select" name="faculty_Q2" id="faculty_Q2" onChange={this.onChange}>
                    <option disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>

                <Label for="faculty_Q3" style={{ marginTop: '1rem' }}>Have your academic background skills been useful for exams and courses at the host university?</Label>
                  <Input type="select" name="faculty_Q3" id="faculty_Q3" onChange={this.onChange}>
                    <option disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>

                <Label for='faculty_QE' style={{ marginTop: '1rem' }}>Do you have any other tips or remarks about the department/courses that you would like to share?</Label>
                  <Input type='text' name="faculty_QE" maxLength="2000" placeholder='Extra question..' id="faculty_QE" onChange={this.onChange} />
            
              </Container>
            </Jumbotron>

            <Jumbotron style={{ backgroundColor: '#cfe2f3', marginLeft: '1rem', marginRight: '1rem' }}>
              <Container fluid>
              <h4 > About the city..</h4> 
              <hr/>
                <Label for="city_Q1">How would you evaluate the average english skills of the people within the city?</Label>
                  <Input type="select" name="city_Q1" id="city_Q1" onChange={this.onChange}>
                    <option disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>

                <Label for="city_Q2" style={{ marginTop: '1rem' }}>How would you evaluate the services and opportunities that the city offers to the international students?</Label>
                  <Input type="select" name="city_Q2" id="city_Q2" onChange={this.onChange}>
                    <option disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input> 

                <Label for="city_Q3" style={{ marginTop: '1rem' }}>How would you evaluate the public transportation quality?</Label>
                  <Input type="select" name="city_Q3" id="city_Q3" onChange={this.onChange}>
                    <option disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>

                <Label for="city_Q4" style={{ marginTop: '1rem' }}>Do you think that the cost of the life is coherent with what's reported within the Erasmus concour?</Label>
                  <Input type="select" name="city_Q4" id="city_Q4" onChange={this.onChange}>
                    <option disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>

                <Label for='city_QE' style={{ marginTop: '1rem' }}>Do you have any other tips or remarks about the city itself that you would like to share?</Label>
                  <Input type='text' name="city_QE" maxLength="2000" placeholder='Extra question..' id="city_QE" onChange={this.onChange} />

                </Container>
             </Jumbotron>

             <Jumbotron style={{ backgroundColor: '#ffe599', marginLeft: '1rem', marginRight: '1rem' }}>
               <Container fluid>
               <h4 > About the housing..</h4> 
               <hr/> 
                <Label for="housing_Q1">Did you easily find an accommodation? (1 means it has been hard. 5 means it has been easy.)</Label>
                  <Input type="select" name="housing_Q1" id="housing_Q1" onChange={this.onChange}>
                    <option disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                  
                <Label for="housing_Q2" style={{ marginTop: '1rem' }}>Did you spend your time in private accommodation or in a student housing?</Label>
                  <Input type="select" name="housing_Q2" id="housing_Q2" onChange={this.onChange}>
                    <option disabled selected value> -- select an option -- </option>
                    <option>Private accommodation</option>
                    <option>Student Housing</option>

                  </Input>
                  
                <Label for="housing_Q3" style={{ marginTop: '1rem' }}>Would you consider the monthly rent cheap? (1 means it was expensive, 5 means it was cheap)</Label>
                  <Input type="select" name="housing_Q3" id="housing_Q3" onChange={this.onChange}>
                    <option disabled selected value> -- select an option -- </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                  
                {this.state.housing_Q2 === "Student Housing" ? 
                  ( <Container>    
                    <Label for="housing_Q4" style={{ marginTop: '1rem' }}> How would you overall evaluate your student housing?</Label>
                    <Input type="select" name="housing_Q4" id="housing_Q4" onChange={this.onChange}>
                      <option disabled selected value> -- select an option -- </option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                    
                  <Label for="housing_Q5" style={{ marginTop: '1rem' }}> Would you mind to share the name of your student housing?</Label>
                    <Input type="text" maxLength="60" name="housing_Q5" id="housing_Q5" placeholder='(Facoltative) Student housing name.. 'onChange={this.onChange}/>

                  </Container>
                  ) : ( <Container/> ) }
                {this.state.housing_Q2 === "Private accommodation" ? 
                  (
                    <Container> 
                    <Label for="housing_Q6" style={{ marginTop: '1rem' }}>How would you overall evaluate your private residence?</Label>
                    <Input type="select" name="housing_Q6" id="housing_Q6" onChange={this.onChange}>
                      <option disabled selected value> -- select an option -- </option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                    </Container>
                  ) : ( <Container/> ) }
                

                <Label for='housing_QE' style={{ marginTop: '1rem' }}>Do you have any other tips or remarks about the accommodation that you would like to share?</Label>
                  <Input type='text' name="housing_QE" maxLength="2000" placeholder='Extra question..' id="housing_QE" onChange={this.onChange} />

                  </Container>
                </Jumbotron>
              </FormGroup>
              
            <Container fluid style={{ marginTop: '2rem', marginBottom: '2rem'  }} > 

            {errors.length > 0 ? (<Alert color='danger'> {errors.map(error => (<p key={error}>Error : {error}</p>))}</Alert>) : null}
              
              <Button color='dark' style={{ marginTop: '2rem', marginBottom: '2rem'  }} block>
                Add Review
              </Button>

            </Container>
            </Form>
          </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  review: state.review,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { addReview }
)(ReviewModal);
