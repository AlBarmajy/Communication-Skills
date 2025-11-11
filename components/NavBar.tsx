import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import type { View } from '../types';

interface NavBarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const AppNavBar: React.FC<NavBarProps> = ({ activeView, setActiveView }) => {
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home" onClick={() => setActiveView('lectures')}>
          Student Revision Hub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              href="#lectures" 
              active={activeView === 'lectures'}
              onClick={() => setActiveView('lectures')}
            >
              Lectures
            </Nav.Link>
            <Nav.Link 
              href="#quiz" 
              active={activeView === 'quiz'}
              onClick={() => setActiveView('quiz')}
            >
              Practice Questions
            </Nav.Link>
            <Nav.Link 
              href="#chatbot" 
              active={activeView === 'chatbot'}
              onClick={() => setActiveView('chatbot')}
            >
              Communication Skills Instructor
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavBar;