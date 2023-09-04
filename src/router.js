import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Checkout from "./views/Checkout/Checkout";
import About from "./views/About/About";
import Layout from "./components/Layout";
import Fendi from "./views/Fendi/Fendi.jsx";
import SneakersFendi from "./views/Fendi/Sneakers/Sneakers.jsx";
import BagsFendi from "./views/Fendi/Bags/Bags.jsx";
import HeelsFendi from "./views/Fendi/Heels/Heels.jsx";
import SunglassesFendi from "./views/Fendi/Sunglasses/Sunglasses.jsx";
import AccesoriesFendi from "./views/Fendi/Accesories/Accesories.jsx";
import Dolce from "../src/views/Dolce/Dolce";
import HeelsDolce from "./views/Dolce/Heels/Heels.jsx";
import BagsDolce from "./views/Dolce/Bags/Bags.jsx";
import SneakersDolce from "./views/Dolce/Sneakers/Sneakers.jsx";
import SunglassesDolce from "./views/Dolce/Sunglasses/Sunglasses.jsx";
import AccesoriesDolce from "./views/Dolce/Accesories/Accesories.jsx";
import LV from "../src/views/LV/LV";
import HeelsLV from "./views/LV/Heels/Heels.jsx";
import BagsLV from "./views/LV/Bags/Bags.jsx";
import SneakersLV from "./views/LV/Sneakers/Sneakers.jsx";
import SunglassesLV from "./views/LV/Sunglasses/Sunglasses.jsx";
import AccesoriesLV from "./views/LV/Accesories/Accesories.jsx";
import Gucci from "./views/Gucci/Gucci";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="gucci" element={<Gucci />} />
          <Route path="fendi" element={<Fendi />} />
          <Route path="fendi/sneakers" element={<SneakersFendi />} />
          <Route path="fendi/bags" element={<BagsFendi />} />
          <Route path="fendi/heels" element={<HeelsFendi />} />
          <Route path="fendi/sunglasses" element={<SunglassesFendi />} />
          <Route path="fendi/accesories" element={<AccesoriesFendi />} />
          <Route path="dolce" element={<Dolce />} />
          <Route path="dolce/sneakers" element={<SneakersDolce />} />
          <Route path="dolce/bags" element={<BagsDolce />} />
          <Route path="dolce/heels" element={<HeelsDolce />} />
          <Route path="dolce/sunglasses" element={<SunglassesDolce />} />
          <Route path="dolce/accesories" element={<AccesoriesDolce />} />
          <Route path="louisvuitton/sneakers" element={<SneakersLV />} />
          <Route path="louisvuitton/bags" element={<BagsLV />} />
          <Route path="louisvuitton/heels" element={<HeelsLV />} />
          <Route path="louisvuitton/sunglasses" element={<SunglassesLV />} />
          <Route path="louisvuitton/accesories" element={<AccesoriesLV />} />
          <Route path="louisvuitton" element={<LV />} />
        </Route>
        <Route index element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
