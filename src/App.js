import React from 'react';
import './styles.css';

import Navbar from './components/Navbar';
import Header from './components/Header';
import MyRoutes from './routes';
import Footer from './components/Footer';

function App() {
  return (<div className="App">
    <Navbar />
    <Header />
    <MyRoutes />
    <Footer />
  </div>
  )};

export default App;
