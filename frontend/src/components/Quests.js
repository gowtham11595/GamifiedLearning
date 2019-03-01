import React, { Component } from 'react';
import classnames from 'classnames';

import "../styling/Home.css";
import Menu from './Menu';

export default class Quests extends Component {

  componentDidMount(){

  }

    render() {
        return (
          <div>
            <Menu/><br/>
            <div class="row card-columns">
            <div class="col-md-1"></div>
            <div class="col-md-4 card bg-light" style={{padding:"2em",marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>
              <a href="/createQuest">Create Quest</a>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-4 card bg-light" style={{padding:"2em", marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>
              <a href="/showQuests">Show Quests</a>
            </div>
          </div>
          </div>
        );
    }
}
