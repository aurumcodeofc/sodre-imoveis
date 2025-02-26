import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

const MainLayout: React.FC = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/";
    const isFirstAccess = location.pathname === "/primeiro-acesso";  // Corrigido para incluir a barra inicial

    return (
        <>
            {/* Verifica se não é a página de login nem o primeiro acesso */}
            {!isLoginPage && !isFirstAccess && <Header />}
            {!isLoginPage && !isFirstAccess && <Sidebar />}

            <main style={{ marginTop: isLoginPage || isFirstAccess ? "0px" : "75px", marginLeft: isLoginPage || isFirstAccess ? "0px" : "95px" }}>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </>
    );
};

export default MainLayout;
