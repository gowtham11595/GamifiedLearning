import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            phone:'',
            class:'',
            university:'',
            //avatar:'',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
      console.log(e.target.name);
      if(e.target.name === 'avatar'){
        // const fileReader = new FileReader();
        // fileReader.onload = fileLoadedEvent => {
        //   const base64Image = fileLoadedEvent.target.result;
        // };
        // fileReader.readAsDataURL(imagepath);
        //
        //
        var that = this;
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        //let that = this;
      //  reader.onload = () => this.setState({ [e.target.name]: reader.result }).bind(this);
        var eventName = e.target.name;
        reader.onload = function() {

          console.log(reader.result);
          this.setState({["Avatar"]:reader.result});
          //this.setState({ ["avatar"]: reader.result });
        }.bind(this);

        // reader.onload = function () {
        //     //cb(reader.result)
        //     console.log(reader.result);
        //     that.setImage(that,reader.result);
        // };

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
        // console.log(e.target.files[0]);
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            phone: this.state.phone,
            class: this.state.class,
            university: this.state.university,
            avatar: this.state.Avatar//e.target.files[0]//this.state.avatar
        }
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Registration</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
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
                    <input
                    type="Number"
                    placeholder="Phone"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.phone
                    })}
                    name="phone"
                    onChange={ this.handleInputChange }
                    value={ this.state.phone }
                    pattern=".{10,10}"
                    required title="10 Numbers required"
                    />
                  {errors.phone && (<div className="invalid-feedback">{errors.phone}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="University"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.university
                    })}
                    name="university"
                    onChange={ this.handleInputChange }
                    value={ this.state.university }
                    />
                  {errors.university && (<div className="invalid-feedback">{errors.university}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Class"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.class
                    })}
                    name="class"
                    onChange={ this.handleInputChange }
                    value={ this.state.class }
                    />
                  {errors.class && (<div className="invalid-feedback">{errors.class}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password_confirm
                    })}
                    name="password_confirm"
                    onChange={ this.handleInputChange }
                    value={ this.state.password_confirm }
                    />
                    {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                </div>
                <div className="form-group">
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
                        Register User
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))
