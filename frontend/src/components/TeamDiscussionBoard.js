import React, { Component } from 'react';
import classnames from 'classnames';
import "../styling/Home.css";
import StudentsMenu from './StudentsMenu';
import axios from "axios";

export default class TeamDiscussionBoard extends Component {

  constructor(props){
    super(props);
    console.log("Statessss="+JSON.stringify(this.props.location.state));
    this.state = this.props.location.state;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.likeClicked = this.likeClicked.bind(this);
  }

  handleInputChange(e) {
      this.setState({
          [e.target.name]: e.target.value
      });
    console.log(this.state);
  }

  handleSubmit(e) {
      e.preventDefault();

      const commentData = {
        "teamId":this.state.teamData._id,
        "courseTitle": this.state.teamData.courseTitle,
        "comment":this.state.newComment
      }
      axios.post('/api/students/teamPostComment',commentData)
              .then(res => {
              //alert("Comment Posted");
               window.location.reload();
            })
              .catch(err => {
                console.log(err);
              });
  }

  componentDidMount() {
    var that = this;
    axios
      .get("/api/students/getTeamDiscussionBoard/"+this.state.teamData._id)
      .then(response => {
        that.message = response.data[0];
        that.setState({"message":that.message});
        console.log(that.state);
        window.scrollTo(0,document.body.scrollHeight);
      })
      .catch(error => console.log(error.response));
    }

    likeClicked(event){
      console.log(event.target.value);
      const commentData = {
        "id":this.state.message._id,
        "dataNumber": event.target.value
      }
      axios.post('/api/students/teamPostCommentLike',commentData)
              .then(res => {
              //alert("Comment Posted");
               window.location.reload();
            })
              .catch(err => {
                console.log(err);
              });
    }


    render() {
        return (
          <div>
            <StudentsMenu/><br/>
            Discussion Board<br/>
            {this.state && this.state.message &&
            this.state.message.data.length > 0 &&
            this.state.message.data.map(schema => {
              return (
                <div class="col-md-4 card bg-light" style={{padding:"0.5em", marginBottom: '2em', height:'3em',background:"#BFBFBF"}}>
                    <div><b>{schema.name}</b>: {schema.comment} <button class="btn" id={schema._id} onClick={this.likeClicked} value={schema._id}>Like</button> {schema.likes}</div>
                </div>);
            })}
            <form onSubmit={ this.handleSubmit }>
              <textarea rows="10" cols="100" name="newComment" onChange={ this.handleInputChange }>
              </textarea>
              <br/>
              <button type="submit" className="btn btn-primary">
                  Send
              </button>
            </form>
          </div>
        );
    }
}
