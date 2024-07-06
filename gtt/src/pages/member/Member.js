import AdminPageLayout from "../../layouts/AdminPageLayout";
import MemberList from "./MemberList";
import React from "react";

const Member = () => {

    return (
        <AdminPageLayout>
            <MemberList></MemberList>
        </AdminPageLayout>
    );
 }

 export default Member;
