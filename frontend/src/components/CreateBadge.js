import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createBadge } from '../actions/Instructors';
import classnames from 'classnames';
import axios from 'axios';
import Menu from './Menu';
class CreateBadge extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            courseTitle:'',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
      console.log(e.target.name);
      if(e.target.name === 'avatar'){
        var that = this;
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        var eventName = e.target.name;
        reader.onload = function() {
          console.log(reader.result);
          this.setState({["Avatar"]:reader.result});
        }.bind(this);

      } else if(e.target.name === "courseTitle"){
        this.setState({
            [e.target.name]: this.state.mainData[e.target.selectedIndex]._id
        })
      }
      else {
        this.setState({
            [e.target.name]: e.target.value
        })
      }
    }

    setImage(that,img){
      that.setState({['avatar']:img});
    }

    handleSubmit(e) {
        e.preventDefault();
        const badge = {
            name: this.state.name,
            courseTitle:this.state.courseTitle,
            avatar: this.state.Avatar
        }
        this.props.createBadge(badge, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.auth.isAuthenticated) {
            alert("Session expired login again");
            this.props.history.push('/login')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated) {
          alert("Session expired login again");
            this.props.history.push('/login');
        } else {

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
    }

    render() {
        const { errors } = this.state;
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
          <Menu/><br/><br/>
            <h2 style={{marginBottom: '40px'}}>Create Badge</h2>
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
                <div className="form-group">
                  <h6>Badge Name</h6>
                    <input
                    type="text"
                    placeholder="Name"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                    })}
                    name="name"
                    onChange={ this.handleInputChange }
                    value={ this.state.name }
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <h6>Badge Image</h6>
                    <input
                    type="file"
                    placeholder="Choose your Avatar"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.avatar
                    })}
                    name="avatar"
                    onChange={ this.handleInputChange }
                    value={ this.state.avatar }
                    />
                  {errors.avatar && (<div className="invalid-feedback">{errors.avatar}</div>)}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Create Badge
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

CreateBadge.propTypes = {
    createBadge: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ createBadge })(withRouter(CreateBadge))
