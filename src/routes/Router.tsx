import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AccessControl from "../pages/AccessControl";
import ImportEmployee from "../pages/ImportEmployee";
import Home from "../pages/Home";


export function Router(){
    return(
            <Routes>
                <Route path = "/" element = {<MainLayout/>}>
                <Route index element={<Home />} />
                <Route path="inicio" element={<Home />} />
                <Route path="acesso" element={<AccessControl/>}/>
                <Route path="importar-funcionario" element={<ImportEmployee/>}/>
                </Route>
            </Routes>
        
    )
}


