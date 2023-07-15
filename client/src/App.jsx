import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Navbar';
import Home from './pages/Home';
import './App.css';

const App = () => {
  return (
    <React.Fragment>
      <div className='flex flex-col h-screen justify-between'>
        <Nav />
        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </React.Fragment>
  )
};

export default App;
