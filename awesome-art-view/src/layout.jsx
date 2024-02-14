import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/home";
import Gallery from "./views/gallery";

import injectContext from "./store/appContext";

const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
};

export default injectContext(Layout);
