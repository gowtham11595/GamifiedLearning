import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "../styling/Home.css";
import Menu from './Menu';
import { getCourseUsers } from '../actions/Instructors';
import classnames from 'classnames';

export default class CreateTeam extends Component {

  constructor() {
      super();
      this.getCourseUsers = this.getCourseUsers.bind(this);
    }

    componentDidMount(){
      //console.log("Came in");
      this.getCourseUsers();
    }

    getCourseUsers(){
      console.log("Came get 1");
      //e.preventDefault();
      //this.props.getCourseUsers();
    }


    render() {
        return (
            <div>
              <Menu/><br/><br/><h2 style={{marginBottom: '20px'}}>Create Team</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <input
                        type="title"
                        placeholder="Title"
                        className={classnames('form-control form-control-lg')}
                        name="email"
                        onChange={ this.handleInputChange }
                        />
                    </div>
                    <div className="form-group">
                    <input type="checkbox" value="Gowtham Kesa"/><label style={{marginRight:"2em"}}>Gowtham Kesa</label>
                    <input type="checkbox" value="Preetham Kesa"/><label style={{marginRight:"2em"}}>Preetham Kesa</label>
                    <input type="checkbox" value="Yuan"/><label style={{marginRight:"2em"}}>Yuan</label>
                    <input type="checkbox" value="Rick"/><label style={{marginRight:"2em"}}>Rick</label>
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
    auth: PropTypes.object.isRequired
}
