import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import BlogPage from './components/BlogPage';
import './styles/global.css';

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <BlogPage />
      </div>
    </HelmetProvider>
  );
}

export default App;
