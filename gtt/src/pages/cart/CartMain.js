import SidebarLayout from "../../layouts/SidebarLayout";
import {Outlet} from "react-router-dom";

const CartMain = () => {

    return(
        <SidebarLayout>
            <div>
                <Outlet />
            </div>
        </SidebarLayout>
    )
}
export default CartMain