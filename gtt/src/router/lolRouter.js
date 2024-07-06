import {Suspense, lazy} from "react";
import {Navigate} from "react-router-dom";
import Spin from "../test/pages/Spin";

const Loading = Spin;
const LoLList = lazy(()=>import("../pages/leagueoflegend/LoLListPage"))
const LoLItemList = lazy(()=>import("../pages/leagueoflegend/LoLItemPage"))

const lolRouter = ()=>{
    return[
        {
            path:"list",
            element:<Suspense fallback={Loading}><LoLList /></Suspense>
        },
        {
            path:"itemlist",
            element:<Suspense fallback={Loading}><LoLItemList /></Suspense>
        },
    ]
}

export default lolRouter;
