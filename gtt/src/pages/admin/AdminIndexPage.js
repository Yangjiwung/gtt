import AdminPageLayout from "../../layouts/AdminPageLayout";
import {Outlet} from "react-router-dom";

const AdminIndexPage = () => {
    return (
        <AdminPageLayout>
            <div>
                <Outlet />
            </div>
        </AdminPageLayout>
    )
}

export default AdminIndexPage;