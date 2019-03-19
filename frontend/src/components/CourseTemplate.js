import React, { Component,PropTypes } from 'react';

import styles from '../App.css';

export default class CourseTemplate extends Component {

  componentDidMount(){

  }

    render() {
        return (
          <div>
          <div class="row card-columns">
            <div class="col-md-4 card bg-light" style={{padding:"2em",marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>
              <a href="/createQuest"></a>
            </div>
          </div>
          </div>
        );
    }
}
