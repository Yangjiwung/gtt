import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Typography, Input, Dialog, DialogHeader, DialogBody } from '@material-tailwind/react';
import {modify, updateMember} from "../../api/memberApi";
import { useRecoilState } from "recoil";
import {userState} from "../../atoms/userState";
import SidebarLayout from "../../layouts/SidebarLayout";
import AddrWithDaum from './AddrWithDaum';

const MyPage = () => {
    const navigate = useNavigate();
    const [modalOpen, modalSetOpen] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [formData, setFormData] = useState({
        num: '',
        userId: '',
        password: '',
        nick: '',
        birth: '',
        address: '',
        zoneCode: '',
        addrSub: '',
        phone: '',
        email: ''
    });



    useEffect(() => {
        if (!userInfo || userInfo.length === 0 || !userInfo[0]) {
            alert("유효한 사용자 정보가 없습니다. 로그인 페이지로 이동합니다.");
            navigate('/login');
        } else {
            setFormData({
                num: userInfo[0].num,
                userId: userInfo[0].userId,
                password: userInfo[0].password,
                nick: userInfo[0].nick,
                birth: userInfo[0].birth,
                zoneCode: userInfo[0].zoneCode,
                address: userInfo[0].address,
                addrSub: userInfo[0].addrSub,
                phone: userInfo[0].phone,
                email: userInfo[0].email || '',
            });
        }
    }, [userInfo, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    // 머트리얼 모달 동작 메서드
    const modalHandleOpen = () => modalSetOpen(true);
    const modalHandleClose = () => modalSetOpen(false);
    // 주소 검색 후 결과 값을 반환하는 메서드
    const handleUpdateAddress = (fullAddress, zoneCode) => {
        setFormData(prevState => ({
            ...prevState,
            address: fullAddress,
            zoneCode: zoneCode
        }));
    };

    const handleMemUpdate = async (e) => {
        e.preventDefault();
        console.log("메서드에 들어온값 : "
            + formData.num
            + formData.nick
            + formData.birth
            + formData.address
            + formData.zoneCode
            + formData.addrSub
        );
        if (!formData.num || !formData.nick || !formData.birth || !formData.address || !formData.zoneCode || !formData.addrSub) {
            alert('모든 필드를 채워주세요.');
            return;
        }
        modify(formData.num, formData.nick, formData.birth, formData.zoneCode, formData.address, formData.addrSub )
            .then(res => {
                if(res.data) {
                    alert("회원정보를 수정했습니다.");
                    navigate('/');
                }else {
                    console.log("회원 수정 오류 : " + res.data);
                }
            })
            .catch(error => {
                console.log("회원 수정 api 호출 에러 발생 : " + error);
            });
    };

    return (
        <SidebarLayout>
            <h1 className="text-xl text-center mb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                MyPage
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleMemUpdate}>
                <div>
                    {/* ID */}
                    <Typography as="label" htmlFor="userId"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        ID</Typography>
                    <input
                        readOnly
                        name="userId"
                        value={formData.userId}
                        type="text"
                        id="userId"
                        onChange={handleInputChange}
                        className="bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div>
                    <Typography as="label" htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        비밀번호</Typography>
                    <input
                        readOnly
                        name="password"
                        value={formData.password}
                        type="text"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                {/* Nickname Input */}
                <div>
                    <Typography as="label" htmlFor="nickname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">닉네임</Typography>
                    <Input
                        name="nick"
                        label="닉네임"
                        type="text"
                        value={formData.nick}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="닉네임을 입력하세요"
                    />
                </div>
                {/* 생년월일 Input */}
                <div>
                    <Typography as="label" htmlFor="birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">생년월일</Typography>
                    <input
                        type="date"
                        name="birth"
                        value={formData.birth}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <Typography as="label" htmlFor="zoneCode"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">우편번호</Typography>
                    <div className="grid grid-cols-12 gap-5">
                        <div className='col-span-10'>
                            {/* zoneCode */}
                            <input
                                type="text"
                                value={formData.zoneCode || ''}
                                name="zoneCode"
                                onChange={handleInputChange} id="zoneCode"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                readOnly/>
                        </div>
                        <div className='col-span-2'>
                            <IconButton onClick={modalHandleOpen} variant="gradient"
                                        title='주소검색'>
                                <svg className="w-6 h-6 text-white-800 dark:text-white"
                                     aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round"
                                          strokeWidth="2"
                                          d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                                </svg>
                            </IconButton>
                            <Dialog open={modalOpen} handler={modalHandleClose}>
                                <DialogHeader>
                                    <div className="grid grid-cols-12 gap-5 w-full">
                                        <div className='col-span-10 text-center'>
                                            주소찾기
                                        </div>
                                        <div className='col-span-2'>
                                            <Button color='red' onClick={modalHandleClose}
                                                    variant="gradient" title='창닫기'>
                                                X
                                            </Button>
                                        </div>
                                    </div>
                                </DialogHeader>
                                <DialogBody>
                                    <AddrWithDaum onClose={modalHandleClose} onUpdateAddress={handleUpdateAddress}/>
                                </DialogBody>
                            </Dialog>
                        </div>
                    </div>
                </div>
                {/* Address Input */}
                <div>
                    <Typography as="label" htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">주소</Typography>
                    <input
                        readOnly
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <Typography as="label" htmlFor="addrSub" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">나머지 주소</Typography>
                    <input
                        type="text"
                        name="addrSub"
                        value={formData.addrSub}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                {/* 이제 이 방식을 다른 입력 필드에도 적용하면 됩니다. */}
                <div>
                    <div>
                    <Typography as="label" htmlFor="phone"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">전화번호</Typography>
                    {/* phone */}
                    <input
                        readOnly
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div>
                    <Typography as="label" htmlFor="email"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</Typography>
                    {/* email */}
                    <input
                        readOnly
                        type="text"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
            </div>
            <div className="flex items-center justify-center gap-2">
                    {/*<button type="submit" className="text-white bg-gradient-to-r from-red-800 to-red-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-32 h-10" onClick={() => handleReset}>*/}
                    {/*    리셋*/}
                    {/*</button>*/}
                    <button type="submit"
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-32 h-10">
                        수정 확인
                    </button>
                    {/*<button type="button" className="text-white bg-gradient-to-r from-green-800 to-green-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-32 h-10" onClick={() => idAndPwModify()}>*/}
                    {/*    ID/PW 변경*/}
                    {/*</button>*/}
                </div>
            </form>
        </SidebarLayout>
    );
};

export default MyPage;
