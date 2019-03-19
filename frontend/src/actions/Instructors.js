import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import ShowCourses from "../components/ShowCourses";
//import React from 'react';

export const getCourseUsers = (user, history) => dispatch => {
    axios.get('/api/users/getUsersOfCourse/cs1', user)
            .then(response => {
                if (response.data.message) {
                  console.log(
                    `Got ${Object.entries(response.data.message).length} breeds`
                  );
                }
              })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

/*
export const createQuest = (quest, thisa) => dispatch => {
  const data = new FormData();
     data.append('files', quest.files, quest.files.name);
     data.append('title', quest.title);
     data.append('description', quest.description);
     data.append('submissionDate', quest.submissionDate);
     var endpoint="/api/instructors/uploadQuest";
     axios
       .post(endpoint, data, {
         onUploadProgress: ProgressEvent => {
           thisa.setState({
             loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
           })
         },
       })
       .then(res => {
         console.log(res.statusText)
       })
}
*/

export const createQuest = (quest) => dispatch => {
  var bodyFormData = new FormData();
  bodyFormData.set('title', quest.title);
  bodyFormData.set('description', quest.description);
  bodyFormData.set('submissionDate', quest.submissionDate);
  bodyFormData.set('file', quest.files);

  axios.post('/api/instructors/createQuest', bodyFormData)
    .then((result) => {
      // access results...
      console.log("My Response");
        alert("Quest created");
       window.location.reload();
    });
}

export const createCourse = (user, history) => dispatch => {
  var token = (axios.defaults.headers.common['Authorization']).split(" ")[1];
  console.log("Token="+token);
    axios.post('/api/instructors/createCourse',
                user,
                {
                  headers:{
                    "x-access-token":token
                  }
                })
            .then(res => history.push('/showCourses'))
            .catch(err => {
              console.log(err);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const getCourses = () => dispatch => {
    axios.get('/api/instructors/getCourseNames')
            .then(response => {
                if (response.data.message) {
                  console.log(
                    `Got ${Object.entries(response.data.message).length} breeds`
                  );
                  //   var courseData = response.data.message;
                  //   courseData.map(
                  //     course => <ShowCourses key={course._id} courseTitle={course.courseTitle}/>
                  //   );
                  // console.log(JSON.stringify(courseData));
                }
              })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}
