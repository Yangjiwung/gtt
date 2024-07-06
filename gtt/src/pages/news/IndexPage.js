import {useCallback} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import SidebarLayout from "../../layouts/SidebarLayout";

const IndexPage=()=>{
    return (
        <SidebarLayout>
            <div>
                <Outlet />
            </div>
        </SidebarLayout>
    )
}

export default IndexPage;