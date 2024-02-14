import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Layout from "./layout.jsx";

//
const root = createRoot(document.querySelector("#root"));

//render your react application
root.render(<Layout />);
