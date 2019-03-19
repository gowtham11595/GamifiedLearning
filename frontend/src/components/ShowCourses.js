import React, { Component } from 'react';
import classnames from 'classnames';
import {getCourses} from '../actions/Instructors';
import "../styling/Home.css";
import Menu from './Menu';
import { connect } from 'react-redux';

class ShowCourses extends Component {

  constructor() {
      super();
  }

  componentDidMount(){
    console.log("Logging="+this.props);
    this.props.getCourses();
  }

    render() {
        return (
            <div>
              <Menu/><br/><br/><h2 style={{marginBottom: '20px'}}>Get courses</h2>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export  default connect(mapStateToProps, { getCourses })(ShowCourses)
