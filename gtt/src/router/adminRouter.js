// 관리자용 메뉴 라우터 입니다.
import { Suspense, lazy } from "react";
import Spin from "../test/pages/Spin";

const Loading = Spin;
// 관리자 메인 페이지
const AdminMain = lazy(() => import("../pages/admin/AdminMain"));
// 회원관리
const MemberList = lazy(() => import("../pages/member/MemberList"));


const adminRouter = () => {
    return [
        {
            path : "list",
            element : <Suspense fallback={Loading}><MemberList /></Suspense>
        }
    ];
}

export default adminRouter;