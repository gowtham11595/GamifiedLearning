import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Menu from './Menu';
import axios from "axios";

export default class ShowTeams extends Component {

  constructor(){
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.callme = this.callme.bind(this);
  }

  componentDidMount(){
    var that = this;
    axios
      .get("/api/instructors/getCourseNames")
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

    this.callme(this.state.mainData[e.target.selectedIndex]._id);

  }

  callme(id){
    //Calling backend to retrieve quests
    var that = this;
    axios
      .get("/api/instructors/getTeamFromCourse/"+id)
      .then(response => {
        console.log(response);
        var teamData = [];
        for(var i=0; i<response.data.length; i++) {
            var teamD = "";
            var teamN = response.data[i].teamName;
            //teamData.teamDetails[i]= "";
            for(var j = 0; j < response.data[i].teamDetails.length ; j++) {
              teamD = teamD + response.data[i].teamDetails[j].email+" ";
              console.log("teamD= "+teamD);
            }
              teamData.push({"teamName":teamN, "teamDetails":teamD});
        }
        console.log(JSON.stringify(teamData));
        that.setState({"teamData":teamData});
      })
      .catch(error => console.log(error.response));
  }

    render() {
        return (
          <div>
            <Menu/><br/>
              <form onSubmit={ this.handleSubmit }>
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
              <div><h6>Created Quests</h6></div>
              {this.state && this.state.teamData &&
              this.state.teamData.length > 0 &&
              this.state.teamData.map(schema => {
                return (
                  <div key={schema._id} class="col-md-4 card bg-light" style={{padding:"1em", marginBottom: '40px', height:'10em',background:"#BFBFBF"}}>
                    <p>
                    <h6>Team Name : <br/>{schema.teamName}<br/></h6>
                        Team Members : <br/>{schema.teamDetails}<br/>
                  </p>
                 </div>);
              })}

              </form>
          </div>
        );
    }
}
