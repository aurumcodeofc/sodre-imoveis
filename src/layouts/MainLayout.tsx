import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar/Sidebar";

// import LeftMenu from "../components/LeftMenu/LeftMenu";

const MainLayout: React.FC = () =>{
    return(
        <>
            
               <Header />
               <Sidebar/>
            <main style={{ marginTop: "75px", marginLeft:"95px" }}>
           
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout;