import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './views/Landing/Landing';
import Checkout from './views/Checkout/Checkout';

const Router = () => {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Landing/>}/>
      <Route exact path="/checkout" element={<Checkout/>}/>
    </Routes>
    </BrowserRouter>
   );
}
 
export default Router;