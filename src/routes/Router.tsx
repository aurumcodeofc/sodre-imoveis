import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AccessControl from "../pages/AccessControl";
import ImportEmployee from "../pages/ImportEmployee";


export function Router(){
    return(
            <Routes>
                <Route path = "/" element = {<MainLayout/>}>
                <Route path="acesso" element={<AccessControl/>}/>
                <Route path="importar-funcionario" element={<ImportEmployee/>}/>
                </Route>
            </Routes>
        
    )
}


