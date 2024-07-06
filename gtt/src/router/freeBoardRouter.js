import {Suspense, lazy} from "react";
import {Navigate} from "react-router-dom";
import Spin from "../test/pages/Spin";

const Loading = Spin;
const FreeBoardList = lazy(()=>import("../pages/freeBoard/ListPage.js"))
const ReadFreeBoard = lazy(()=>import("../pages/freeBoard/ReadPage"))
const WriteFreeBoard = lazy(()=>import("../pages/freeBoard/WritePage"))
const ModifyFreeBoard = lazy(()=>import("../pages/freeBoard/ModifyPage"))

const freeBoardRouter = ()=>{
    return[
        {
            path:"list",
            element:<Suspense fallback={Loading}><FreeBoardList /></Suspense>
        },
        {
            path:"",
            element: <Navigate replace to="list" />
        },
        {
            path: "read/:fno",
            element: <Suspense fallback={Loading}><ReadFreeBoard /></Suspense>
        },
        {
            path:"write/",
            element: <Suspense fallback={Loading}><WriteFreeBoard /></Suspense>,
        },
        {
            path: "modify/:fno",
            element: <Suspense fallback={Loading}><ModifyFreeBoard/></Suspense>
        }
    ]
}

export default freeBoardRouter;
