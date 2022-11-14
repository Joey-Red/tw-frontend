import React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <HashRouter>
            <App basename="https://joey-red.github.io/tw-frontend/" />
        </HashRouter>
        {/* <BrowserRouter>
            <App />
        </BrowserRouter> */}
    </React.StrictMode>
);
