import React, { Component } from 'react';
import classnames from 'classnames';
import {getCourses} from '../actions/Instructors';
import "../styling/Home.css";
import Menu from './Menu';
import { connect } from 'react-redux';
import axios from 'axios';

class ShowCourses extends Component {

  constructor() {
      super();
  }

  componentDidMount(){
    var that = this;
    axios
      .get("/api/students/getMyCourses")
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
              <Menu/><br/><br/><h2 style={{marginBottom: '20px'}}>Get courses</h2>
                {this.state && this.state.mainData &&
                this.state.mainData.length > 0 &&
                this.state.mainData.map(schema => {
                  return (
                    <div key={schema._id} class="col-md-4 card bg-light" style={{padding:"1em", marginBottom: '40px', height:'5em',background:"#BFBFBF"}}>
                      <p>
                      <h3>Title : {schema.courseTitle}<br/></h3>
                    </p>
                   </div>);
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export  default connect(mapStateToProps, { getCourses })(ShowCourses)
