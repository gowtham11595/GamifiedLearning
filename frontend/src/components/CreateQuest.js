import React, { Component } from 'react';
import classnames from 'classnames';
import {createQuest} from '../actions/Instructors';
import "../styling/Home.css";
import Menu from './Menu';
import { connect } from 'react-redux';
import axios from 'axios';

class CreateQuest extends Component {

  constructor() {
      super();
      this.state = {
          title: '',
          description: '',
          submissionDate:'',
          files:'',
          errors: {},
          courseTitle:'',
          loaded: 0
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleFileChange = this.handleFileChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
          that.setState({
              ['courseTitle'] : that.state.mainData[0]._id
          });
        }

      })
      .catch(error => console.log(error.response));
  }

  handleSubmit(e) {
      e.preventDefault();
      // console.log(e.target.files[0]);
      const quest = {
          title: this.state.title,
          description: this.state.description,
          submissionDate: this.state.submissionDate,
          files: this.state.files,
          courseTitle: this.state.courseTitle
      }
      this.props.createQuest(quest, this);
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
    console.log(this.state);
  }

  handleFileChange(event){
    let files = [];
    let fileOut = {};
    for(let size=0; size < event.target.files.length; size++){
      console.log('Selected file:', event.target.files[size]);
      let file = event.target.files[size];
      console.log("uploading ...");
      fileOut = file;
      files.push(file);
    }
    //this.setState({"files":files});

    this.setState({"files":fileOut});
    console.log("State-->"+JSON.stringify(this.state));
}

    render() {

       const { schemas } = this.state;

        return (
            <div>
              <Menu/><br/><br/><h2 style={{marginBottom: '20px'}}>Create Quest</h2>
              <form onSubmit={ this.handleSubmit }>
                  <div className="form-group">
                    <h6>Title</h6>
                      <input
                      type="text"
                      placeholder="Title"
                      className={classnames('form-control form-control-lg')}
                      name="title"
                      onChange={ this.handleInputChange }
                      />
                  </div>
                  <div className="form-group">
                    <h6>Description</h6>
                  <textarea name="description" onChange={ this.handleInputChange } className={classnames('form-control form-control-lg')} placeholder="Description" rows="10">
                  </textarea>
                  </div>
                  <h6>Upload Files</h6>
                  <div className="form-group">
                      <input
                      type="file"
                      className={classnames('form-control form-control-lg')}
                      name=""
                      onChange = {this.handleFileChange}
                      />
                  </div>
                  <div>
                    <h6>Submission Date</h6>
                    <input type="datetime-local" name="submissionDate" onChange={ this.handleInputChange } className={classnames('form-control form-control-lg')}/>
                  </div>
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
                  <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                          Create Quest
                      </button>
                       <div> {Math.round(this.state.loaded,2) } %</div>
                  </div>
              </form>

            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export  default connect(mapStateToProps, { createQuest })(CreateQuest)
//export default connect(mapStateToProps,{ createQuest })(withRouter(CreateQuest))
