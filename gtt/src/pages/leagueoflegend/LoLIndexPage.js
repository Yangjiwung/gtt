import SidebarLayout from "../../layouts/SidebarLayout";
import {Outlet} from "react-router-dom";

const LOLIndexPage=()=>{
    return (
        <SidebarLayout>
            <div>
                <Outlet />
            </div>
        </SidebarLayout>
    )
}

export default LOLIndexPage