import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AccessControl from "../pages/AccessControl";
import ImportEmployee from "../pages/ImportEmployee";
import Home from "../pages/Home";
import Login from "../pages/Login";


export function Router(){
    return(
        <AuthProvider>
          <Routes>
          <Route index element={<Login />} />
          <Route element={<ProtectedRoute />}>
                <Route path = "/" element = {<MainLayout/>}>
              
                <Route path="inicio" element={<Home />} />
                <Route path="acesso" element={<AccessControl/>}/>
                <Route path="importar-funcionario" element={<ImportEmployee/>}/>
                </Route>
                </Route>
                </Routes>
    </AuthProvider>
        
    )
}


