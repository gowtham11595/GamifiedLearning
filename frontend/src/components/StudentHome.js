import React, { Component } from 'react';

import "../styling/Home.css";
import StudentsMenu from './StudentsMenu';

export default class StudentHome extends Component {

  componentDidMount(){

  }

    render() {
        return (
            <div>

              <StudentsMenu/><br/>
              <div class="row card-columns">
                <div class="col-md-1"></div>
                <div class="col-md-4 card bg-light" style={{padding:"2em",marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>
                  <a href="/registerCourse">Course Registration</a>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-4 card bg-light" style={{padding:"2em", marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>
                  <a href="/enrolledCourses">Enrolled Courses</a>
                </div>
              </div>

            </div>
        );
    }
}
