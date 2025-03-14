import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import HomePage from './pages/HomePage';

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  return (
      <>
          <Router>
              <div>
                  <Routes>
                      <Route path="/" element={<HomePage />} />
                  </Routes>
              </div>
          </Router>
      </>
  )
}

export default App
