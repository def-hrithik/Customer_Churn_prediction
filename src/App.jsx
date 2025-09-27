import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import Insights from './pages/Insights';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/insights" element={<Insights />} />
            </Routes>
          </main>
          <Chatbot />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
