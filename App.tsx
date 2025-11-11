import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import AppNavBar from './components/NavBar';
import Lectures from './components/Lectures';
import Quiz from './components/Quiz';
import Chatbot from './components/Chatbot';
import type { View } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('lectures');

  const renderContent = () => {
    switch (activeView) {
      case 'lectures':
        return <Lectures />;
      case 'quiz':
        return <Quiz />;
      case 'chatbot':
        return <Chatbot />;
      default:
        return <Lectures />;
    }
  };

  return (
    <>
      <AppNavBar activeView={activeView} setActiveView={setActiveView} />
      <main>
        <Container className="py-5">
          {renderContent()}
        </Container>
      </main>
      <footer className="text-center p-4 text-secondary">
        &copy; {new Date().getFullYear()} Student Revision Hub. All rights reserved.
      </footer>
    </>
  );
};

export default App;