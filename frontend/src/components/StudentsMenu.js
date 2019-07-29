import React, {PropTypes} from 'react';
import styles from '../App.css';
import { Button, Navbar,Nav,Form,FormControl } from 'react-bootstrap'

const StudentsMenu = () => {
  return (
    <div id="parent">
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/shome">Home</Navbar.Brand>
        <Nav className="mr-auto">
        <Nav.Link href="/squests">My Quests</Nav.Link>
        <Nav.Link href="/steams">My Team</Nav.Link>
        <Nav.Link href="/spresentations">Presentation & Feedback</Nav.Link>
        <Nav.Link href="/sprofile">My Profile</Nav.Link>
        </Nav>
    </Navbar>
    </div>
  )
}

export default StudentsMenu;
