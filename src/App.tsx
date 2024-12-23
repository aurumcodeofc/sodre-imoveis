import React from "react";
import {Router} from "./routes/Router";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () =>{
    return(
        <BrowserRouter>
        <Router/>
        </BrowserRouter>
    )
}

export default App;