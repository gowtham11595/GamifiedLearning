import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Teams from './components/Teams';
import CreateTeam from './components/CreateTeam';
import Quests from './components/Quests';
import CreateQuest from './components/CreateQuest';
import SelectCourseQuest from './components/SelectCourseQuest';
import CreateCourse from './components/CreateCourse';
import ShowCourses from './components/ShowCourses';
import Badges from './components/Badges';
import CreateBadge from './components/CreateBadge';
import ShowBadges from './components/ShowBadges';
import ShowTeams from './components/ShowTeams';
import StudentHome from './components/StudentHome';
import StudentEnrolledCourses from './components/StudentEnrolledCourses';
import StudentRegisterCourse from './components/StudentRegisterCourse';
import StudentQuests from './components/StudentQuests';
import ShowStudentQuest from './components/ShowStudentQuest';
import StudentTeam from './components/StudentTeam';
import TeamDiscussionBoard from './components/TeamDiscussionBoard';
import QuestAward from './components/QuestAward';

import 'bootstrap/dist/css/bootstrap.min.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div>
              <Navbar />
                <Route exact path="/home" component={ Home } />
                <div className="container">
                  <Route exact path="/register" component={ Register } />
                  <Route exact path="/login" component={ Login } />
                  <Route exact path="/teams" component={ Teams } />
                  <Route exact path="/createTeam" component={ CreateTeam } />
                  <Route exact path="/quests" component={ Quests } />
                  <Route exact path="/createQuest" component={ CreateQuest } />
                  <Route exact path="/showQuests" component={ SelectCourseQuest } />
                  <Route exact path="/createCourse" component={ CreateCourse } />
                  <Route exact path="/showCourses" component={ ShowCourses } />
                  <Route exact path="/badges" component={ Badges } />
                  <Route exact path="/createBadge" component={ CreateBadge } />
                  <Route exact path="/showBadges" component={ ShowBadges } />
                  <Route exact path="/showTeams" component={ ShowTeams } />
                  <Route exact path="/shome" component={ StudentHome } />
                  <Route exact path="/enrolledCourses" component={ StudentEnrolledCourses } />
                  <Route exact path="/registerCourse" component={ StudentRegisterCourse } />
                  <Route exact path="/squests" component={ StudentQuests } />
                  <Route exact path="/showStudentQuest" component={ ShowStudentQuest } />
                  <Route exact path="/steams" component={ StudentTeam } />
                  <Route exact path="/sdiscussionBoard" component={ TeamDiscussionBoard } />
                  <Route exact path="/questAward" component={ QuestAward } />
                </div>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
