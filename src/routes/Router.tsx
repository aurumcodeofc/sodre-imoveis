import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AccessControl from "../pages/AccessControl";
import ImportEmployee from "../pages/ImportEmployee";
import Home from "../pages/Home";
import Login from "../pages/Login";
import FirstAccess from "../pages/FirstAccess";
import Profile from "../pages/Profile"
import ForgotPassword from "../pages/ForgotPassword";


export function Router(){
    return(
        <AuthProvider>
          <Routes>
          <Route index element={<Login />} />
          
          <Route path = "esqueceu-senha" element={<ForgotPassword/>}/>
          <Route element={<ProtectedRoute />}>
                <Route path = "/" element = {<MainLayout/>}>
                <Route path = "primeiro-acesso" element={<FirstAccess/>}/>
                <Route path="inicio" element={<Home />} />
                <Route path="acesso" element={<AccessControl/>}/>
                <Route path="importar-funcionario" element={<ImportEmployee/>}/>
                <Route path="meu-perfil" element={<Profile/>}/>
                </Route>
                </Route>
                </Routes>
    </AuthProvider>
        
    )
}


