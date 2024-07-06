import { Suspense, lazy } from "react"
import Spin from "../test/pages/Spin";
import {Navigate} from "react-router-dom";

const Read = lazy(()=>import("../pages/notice/ReadPage"))
const List = lazy(()=>import("../pages/notice/ListPage"))
const Add = lazy(()=>import("../pages/notice/AddPage"))
const Modify = lazy(()=>import("../pages/notice/ModifyPage"))
const Loading = Spin

const noticeRouter =() =>
{
    return[
        {
            path: "list",
            element: <Suspense fallback={Loading}><List/></Suspense>
        },
        {
          path:"",
            element: <Navigate replace to="list"/>
        },
        {
            path: "read/:notiNo",
            element: <Suspense fallback={Loading}><Read/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><Add/></Suspense>
        },
        {
            path: "modify/:notiNo",
            element: <Suspense fallback={Loading}><Modify/></Suspense>
        }
    ]
}
export default noticeRouter;

