import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './views/Landing/Landing';

const Router = () => {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Landing/>}/>
    </Routes>
    </BrowserRouter>
   );
}
 
export default Router;