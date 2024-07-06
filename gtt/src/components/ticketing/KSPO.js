import React, {useState, useEffect, useCallback} from "react";
import {Button, Card, Typography} from "@material-tailwind/react";
import useCustomMove from "../../hooks/useCustomMove";
import {useNavigate} from "react-router-dom";

const sitList = {
    A1: {states:[7, 7, 8, 8, 8, 8, 8, 9, 9], price:115000},
    A2: {states: [7, 7, 7, 7, 7, 7, 7, 7, 7,],price: 123000},
    A3: {states: [7, 7, 8, 8, 8, 8, 8, 9, 9], price:115000},
    B1: {states:[7, 7, 7, 7, 8, 8, 8, 8, 8, 9 ],price:168000},
    B2: {states:[7, 7, 7, 7, 8, 8, 8, 8, 8, 9 ], price:168000},
    C1: {states:[6, 7, 8, 8, 9, 10, 11, 12], price:115000},
    C2: {states:[5, 6, 7, 7, 8, 9, 9, 10], price:123000},
    C3: {states:[5, 7, 8, 8, 9, 10, 11, 12],price:115000},
};

const KSPO = ({matchData, stadium}) => {
    const [section, setSection] = useState("");
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [resultList, setResultList] = useState([]);
    const [selectedSectionRef, setSelectedSectionRef] = useState(null); // 이전에 선택한 섹션
    const [sectionCheckStates, setSectionCheckStates] = useState({}); // 각 섹션의 체크 상태 저장
    const navigate = useNavigate()
    const [totalPrice, setTotalPrice] = useState(0);



    const handleSelect = (selectedSection) => {
        // 선택한 섹션의 배경색 변경
        const target = document.querySelector(`.${selectedSection}`);
        if (target) {
            target.classList.add("bg-gray-500");
            setSection(selectedSection);

            // 이전에 선택한 섹션의 배경색 제거
            if (selectedSectionRef) {
                selectedSectionRef.classList.remove("bg-gray-500");
            }
            setSelectedSectionRef(target);

            // 선택한 섹션의 체크 상태 초기화
            setSectionCheckStates((prevState) => ({
                ...prevState,
                [selectedSection]: [],
            }));
        }
    };

    const handleCheckboxChange = (e) => {
        const selectedValue = e.target.value;
        const isChecked = e.target.checked;

        // 이미 선택된 좌석 목록에 있는지 확인
        const alreadySelected = selectedSeats.includes(selectedValue);

        if (isChecked) {
            if (selectedSeats.length < 4 || alreadySelected) {
                setSelectedSeats((prevSeats) => [...prevSeats, selectedValue]);
                setResultList((prevList) => [...prevList, selectedValue]);
            } else {
                alert("최대 4개까지 선택 가능합니다.");
                // 선택한 체크박스를 해제
                e.target.checked = false;
            }
        } else {
            // 체크가 해제되었을 때 결과 목록에서 해당 값 제거
            setResultList((prevList) => prevList.filter((item) => item !== selectedValue));
            // 선택한 좌석 목록에서도 해당 값 제거
            setSelectedSeats((prevSeats) => prevSeats.filter((item) => item !== selectedValue));
        }
    };

    const reSetBtn = () => {
        // 모든 체크박스를 찾아서 체크를 해제함
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
            setSelectedSeats([]);
            setResultList([]);
        });
    };

    const addCartBtn = useCallback(() => {
        navigate("/cart/list", {state: {data: resultList, matchData, totalPrice, stadium}});
    }, [resultList, navigate, matchData, totalPrice, stadium]);




    useEffect(() => {
        // 이전에 선택한 섹션으로 돌아왔을 때 해당 섹션의 체크 상태 복원
        if (section && sectionCheckStates[section]) {
            const checkboxes = document.querySelectorAll("input[type='checkbox']");
            checkboxes.forEach((checkbox) => {
                const value = checkbox.value;
                checkbox.checked = sectionCheckStates[section].includes(value);
            });
        }
    }, [section]);

    useEffect(() => {
        const price = resultList.reduce((acc, seat) => {
            const section = seat.split(" ")[0];
            return acc + sitList[section]?.price || 0;
        }, 0);
        setTotalPrice(price);
    }, [resultList]);

    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-auto w-full">
                <div className="col-start-1 col-span-7 grid grid-rows-3 h-[90%]">
                    <div className="row-start-1 p-4 grid grid-cols-3">
                        <div
                            className="border p-4 gap-2 h-full flex items-center justify-center mr-2 A1"
                            onClick={() => handleSelect("A1")}
                        >
                            <p>A1</p>
                        </div>
                        <div
                            className="border p-4 h-full flex items-center justify-center A2"
                            onClick={() => handleSelect("A2")}
                        >
                            <p>A2</p>
                        </div>
                        <div
                            className="border p-4 h-full flex items-center justify-center ml-2 A3"
                            onClick={() => handleSelect("A3")}
                        >
                            <p>A3</p>
                        </div>
                    </div>
                    <div className="row-start-2 p-4 grid grid-cols-3 h-30">
                        <div
                            className="border  p-4 col-start-1 flex items-center justify-center B1"
                            onClick={() => handleSelect("B1")}
                        >
                            <p>B1</p>
                        </div>
                        <div className="border h-30 p-4 col-start-2 flex items-center justify-center ml-4 mr-4 bg-gray-200">
                            <p>STAGE</p>
                        </div>
                        <div
                            className="border h-30 p-4  col-start-3 flex items-center justify-center B2"
                            onClick={() => handleSelect("B2")}
                        >
                            <p>B2</p>
                        </div>
                    </div>
                    <div className="row-start-3 p-4 grid grid-cols-3">
                        <div
                            className="border p-4 gap-2 h-full flex items-center justify-center mr-2 C1"
                            onClick={() => handleSelect("C1")}
                        >
                            <p>C1</p>
                        </div>
                        <div
                            className="border p-4 h-full flex items-center justify-center C2"
                            onClick={() => handleSelect("C2")}
                        >
                            <p>C2</p>
                        </div>
                        <div
                            className="border p-4 h-full flex items-center justify-center ml-2 C3"
                            onClick={() => handleSelect("C3")}
                        >
                            <p>C3</p>
                        </div>
                    </div>
                </div>

                <div className="col-start-9 col-end-12 col-span-1 grid grid-rows-2 justify-center h-[84%]">
                    <Card className="border h-full p-4 ">
                        <Typography className="text-center">{section}</Typography>
                        <div className="bg-gray-300 flex justify-center items-center">
                            <p>STAGE</p>
                        </div>
                        <div className="p-2 w-56 h-56 overflow-auto" id="selectArea">
                            {section &&
                                sitList[section].states.map((num, index) => (
                                    <div key={index} className="flex justify-center">
                                        {[...Array(num)].map((_, i) => (
                                            <input
                                                key={i}
                                                type="checkbox"
                                                value={`${section} 구역 ${index + 1}열 - ${i + 1}번석`}
                                                onChange={handleCheckboxChange}
                                            />
                                        ))}
                                    </div>
                                ))}
                        </div>
                    </Card>
                    <Card className="border h-full p-4 grid grid-rows-4 mt-5">
                        <div className="row-start-1 row-span-2 flex justify-center">
                            <ul className="p- h-full">
                                {resultList.map((value, index) => (
                                    <li key={index}>{value}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="row-start-3 flex flex justify-center">
                            <Typography variant="h6" className="text-xl mb-2">Total Price: {totalPrice}원</Typography>
                        </div>

                        <div className="row-start-4 flex flex justify-center">
                            <Button size="sm" onClick={reSetBtn}>reset</Button>
                            <Button size="sm" onClick={() => addCartBtn({resultList: resultList.join(',')})}>Add Cart</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default KSPO;
