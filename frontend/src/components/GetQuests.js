import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Menu from './Menu';


export default class GetQuests extends Component {

  componentDidMount(){

  }

    render() {
        return (
          <div>
            <Menu/><br/>
              <div class="row card-columns">
              <div class="col-md-1"></div>
              <div class="col-md-4 card bg-light" style={{padding:"2em", marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>
                <Button className="btn btn-primary" value=""></Button>
              </div>
            </div>
          </div>
        );
    }
}
