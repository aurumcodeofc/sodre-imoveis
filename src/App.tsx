import React from "react";
import {Router} from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const App: React.FC = () =>{
    return(
        <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Router/>
        </BrowserRouter>
    )
}

export default App;