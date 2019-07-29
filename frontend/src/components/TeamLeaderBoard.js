import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Menu from './Menu';
import axios from "axios";

export default class SelectCourseQuest extends Component {

  constructor(){
    super();
    this.state = this.props.location.state;
  }

  componentDidMount(){
    var that = this;
    axios
      .get("/api/students/getLeaderBoard/"+this.state.courseTitle)
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
              <div><h6>Created Badges</h6></div>
              {this.state && this.state.questData &&
              this.state.questData.length > 0 &&
              this.state.questData.map(schema => {
                return (
                  <div class="col-md-4 card bg-light" style={{padding:"1em", marginBottom: '40px', height:'10em',background:"#BFBFBF"}}>
                    <button key={schema._id} value={schema.name} className="btn btn-primary">{schema.name}</button>
                    <br/>
                      <img src={`${schema.avatar}`} height="70em" width="100em"/>
                  </div>);
              })}

              </form>
          </div>
        );
    }
}
