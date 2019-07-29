import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const createCourseRegistration = (registerCourse, history) => dispatch => {
    axios.post('/api/students/registerCourse',registerCourse)
            .then(res => {
            alert("Course Registered");
          })
            .catch(err => {
              console.log(err);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}
