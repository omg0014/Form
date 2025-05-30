import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { initThemeToggle } from "./theme.js";

initThemeToggle();

const root = document.getElementById("root");
createRoot(root).render(<App />);
