import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

const MainLayout: React.FC = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/"; 

    return (
        <>
            {!isLoginPage && <Header />}
            {!isLoginPage && <Sidebar />}
            
            <main style={{ marginTop: isLoginPage ? "0px" : "75px", marginLeft: isLoginPage ? "0px" : "95px" }}>
                <Outlet />
            </main>
            {/* <Footer/> */}
        </>
    );
};

export default MainLayout;
