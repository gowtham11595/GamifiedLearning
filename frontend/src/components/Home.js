import React, { Component } from 'react';

import "../styling/Home.css";
import Menu from './Menu';

export default class Home extends Component {

  componentDidMount(){

  }


    render() {
        return (
            <div>

              <Menu/>
              <div class="row card-columns">
                <div class="col-md-1"></div>
                <div class="col-md-4 card bg-light" style={{padding:"2em",marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>
                  <a href="/createCourse">Create Course</a>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-4 card bg-light" style={{padding:"2em", marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>
                  <a href="/showCourses">Show Courses</a>
                </div>
              </div>

            </div>
        );
    }
}
