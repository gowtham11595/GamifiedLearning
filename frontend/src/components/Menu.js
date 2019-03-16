import React, {PropTypes} from 'react';
import styles from '../App.css';
import { Button, Navbar,Nav,Form,FormControl } from 'react-bootstrap'

const Menu = () => {
  return (
    <div id="parent">
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Nav className="mr-auto">
        <Nav.Link href="/quests">Quests</Nav.Link>
        <Nav.Link href="/teams">Teams</Nav.Link>
        <Nav.Link href="/presentations">Presentation & Feedback</Nav.Link>
        <Nav.Link href="/badges">Badges</Nav.Link>
        <Nav.Link href="/points">Points</Nav.Link>
        </Nav>
    </Navbar>
    </div>
  )
}

export default Menu;
