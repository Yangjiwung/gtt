import React, {useState} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Typography} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import {pay} from "../../api/cartApi";
import {useRecoilState} from "recoil";
import {userState} from "../../atoms/userState";

const TABLE_HEAD = ["", "상품명", "경기일", "장소", "수량", "합계금액", ""];


const CartListComponent = ({ cartData, setCartData }) => {

    const totalPrices = cartData.reduce((total, item) => total + item.totalPrice, 0)
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const navigate = useNavigate()
    const [userInfo,setUserInfo] = useRecoilState(userState)

    const handleRemoveItem = (indexToRemove) => {
        // 선택한 인덱스를 제외한 새로운 배열 생성
        const newCartData = cartData.filter((_, index) => index !== indexToRemove);
        // 새로운 배열로 장바구니 데이터 업데이트
        setCartData(newCartData);
        // 로컬 스토리지에서도 해당 데이터를 업데이트
        localStorage.setItem("cartData", JSON.stringify(newCartData));
    }

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            const allIndexes = cartData.map((_, index) => index);
            setSelectedItems(allIndexes);
        } else {
            setSelectedItems([]);
        }
    };

    const handleCheckboxChange = (index) => {
        if (selectedItems.includes(index)) {
            // 이미 선택된 항목일 경우 선택 취소
            setSelectedItems(selectedItems.filter((item) => item !== index));
        } else {
            // 선택되지 않은 항목일 경우 선택
            setSelectedItems([...selectedItems, index]);
        }
        //console.log(selectedItems)
    };


    const handleRemoveSelectedItems = () => {
        if (selectedItems.length === 0) {
            alert("삭제할 항목을 선택하세요.");
            return;
        }

        const newCartData = cartData.filter((_, index) => !selectedItems.includes(index));
        setCartData(newCartData);
        localStorage.setItem("cartData", JSON.stringify(newCartData));
        setSelectedItems([]);
    };
    const isSameCartItem = (item1, item2) => {
        return item1.data === item2.data && item1.totalPrice === item2.totalPrice;
    };
    const handlePayment = async () => {
        if (selectedItems.length === 0) {
            alert("결제할 상품을 선택하세요.");
            return;
        }

        try {
            const selectedProducts = selectedItems.map(index => {
                const cart = cartData[index];
                return {
                    ...cart,
                    userNo: userInfo[0].num,
                    phone: userInfo[0].phone
                };
            });

            console.log("선택된 상품들:", selectedProducts, userInfo);

            // 결제 결과를 저장할 배열
            // 결제 결과를 저장할 배열
            // 결제가 완료된 항목과 동일한 장바구니 항목을 찾음
            const completedPaymentProducts = [];

            for (const cart of selectedProducts) {
                try {
                    const response = await pay(cart);
                    console.log(response);
                    if (response.result === "SUCCESS") {
                        completedPaymentProducts.push(cart); // 결제가 성공한 항목을 저장
                    } else {
                        console.error("결제 실패:", response.message);
                        alert("일부 결제에 실패했습니다. 다시 시도해주세요.");
                    }
                } catch (error) {
                    console.error("결제 실패:", error);
                    alert("일부 결제에 실패했습니다. 다시 시도해주세요.");
                    return;
                }
            }

            // 모든 결제가 성공한 경우
            alert("결제 완료");

            // 성공적으로 결제된 상품을 장바구니에서 제거
            const newCartData = cartData.filter(item => !completedPaymentProducts.some(completedItem => isSameCartItem(completedItem, item)));
            setCartData(newCartData);
            localStorage.setItem("cartData", JSON.stringify(newCartData));
            setSelectedItems([]);
            navigate("/");
        } catch (error) {
            console.error("결제 중 오류 발생:", error);
            alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };


    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Cart
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            장바구니
                        </Typography>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="flex justify-center px-0">
                <table className="w-full min-w-max table-auto text-center">
                    <thead>
                    <tr>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <Checkbox
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                        </th>
                        {TABLE_HEAD.slice(1).map((head, index) => (
                            <th
                                key={index}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>

                    <tbody>
                    {cartData.length > 0 ? (
                        cartData.map((item, index) => (
                            <tr className="p-4 border-b border-blue-gray-50" key={index} >
                                <td>
                                    <div className="p-4">
                                        <Checkbox
                                            checked={selectedItems.includes(index)}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3 justify-center mt-3">
                                        <Typography
                                            variant="h6"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item.matchData.league}
                                        </Typography>
                                    </div>
                                    <div className="flex items-center gap-3 justify-center">
                                        <Typography
                                            variant="h5"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            <strong>{item.matchData.serverTeam1.teamName}</strong>
                                            <Typography color="blue">vs</Typography>
                                            <strong>{item.matchData.serverTeam2.teamName}</strong>
                                        </Typography>
                                    </div>
                                    <div className="flex items-center gap-3 justify-center p-1 mb-3">
                                        <small>{item.data.join("   ,   ")}</small>
                                    </div>
                                </td>
                                <td >
                                    <div className="flex items-center gap-3 justify-center p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item.matchData.matchDate.slice(0, -3)}
                                        </Typography>
                                    </div>
                                </td>
                                <td >
                                    <div className="flex items-center gap-3 justify-center p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item.stadium}
                                        </Typography>
                                    </div>
                                </td>
                                <td >
                                    <div className="flex items-center gap-3 justify-center p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            1
                                        </Typography>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3 justify-center p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item.totalPrice}원
                                        </Typography>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3 justify-center p-4">
                                        <Button onClick={() => handleRemoveItem(index)}>삭제</Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="p-6 text-center" colSpan="7">
                                장바구니가 비었습니다.
                            </td>
                        </tr>
                    )
                    }
                    </tbody>

                    <tfoot className="p-5">
                    <tr className="border-y border-blue-gray-100 bg-blue-gray-50/50 mx-auto">
                        <th className="text-center p-5" colSpan="7">결제하실 금액 : {totalPrices}</th>
                    </tr>
                    </tfoot>
                </table>
            </CardBody>
            <CardFooter>
                <div className={`flex justify-center`}>
                    <Button className={`mr-5`} onClick={handlePayment}>결제</Button>
                    <Button className={`mr-5`} onClick={handleRemoveSelectedItems}>선택 삭제</Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default CartListComponent;
