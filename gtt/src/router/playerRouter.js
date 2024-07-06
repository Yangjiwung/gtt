import Spin from "../test/pages/Spin";
import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";


const Loading = Spin
const PlayerList = lazy(() => import("../pages/player/PlayerListPage"))
const PlayerRead = lazy(() => import("../pages/player/PlayerReadPage"))
const PlayerAdd = lazy(() => import("../pages/player/PlayerAddPage"))
const PlayerModify = lazy(() => import("../pages/player/PlayerModifyPage"))

const playerRouter = () => {
    return [
        {
            path:"list",
            element: <Suspense fallback={Loading}><PlayerList/></Suspense>
        },{
            path:"",
            element: <Navigate replace to = "/player/list"/>
        },{
            path: "read/:pno",
            element: <Suspense fallback={Loading}><PlayerRead/></Suspense>
        },{
            path: "add",
            element: <Suspense fallback={Loading}><PlayerAdd/></Suspense>
        },{
            path: "modify/:pno",
            element: <Suspense fallback={Loading}><PlayerModify/></Suspense>
        }
    ]
}

export default playerRouter
