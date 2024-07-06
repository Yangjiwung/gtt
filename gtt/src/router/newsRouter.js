import {Suspense, lazy} from "react";
import {Navigate} from "react-router-dom";
import Spin from "../test/pages/Spin";

const Loading = Spin;
const NewsList = lazy(()=>import("../pages/news/ListPage.js"))
const ReadNews = lazy(()=>import("../pages/news/ReadPage"))
const WriteNews = lazy(()=>import("../pages/news/WritePage"))
const ModifyNews = lazy(()=>import("../pages/news/ModifyPage"))

const newsRouter = ()=>{
    return[
        {
            path:"list",
            element:<Suspense fallback={Loading}><NewsList /></Suspense>
        },
        {
            path:"",
            element: <Navigate replace to="list" />
        },
        {
            path: "read/:newsNo",
            element: <Suspense fallback={Loading}><ReadNews /></Suspense>
        },
        {
            path:"write/",
            element: <Suspense fallback={Loading}><WriteNews /></Suspense>,
        },
        {
            path: "modify/:newsNo",
            element: <Suspense fallback={Loading}><ModifyNews/></Suspense>
        }
    ]
}

export default newsRouter;
