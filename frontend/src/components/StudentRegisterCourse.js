import React, { Component } from 'react';
import classnames from 'classnames';
import {createCourseRegistration} from '../actions/Students';
import "../styling/Home.css";
import Menu from './StudentsMenu';
import { connect } from 'react-redux';
import axios from 'axios';

class StudentRegisterCourse extends Component {

  constructor() {
      super();
      this.state = {
          courseId: '',
          courseTitle: '',
          courseName: '',
          errors: {},
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    var that = this;
    axios
      .get("/api/students/getStudentCourses")
      .then(response => {
        console.log(response);
        var courseTitles = [];
        for(var i=0;i<response.data.length;i++){
          courseTitles.push(response.data[i].courseTitle);
        }

        that.setState({ data: courseTitles });
        console.log("this state = "+that.state);
        console.log(that.state.data);
        that.setState({mainData:response.data});
        if(response.data && response.data.length >0){
          that.setState({
              ['courseTitle'] : that.state.mainData[0].courseId
          });
          that.setState({
              ['courseName'] : that.state.mainData[0].courseTitle
          });
        }

      })
      .catch(error => console.log(error.response));
  }

  handleSubmit(e) {
      e.preventDefault();
      const registerCourse = {
          courseTitle: this.state.courseTitle,
          courseName: this.state.courseName
      }
      this.props.createCourseRegistration(registerCourse, this);
  }

  handleInputChange(e) {
    if((''+e.target.name)==='courseTitle'){
      this.setState({
          ["courseTitle"] : this.state.mainData[e.target.selectedIndex].courseId
      });

      this.setState({
          ["courseName"] : e.target.value
      });

      console.log(this.state.courseTitle);
    } else {
      this.setState({
          [e.target.name]: e.target.value
      })
    }
    console.log(this.state);
  }

    render() {

       const { schemas } = this.state;

        return (
            <div>
              <Menu/><br/><br/><h2 style={{marginBottom: '20px'}}>Course Registration</h2>
              <form onSubmit={ this.handleSubmit }>
                  <div>
                    <h6>Course Title</h6>
                      <select onChange={this.handleInputChange} name="courseTitle" className={classnames('form-control form-control-lg')}>
                        {this.state && this.state.mainData &&
                        this.state.mainData.length > 0 &&
                        this.state.mainData.map(schema => {
                          return <option key={schema._id} value={schema.courseTitle}>{schema.courseTitle}</option>;
                        })}
                      </select>
                  </div>
                  <br/>
                  <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                          Register
                      </button>
                  </div>
              </form>

            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export  default connect(mapStateToProps, { createCourseRegistration })(StudentRegisterCourse)
//export default connect(mapStateToProps,{ createQuest })(withRouter(CreateQuest))
