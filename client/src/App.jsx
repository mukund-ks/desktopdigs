import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Nav from './components/Navbar';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import Search from './pages/Search';

const App = () => {
  return (
    <React.Fragment>
      <div className='flex flex-col grow h-screen'>
        <Nav />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/gallery' element={<Gallery />} />
          <Route exact path='/search' element={<Search />} />
          <Route exact path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </React.Fragment>
  )
};

export default App;
