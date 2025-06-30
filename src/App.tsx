import React from 'react'
import Home from './pages/landing';
import Navbar from './components/navbar';

const App: React.FC = () => {
  return (
    <div className="relative">
      <Navbar />
      <main className="relative">
        <Home />
      </main>
    </div>
  );
};


export default App;
