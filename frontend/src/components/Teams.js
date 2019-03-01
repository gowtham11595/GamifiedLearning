import React, { Component } from 'react';

import Menu from './Menu';

export default class Teams extends Component {

  componentDidMount(){

  }

    render() {
        return (
            <div>
              <Menu/><br/>
              <div class="row card-columns">
              <div class="col-md-1"></div>
              <div class="col-md-4 card bg-light" style={{padding:"2em",marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>
                <a href="/createTeam">Create Team</a>
              </div>
              <div class="col-md-1"></div>
              <div class="col-md-4 card bg-light" style={{padding:"2em", marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>
                <a href="/showTeams">Show Teams</a>
              </div>
            </div>
            </div>
        );
    }
}
