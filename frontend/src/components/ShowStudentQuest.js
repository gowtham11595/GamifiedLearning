import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import "../styling/Home.css";
import StudentsMenu from './StudentsMenu';
import axios from "axios";


class ShowStudentQuests extends Component {

  constructor(props){
    super(props);
    console.log("State="+JSON.stringify(this.props.location.state));
    this.state = this.props.location.state;
    this.downloadFile = this.downloadFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
          "points":response.data[0].points,
          "pointsObtained":response.data[0].pointsObtained,
          "name": name
        });
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
      })
    console.log(this.state);
  }

  handleSubmit(e){
    e.preventDefault();
    const quest = {
        comments: this.state.comments,
        files: this.state.files,
        courseTitle: this.state.courseId,
        questId: this.state.id
    }

    var bodyFormData = new FormData();
    bodyFormData.set('comments', quest.comments);
    bodyFormData.set('questId', quest.questId);
    bodyFormData.set('courseTitle', quest.courseTitle);
    bodyFormData.set('file', quest.files);

    axios.post('/api/students/uploadQuest', bodyFormData)
      .then((result) => {
          console.log("My Response");
          alert("Quest uploaded");
      });
  }

  render() {
      return (
        <div>
          <StudentsMenu/><br/>
          <h6>Quest</h6>
          Title:{this.state.title}<br/>
          Course ID: {this.state.courseId}<br/>
          Quest ID: {this.state.id}<br/>
          Course Name: {this.state.courseName}<br/>
        Course Files: <button onClick={this.downloadFile} value = {this.state.fileName} className="btn btn-success">{this.state.name}</button><br/>
          Submission Date: {this.state.submissionDate}<br/>
        Points: {this.state.points}<br/>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group"><br/>
                Submission:<br/>
                <textarea rows="5" cols = "50" name="comments" onChange={this.handleInputChange} placeholder="Comments"></textarea>
                <br/>
                <input
                type="file"
                className={classnames('form-control form-control-lg')}
                name=""
                onChange = {this.handleFileChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
          </form>

        </div>
        )
      }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, {  })(ShowStudentQuests)
