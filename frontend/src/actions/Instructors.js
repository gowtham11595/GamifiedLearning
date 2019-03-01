import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';


export const getCourseUsers = (user, history) => dispatch => {
    axios.get('/api/getUsersOfCourse/cs1', user)
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

export const createQuest = (quest) => dispatch => {
  console.log("quest=====>"+quest);
  var bodyFormData = new FormData();
  bodyFormData.set('title', quest.title);
  bodyFormData.set('description', quest.description);
  bodyFormData.set('file', quest.files);

    //axios.post('/api/instructors/createQuest', quest)
    // axios.post({
    //   method: 'post',
    //   url: '/api/instructors/createQuest',
    //   data: bodyFormData,
    //   config: { headers: {'Content-Type': 'multipart/form-data' }}
    //   }).then(res => {
    //             console.log(res);
    //         })
    //         .catch(err => {
    //             dispatch({
    //                 type: GET_ERRORS,
    //                 payload: err.response.data
    //             });
    //         });

        axios.post('/api/instructors/createQuest', bodyFormData)
          .then((result) => {
            // access results...
            console.log("My Response");
            alert("Quest created");
             window.location.reload();
          });

}
