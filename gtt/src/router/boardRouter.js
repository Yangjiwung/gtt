import {Suspense, lazy} from "react";
import {Navigate} from "react-router-dom";
import Spin from "../test/pages/Spin";

const Loading = Spin;
const BoardList = lazy(()=>import("../pages/board/ListPage.js"))
const ReadBoard = lazy(()=>import("../pages/board/ReadPage"))
const WriteBoard = lazy(()=>import("../pages/board/WritePage"))
const ModifyBoard = lazy(()=>import("../pages/board/ModifyPage"))

const boardRouter = ()=>{
    return[
        {
            path:"list",
            element:<Suspense fallback={Loading}><BoardList /></Suspense>
        },
        {
            path:"",
            element: <Navigate replace to="list" />
        },
        {
            path: "read/:bno",
            element: <Suspense fallback={Loading}><ReadBoard /></Suspense>
        },
        {
            path:"write/",
            element: <Suspense fallback={Loading}><WriteBoard /></Suspense>,
        },
        {
            path: "modify/:bno",
            element: <Suspense fallback={Loading}><ModifyBoard/></Suspense>
        }
    ]
}

export default boardRouter;
