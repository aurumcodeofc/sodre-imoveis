import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";


const MainLayout: React.FC = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/";
    const isFirstAccess = location.pathname === "/primeiro-acesso"; 

    return (
        <>
            {!isLoginPage && !isFirstAccess && <Header />}
            {!isLoginPage && !isFirstAccess && <Sidebar />}

            <main style={{ marginTop: isLoginPage || isFirstAccess ? "0px" : "75px", marginLeft: isLoginPage || isFirstAccess ? "0px" : "95px" }}>
                <Outlet />
            </main>
         
        </>
    );
};

export default MainLayout;
