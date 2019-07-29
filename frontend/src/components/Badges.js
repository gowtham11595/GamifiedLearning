import React, { Component } from 'react';
import classnames from 'classnames';

import "../styling/Home.css";
import Menu from './Menu';

export default class Badges extends Component {

  componentDidMount(){

  }

    render() {
        return (
          <div>
            <Menu/><br/>
            <div class="row card-columns">
            <div class="col-md-1"></div>
            <div class="col-md-4 card bg-light" style={{padding:"2em",marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>
              <a href="/createBadge">Create Badge</a>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-4 card bg-light" style={{padding:"2em", marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>
              <a href="/showBadges">Show Badges</a>
            </div>
          </div>
          </div>
        );
    }
}
