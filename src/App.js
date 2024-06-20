import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import("../src/pages/Home"));

function App() {
  return (
    <Router>
      <div>
        <Suspense>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
