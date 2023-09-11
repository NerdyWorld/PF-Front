import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Checkout from "./views/Checkout/Checkout";
import About from "./views/About/About";
import Layout from "./components/Layout";
import Collection from "./views/Brands/Collections/Collection";
import SeeAll from "./views/Brands/SeeAll/seeAll";
import Store from "./views/Store/Store";
import Detail from "./views/Detail/Detail";
import SignUp from "./views/SignUp/SignUp";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="collection/:name" element={<Collection />} />
          <Route path="seeAll/:collection" element={<SeeAll />} />
          <Route path="store" element={<Store />} />
          <Route path="detail/:id" element={<Detail />} />
        </Route>
        <Route index element={<Landing />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
