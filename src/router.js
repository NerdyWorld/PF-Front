import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Checkout from "./views/Checkout/Checkout";
import About from "./views/About/About";
import Layout from "./components/Layout";
import Collection from "./views/Brands/Collections/Collection";
import SeeAll from "./views/Brands/SeeAll/SeeAll";
import OurStore from "./views/Store/Store";
import Detail from "./views/Detail/Detail";
import SignUp from "./views/SignUp/SignUp";
import Account from "./views/Account/Account";
import Profile from "./views/Account/Profile/Profile";
import Orders from "./views/Account/Orders/Orders";
import Wishlist from "./views/Account/Wishlist/Wishlist";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="collection/:name" element={<Collection />} />
          <Route exact path="products/:id" element={<Detail />} />
        </Route>

        <Route path="seeAll/:collection" element={<SeeAll />} />
        <Route exact path="/seeAll/:collection/:category" element={<SeeAll/>}/>
        <Route exact path="/ourStore" element={<OurStore/>}/>
        <Route exact path="/account" element={<Account/>}/>
        <Route exact path="/account/profile" element={<Profile/>}/>
        <Route exact path="/account/wishlist" element={<Wishlist/>}/>
        <Route exact path="/account/orders" element={<Orders/>}/>
        <Route index element={<Landing />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
