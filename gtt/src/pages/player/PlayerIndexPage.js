import SidebarLayout from "../../layouts/SidebarLayout";
import {Outlet} from "react-router-dom";

const PlayerIndexPage = () => {
    return (
        <SidebarLayout>
            <div>
                <Outlet />
            </div>
        </SidebarLayout>
    )
}

export default PlayerIndexPage;