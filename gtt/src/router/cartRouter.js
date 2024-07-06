import {Suspense} from "react";
import Spin from "../test/pages/Spin";
import CartList from "../pages/cart/CartList"
import PaymentPage from "../pages/cart/PaymentPage";

const Loading = Spin

const cartRouter = () =>
{
    return[
        {
            path: "list",
            element: <Suspense fallback={Loading}><CartList/></Suspense>
        },
        {
            path: "payment",
            element: <Suspense fallback={Loading}><PaymentPage/></Suspense>
        }
    ]
}
export default cartRouter