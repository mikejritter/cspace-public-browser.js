import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import config from '../config';
import RootPage from './pages/RootPage';

export default function App() {
  const basename = config.get('basename');

  return (
    <Router basename={basename}>
      <Routes>
        {/* <Route path="/" render={() => <Redirect to="/search" />} /> */}
        <Route path="*" element={<RootPage />} />
      </Routes>
    </Router>
  );
}
