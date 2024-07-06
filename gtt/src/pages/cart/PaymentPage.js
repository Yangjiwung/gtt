import React from "react";
import PaymentComponent from "../../components/cart/PaymentComponent";
import { useLocation } from "react-router-dom"

const PaymentPage = () => {
    const location = useLocation();
    const selectedProducts = location.state ? location.state.selectedProducts : null;

    return(
        <div>
            <PaymentComponent selectedProducts={selectedProducts}/>
        </div>
    )
}
export default PaymentPage;
