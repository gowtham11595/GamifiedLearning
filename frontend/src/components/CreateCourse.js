import React, { Component } from 'react';
import classnames from 'classnames';
import {createCourse} from '../actions/Instructors';
import "../styling/Home.css";
import Menu from './Menu';
import { connect } from 'react-redux';

class CreateCourse extends Component {

  constructor() {
      super();
      this.state = {
          courseTitle: '',
          description: '',
          startDate:'',
          endDate:'',
          errors: {}
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){

  }

  handleSubmit(e) {
      e.preventDefault();
      const course = {
          courseTitle: this.state.courseTitle,
          description: this.state.description,
          startDate: this.state.startDate,
          endDate: this.state.endDate
      }
      this.props.createCourse(course, this.props.history);
  }


  handleInputChange(e){
    this.setState({
        [e.target.name]: e.target.value
    })
  }

    render() {
        return (
            <div>
              <Menu/><br/><br/><h2 style={{marginBottom: '20px'}}>Create course</h2>
              <form onSubmit={ this.handleSubmit }>
                  <div className="form-group">
                    <h6>Title</h6>
                      <input
                      type="text"
                      placeholder="Title"
                      className={classnames('form-control form-control-lg')}
                      name="courseTitle"
                      onChange={ this.handleInputChange }
                      />
                  </div>
                  <div className="form-group">
                    <h6>Description</h6>
                  <textarea name="description" onChange={ this.handleInputChange } className={classnames('form-control form-control-lg')} placeholder="Description" rows="4">
                  </textarea>
                  </div>
                  <div>
                    <h6>Start Date</h6>
                    <input type="date" name="startDate" onChange={ this.handleInputChange } className={classnames('form-control form-control-lg')}/>
                  </div>
                  <div>
                    <h6>End Date</h6>
                    <input type="date" name="endDate" onChange={ this.handleInputChange } className={classnames('form-control form-control-lg')}/>
                  </div>
                  <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                          Create Course
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
export  default connect(mapStateToProps, { createCourse })(CreateCourse)
