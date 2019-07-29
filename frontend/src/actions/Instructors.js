import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import ShowCourses from "../components/ShowCourses";


export const getCourseUsers = (thisPointer) => dispatch => {
  var that=thisPointer;
  axios.get('/api/users/getUsers')
          .then(response => {
              //that.setState({data:response.data});
              console.log(response.data);
              console.log("showing state = "+that.state);
              that.setState({'userData':response.data});
              console.log("after setting state = "+that.state);
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
  bodyFormData.set('courseTitle', quest.courseTitle);
  bodyFormData.set('points', quest.points);
  
  axios.post('/api/instructors/createQuest', bodyFormData)
    .then((result) => {
      // access results...
      console.log("My Response");
        alert("Quest created");
       window.location.reload();
    });
}

export const createCourse = (user, history) => dispatch => {
  console.log("Auth header = "+axios.defaults.headers.common['Authorization']);
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

export const createBadge = (badge, history) => dispatch => {
  var token = (axios.defaults.headers.common['Authorization']).split(" ")[1];
  console.log("Token="+token);
    axios.post('/api/instructors/createBadge',badge)
            .then(res => history.push('/showBadges'))
            .catch(err => {
              console.log(err);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const createTeam = (team, history) => dispatch => {
  var token = (axios.defaults.headers.common['Authorization']).split(" ")[1];
  console.log("Token="+token);
    axios.post('/api/instructors/createTeam',team)
            .then(res => history.push('/showTeams'))
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
