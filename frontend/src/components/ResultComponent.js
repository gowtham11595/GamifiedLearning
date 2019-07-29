import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Menu from './Menu';
import axios from "axios";

export default function ResultComponent(props){
      return (
          <div class="col-md-1">
            <div><label>Team Name:</label>{props.teamName}</div>
            <div><label>Team Details:</label>{props.teamDetails}</div>
            <div><label>Files:</label><button>{props.file}</button></div>
            <div><label>Accuracy:</label>{props.accuracy}</div>
            <div><label>Perfection:</label>{props.perfection}</div>
            <div><label>Creativity:</label>{props.creativity}</div>
            <div><label>Percision:</label>{props.percision}</div>
            <div><label>Team Comments:</label>{props.comments}</div>
            <div><label>Peer Feedback:</label>{props.peerFeedback}</div>
            <div><label>Instructor Feedback:</label>{props.instructorFeedback}</div>
          </div>
      );
}
