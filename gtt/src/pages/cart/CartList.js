import React, { useEffect } from "react";
import CartListComponent from "../../components/cart/CartListComponent";
import { useRecoilState } from 'recoil';
import { cartDataState } from "../../atoms/cartDataState";
import { useLocation } from "react-router-dom";

const CartList = () => {
    const location = useLocation();
    const { data, matchData, totalPrice, stadium } = location.state || {};
    const [cartData, setCartData] = useRecoilState(cartDataState);

    // 페이지가 로드될 때 localStorage에서 데이터를 불러옴
    useEffect(() => {
        const storedCartData = JSON.parse(localStorage.getItem("cartData"));
        if (storedCartData) {
            setCartData(storedCartData);
        }
    }, [setCartData]);

    // 데이터를 Recoil 상태에 추가하는 useEffect
    useEffect(() => {
        if (data && matchData && totalPrice && stadium) {
            const updatedCartData = [
                ...cartData,
                {
                    matchData,
                    data,
                    totalPrice,
                    stadium
                }
            ];
            setCartData(updatedCartData);

            localStorage.setItem("cartData", JSON.stringify(updatedCartData));
        }
    }, [data, matchData, totalPrice, stadium]); // cartData, setCartData를 의존성 배열에서 제외

    console.log(cartData)
    return (
        <div className="p-4 w-full bg-white">
            <CartListComponent cartData={cartData} setCartData={setCartData} />
        </div>
    );
}

export default CartList;
