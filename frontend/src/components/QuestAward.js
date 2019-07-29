import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import "../styling/Home.css";
import StudentsMenu from './StudentsMenu';
import axios from "axios";

class QuestAward extends Component {

  constructor(props){
    super(props);
    console.log("State="+JSON.stringify(this.props.location.state));
    this.state = this.props.location.state;
    this.downloadFile = this.downloadFile.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getCourseUsers = this.getCourseUsers.bind(this);
    this.getStudentSubmission = this.getStudentSubmission.bind(this);
    this.downloadStudentFile = this.downloadStudentFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    var that = this;
    axios
      .get("/api/students/getStudentQuest/"+this.props.location.state.id)
      .then(response => {
        console.log(response);
        var cl = response.data[0].fileName;
        var name = cl.split(";;gk;-;")[0];
        that.setState({
          "description": response.data[0].description,
          "fileName": response.data[0].fileName,
          "submissionDate": response.data[0].submissionDate,
          "courseTitle": response.data[0].courseTitle,
          "points":response.data[0].points,
          "pointsObtained":response.data[0].pointsObtained,
          "name": name,
          "comment":"",
          "students":""
        });
        that.getCourseUsers();
      })
      .catch(error => console.log(error.response));
  }

  downloadFile(e){
    var that = this;
    axios({
      url: "/api/students/download/"+e.target.value, //your url
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', that.state.name);
       document.body.appendChild(link);
       link.click();
    });
  }

  downloadStudentFile(e){
    var that = this;
    axios({
      url: "/api/students/download/"+e.target.value,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', that.state.nameStudentFile);
       document.body.appendChild(link);
       link.click();
    });
  }

  handleFileChange(event) {
    let files = [];
    let fileOut = {};
    for(let size=0; size < event.target.files.length; size++){
      console.log('Selected file:', event.target.files[size]);
      let file = event.target.files[size];
      console.log("uploading ...");
      fileOut = file;
      files.push(file);
    }
    this.setState({"files":fileOut});
    console.log("State-->"+JSON.stringify(this.state));
  }

  handleInputChange(e) {
    console.log(e);
      this.setState({
          [e.target.name]: e.target.value
      });
      if(e.target.name==="students"){
        this.getStudentSubmission(e.target.value);
        console.log("student ="+this.state.students);
      }
    console.log(this.state);
  }

  getCourseUsers(){
    var that = this;
    axios.get('/api/instructors/getCourseUsers/'+this.state.courseTitle)
            .then(response => {
                console.log(response.data);
                console.log("showing state = "+that.state);
                that.setState({'userData':response.data});
                console.log("after setting state = "+that.state);
                that.getStudentSubmission(response.data[0].email);
                that.setState({
                    "students": response.data[0].email
                });
              })
            .catch(err => {
            });
  }

  getStudentSubmission(email){
    var that = this;
  //  axios.get('/api/instructors/getStudentSubmission/'+this.state.emailSelected+"/"+this.state.questId)
    var json = {
                "email":email,
                "quest":this.state.id
                };
    console.log(json);
    axios.post('/api/instructors/getStudentSubmission',json)
            .then(response => {
                console.log(response.data);
                console.log("showing state = "+that.state);
                that.setState({'comment':response.data[0].comments,
                                'sFileNameFull':response.data[0].fileName,
                                "givenPoints":response.data[0].givenPoints
                });
                  //nameStudentFile
                  var nameStudentFile = response.data[0].fileName.split(";;gk;-;");
                  if(nameStudentFile.length>1){
                    that.setState({
                            'nameStudentFile':nameStudentFile[0]
                                  });
                  }
                console.log("after setting state = "+that.state);
              })
            .catch(err => {
              console.log(err);
            });
  }


  handleSubmit(e){
    e.preventDefault();
    var that = this;
  //  axios.get('/api/instructors/getStudentSubmission/'+this.state.emailSelected+"/"+this.state.questId)
    if(this.state.points< this.state.givenPoints){
      alert("AwardPoints cannot exceed Max Points");
      return;
    }
    var json = {
                "email":this.state.students,
                "quest":this.state.id,
                "givenPoints":this.state.givenPoints
                };
    console.log(json);
    axios.post('/api/instructors/awardStudentSubmission',json)
            .then(response => {
              alert("Updated Points");
              console.log("Success");
              })
            .catch(err => {
              alert("Please refresh");
            });
  }

  render() {
      return (
        <div>
          <StudentsMenu/><br/>
          <h6>Grading</h6>
          Title:{this.state.title}<br/>
          Course ID: {this.state.courseId}<br/>
          Quest ID: {this.state.id}<br/>
          Course Name: {this.state.courseName}<br/>
          Description: {this.state.description}<br/>
          Course Files: <button onClick={this.downloadFile} value = {this.state.fileName} className="btn btn-success">{this.state.name}</button><br/>
          Submission Date: {this.state.submissionDate}<br/>
          Max Points: {this.state.points}<br/><br/>
          <h6>Select Student</h6>
          <div>
              <select onChange={this.handleInputChange} name="students" className={classnames('form-control form-control-lg')}>
                {this.state && this.state.userData &&
                this.state.userData.length > 0 &&
                this.state.userData.map(schema => {
                  return <option key={schema._id} value={schema.email}>{schema.name}</option>;
                })}
              </select>
          </div>
          <div>
          <div><h6>Comments:</h6>{this.state.comment}</div>
            Submitted Files: <button onClick={this.downloadStudentFile} value = {this.state.sFileNameFull} className="btn btn-success">{this.state.nameStudentFile}</button><br/>
          </div>
          <div><h6>Points Allocated:  {this.state.givenPoints}</h6></div>
          <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <h6>Points</h6>
              <input
              type="number"
              placeholder="Points"
              className={classnames('form-control form-control-lg')}
              name="givenPoints"
              onChange={ this.handleInputChange }
              />
              <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                      Update Points
                  </button>
              </div>
          </div>
          </form>
        </div>
        )
      }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, {  })(QuestAward)
