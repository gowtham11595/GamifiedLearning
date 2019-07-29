import React, { Component } from 'react';
import classnames from 'classnames';
import "../styling/Home.css";
import StudentsMenu from './StudentsMenu';
import axios from "axios";
import {Link} from 'react-router-dom';

export default class StudentTeam extends Component {

  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getTeamId = this.getTeamId.bind(this);
  }

  componentDidMount() {
    var that = this;
    axios
      .get("/api/students/getStudentRegisteredCourses")
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
          that.setState({
              ['courseTitle'] : that.state.mainData[0].courseId
          });
          that.setState({
              ['courseName'] : that.state.mainData[0].courseTitle
          });
        }
        this.setState({selectedCourseName:this.state.mainData[0].courseTitle});
        that.getTeamId(that.state.mainData[0].courseId);
      })
      .catch(error => console.log(error.response));
  }

  getTeamId(id) {
    //Calling backend to retrieve quests
    var that = this;
    axios
      .get("/api/students/getTeamDetails/"+id)
      .then(response => {
        console.log(response.data);
        that.setState({teamData:response.data});
        console.log("state = "+JSON.stringify(that.state));
      })
      .catch(error => console.log(error.response));
  }

  handleInputChange(e) {
    if((''+e.target.name)==='courseTitle'){
      this.setState({
          [e.target.name] : this.state.mainData[e.target.selectedIndex]._id
      });
      console.log(this.setState.courseTitle);
    } else {
      this.setState({
          [e.target.name]: e.target.value
      })
    }
    this.setState({selectedCourseName:this.state.mainData[e.target.selectedIndex].courseTitle});
    this.getTeamId(this.state.mainData[e.target.selectedIndex].courseId);

  }

    render() {
        return (
          <div>
            <StudentsMenu/><br/>
            <div>
              <h6>Course Title</h6>
                <select onChange={this.handleInputChange} name="courseTitle" className={classnames('form-control form-control-lg')}>
                  {this.state && this.state.mainData &&
                  this.state.mainData.length > 0 &&
                  this.state.mainData.map(schema => {
                    return <option key={schema._id} value={schema.courseTitle}>{schema.courseTitle}</option>;
                  })}
                </select>
            </div>
            <br/>
            <div class="row card-columns">
            <div class="col-md-1"></div>
            <div class="col-md-4 card bg-light" style={{padding:"2em",marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>
              <a href="/showStudentTeam">Show Team</a>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-4 card bg-light" style={{padding:"2em", marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>

              <Link to={{ pathname: '/sdiscussionBoard', state: this.state }}>
                  Discussion Board
              </Link>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-4 card bg-light" style={{marginLeft:"6em",padding:"2em", marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>
              <a href="/sbadges">Badges</a>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-4 card bg-light" style={{padding:"2em", marginBottom: '40px', height:'100px',background:"#BFBFBF"}}>
                <Link to={{ pathname: '/sLeaderBoard', state: this.state }}>
                    LeaderBoard
                </Link>
            </div>
            </div>

          </div>
        );
    }
}
