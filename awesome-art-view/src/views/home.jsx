import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
const Home = () => {
  const { store, actions } = useContext(Context);
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      <Link to="/gallery">Go to gallery</Link>
    </div>
  );
};

export default Home;
