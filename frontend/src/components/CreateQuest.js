import React, { Component } from 'react';
import classnames from 'classnames';
import {createQuest} from '../actions/Instructors';
import "../styling/Home.css";
import Menu from './Menu';
import { connect } from 'react-redux';

class CreateQuest extends Component {

  constructor() {
      super();
      this.state = {
          title: '',
          description: '',
          files:'',
          errors: {}
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleFileChange = this.handleFileChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){

  }

  handleSubmit(e) {
      e.preventDefault();
      // console.log(e.target.files[0]);
      const quest = {
          title: this.state.title,
          description: this.state.description,
          files: this.state.files
      }
      this.props.createQuest(quest);
  }


  handleInputChange(e){
    this.setState({
        [e.target.name]: e.target.value
    })
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
    //this.setState({["files"]:files});

    this.setState({"files":fileOut});
    console.log("State-->"+JSON.stringify(this.state));
}

    render() {
        return (
            <div>
              <Menu/><br/><br/><h2 style={{marginBottom: '20px'}}>Create Quest</h2>
              <form onSubmit={ this.handleSubmit }>
                  <div className="form-group">
                      <input
                      type="text"
                      placeholder="Title"
                      className={classnames('form-control form-control-lg')}
                      name="title"
                      onChange={ this.handleInputChange }
                      />
                  </div>
                  <div className="form-group">
                  <textarea name="description" onChange={ this.handleInputChange } className={classnames('form-control form-control-lg')} placeholder="Description" rows="10">
                  </textarea>
                  </div>
                  <h6>Upload Files</h6>
                  <div className="form-group">
                      <input
                      type="file"
                      className={classnames('form-control form-control-lg')}
                      name="avatar"
                      multiple
                      onChange = {this.handleFileChange}
                      />
                  </div>
                  <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                          Create Quest
                      </button>
                  </div>
              </form>

            </div>
        );
    }
}


// CreateQuest.propTypes = {
//     createQuest: PropTypes.func.isRequired,
//     errors: PropTypes.object.isRequired
// }

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export  default connect(mapStateToProps, { createQuest })(CreateQuest)
//export default connect(mapStateToProps,{ createQuest })(withRouter(CreateQuest))
