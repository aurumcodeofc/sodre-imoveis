import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header"
// import LeftMenu from "../components/LeftMenu/LeftMenu";

const MainLayout: React.FC = () =>{
    return(
        <>
               <Header />
            <main style={{ marginTop: "109px" }}>
           
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout;