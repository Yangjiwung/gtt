
import {Outlet, useNavigate} from "react-router-dom";
import SidebarLayout from "../../layouts/SidebarLayout";
import {useCallback} from "react";

const NoticeIndexPage = () =>{

    const navigate = useNavigate() // 동적 페이지 이동에 사용

    //이동할 페이지 경로명
    const handleClickList = useCallback(() => {
        navigate({pathname:'list'})
    })
    const handleClickAdd = useCallback(()=>{
        navigate({pathname:'add'})
    })

    return (
        <SidebarLayout>
            <div>
                <Outlet />
            </div>
        </SidebarLayout>
    )
}
export default NoticeIndexPage;

