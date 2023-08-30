import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Checkout from './views/Checkout/Checkout';
import About from './views/About/About';
import Layout from './components/Layout';

const Router = () => {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>      
      <Route path='home' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='checkout' element={<Checkout />} />    
      </Route>
      <Route index element={<Landing />} />
    </Routes>
    </BrowserRouter>
   );
}
 
export default Router;
