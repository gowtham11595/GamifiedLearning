import React, { Component } from 'react';

import "../styling/Home.css";

export default class Home extends Component {

  componentDidMount(){

  }


    render() {
        return (
            <div>
              <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#news">News</a></li>
              <li className="dropdown">
              <a href="javascript:void(0)" className="dropbtn">Dropdown</a>
              <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
              </li>
              </ul>
            </div>
        );
    }
}
