import { Suspense, lazy } from "react";
import Spin from "../test/pages/Spin";

const Loading = Spin;
const LoginAuth = lazy(() =>import("../pages/loginAuth/Login.js"));  // 로그인 페이지
const SignIn = lazy(() =>import("../pages/loginAuth/SignIn.js"));    // 회원가입 페이지
const Member = lazy(() => import("../pages/member/Member"));

const authRouter = ()=> {
    return[
        {
            path: "Login",
            element: <Suspense fallback={Loading}><LoginAuth/></Suspense>
        },
        {
            path: "SignIn",
            element: <Suspense fallback={Loading}><SignIn/></Suspense>
        },
        {
            path: "Member",
            element: <Suspense fallback={Loading}><Member/></Suspense>
        },
    ]
}

export default authRouter;
