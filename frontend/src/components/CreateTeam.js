import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "../styling/Home.css";
import Menu from './Menu';
import { getCourseUsers,createTeam } from '../actions/Instructors';
import classnames from 'classnames';
import { connect } from 'react-redux';
import axios from 'axios';

class CreateTeam extends Component {

  constructor() {
      super();
      this.state = {
        "teamName":'',
        "teamDetails":[],
        "courseTitle":""
      }
      this.getCourseUsers = this.getCourseUsers.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleInputChange(e){
      console.log(e.target.name+" "+e.target.value);
      console.log(e.target.checked);
      if((''+e.target.name)==='courseTitle'){
        this.setState({
            [e.target.name] : this.state.mainData[e.target.selectedIndex]._id
        });
        console.log(this.setState.courseTitle);
        //callfunction
      //  this.getStudents();
      this.getCourseUsers(this, this.state.mainData[e.target.selectedIndex]._id);
      }
      else if(e.target.name==="member"){
        if(!e.target.checked) {
        var teamDArray = this.state.teamDetails;
        var filtered = teamDArray.filter(function(item) {
                         return item.email !== e.target.value;
                      });
        this.setState({"teamDetails":teamDArray});
      }
      else {
        var teamDArray = this.state.teamDetails;
        if(teamDArray===null){
          teamDArray = [e.target.value];
        } else {
          teamDArray.push({"email":e.target.value});
        }
        this.setState({"teamDetails":teamDArray});
      }
    } else {
      this.setState({
          [e.target.name]: e.target.value
      })
    }
    }


    handleSubmit(e) {
        e.preventDefault();
        const team = {
          "teamName":this.state.teamName,
          "teamDetails":this.state.teamDetails,
          "courseTitle":this.state.courseTitle
        }
        this.props.createTeam(team, this.props.history);
    }

    componentDidMount(){
      console.log("Came in");
      //this.getCourseUsers(this);
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
            //this.callme(this.state.mainData[0]._id);
            that.setState({
                ['courseTitle'] : that.state.mainData[0]._id
            });
            that.getCourseUsers(that,that.state.mainData[0]._id);
          }

        })
        .catch(error => console.log(error.response));
    }

    getCourseUsers(thisPointer, value){
      console.log("Came get 1");
      //e.preventDefault();
      console.log("before calling function "+this.state);
      //this.props.getCourseUsers(this);
      var that = thisPointer;
      axios.get('/api/instructors/getCourseUsers/'+value)
              .then(response => {
                  //that.setState({data:response.data});
                  console.log(response.data);
                  console.log("showing state = "+that.state);
                  that.setState({'userData':response.data});
                  console.log("after setting state = "+that.state);
                })
              .catch(err => {

              });
    }


    render() {
        return (
            <div>
              <Menu/><br/><br/><h2 style={{marginBottom: '20px'}}>Create Team</h2>
                <form onSubmit={ this.handleSubmit }>
                  <h6>Select Course</h6>
                  <div>
                      <select onChange={this.handleInputChange} name="courseTitle" className={classnames('form-control form-control-lg')}>
                        {this.state && this.state.mainData &&
                        this.state.mainData.length > 0 &&
                        this.state.mainData.map(schema => {
                          return <option key={schema._id} value={schema.courseTitle}>{schema.courseTitle}</option>;
                        })}
                      </select>
                  </div>
                  <br/>
                    <div className="form-group">
                      <h6>Team Name</h6>
                        <input
                        type="text"
                        placeholder="Team Name"
                        className={classnames('form-control form-control-lg')}
                        name="teamName"
                        onChange={ this.handleInputChange }
                        />
                    </div>
                    <div className="form-group">
                      <div class="col-md-4 card bg-light" style={{padding:"1em", marginBottom: '40px', height:'10em',background:"#BFBFBF"}}>
                      {this.state && this.state.userData &&
                      this.state.userData.length > 0 &&
                      this.state.userData.map(schema => {
                        return (
                          <div>
                            <input type="checkbox" key={schema._id} name="member" onChange={ this.handleInputChange } value={schema.email}/>{schema.name}
                          </div>
                          );
                      })}
                      </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Create Team
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}


CreateTeam.propTypes = {
    getCourseUsers: PropTypes.func.isRequired,
    createTeam:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export  default connect(mapStateToProps, { getCourseUsers,createTeam })(CreateTeam)
