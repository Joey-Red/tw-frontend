import React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
        {/* <FrontRouter /> */}
        {/* <BrowserRouter>
            <App />
        </BrowserRouter> */}
    </React.StrictMode>
);
