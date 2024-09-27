import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/home/index.jsx";
import Global from "./global.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Global />
    <Home />
  </StrictMode>
);
