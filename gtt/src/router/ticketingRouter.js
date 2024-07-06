import {Suspense, lazy} from "react";
import Spin from "../test/pages/Spin";

const Loading = Spin;
const TicketingMain = lazy(()=>import("../pages/ticketing/TicketingMain"));

const newsRouter = ()=>{
    return[
        {
            path:"ticketing",
            element:<Suspense fallback={Loading}><TicketingMain /></Suspense>
        }
    ]
}

export default newsRouter;
