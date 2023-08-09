import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AllTrains from './components/AllTrains';
import SingleTrain from './components/SingleTrain';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">All Trains</Link>
          </li>
          <li>
            <Link to="/train/:trainNumber">Single Train</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<AllTrains />} />
        <Route path="/train/:trainNumber" element={<SingleTrain />} />
      </Routes>
    </Router>
  );
}

export default App;
