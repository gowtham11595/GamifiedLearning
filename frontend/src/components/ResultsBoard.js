import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Menu from './Menu';
import axios from "axios";

export default class ResultsBoard extends Component {

  constructor(){
    super();
    this.state = this.props.location.state;
  }

  componentDidMount(){
    var that = this;
    axios
      .get("/api/students/getResults/"+this.state.courseTitle)
      .then(response => {
        console.log(response);
        var courseTitles = [];
        for(var i=0;i<response.data.length;i++){
          courseTitles.push(response.data[i].courseTitle);
        }
        that.setState({ data: courseTitles });
        console.log("this state = "+that.state);
        console.log(that.state.data);
        that.setState({mainData:response.data});
        if(response.data && response.data.length >0){
          this.callme(this.state.mainData[0]._id);
          that.setState({
              ['courseTitle'] : that.state.mainData[0]._id
          });
        }

      })
      .catch(error => console.log(error.response));
  }
  render() {
      return (
        <div>
          <StudentsMenu/><br/>
            
        </div>
      );
  }
}
