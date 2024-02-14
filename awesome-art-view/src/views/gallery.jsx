import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import ArtRender from "../component/artRender";

const Gallery = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <h1>Gallery</h1>
      <p>Welcome to the gallery page</p>
      <ArtRender />
      <Link to="/">Go to home</Link>
    </div>
  );
};

export default Gallery;
