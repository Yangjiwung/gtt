import {Link} from 'react-router-dom';
import React, {memo, useEffect, useState} from "react";
import useUserAuth from "../../hooks/useUserAuth";
import KakaoLoginComponent from "../../components/user/KakaoLoginComponent";

const Login = () => {
    // 1. 이페이지에서만 값을 가지고 있을 것이므로 여기에 state작성
    //      변수         메서드
    const [memberId, setMemberId] = useState(''); // id
    const [memberPw, setMemberPw] = useState(''); // pw
    // 2. useUserAuth 에서 리턴한 메서드
    const { confirmLogin } = useUserAuth(); // 로그인 훅

    const handleLogin = () => {
        confirmLogin({userId:memberId, password:memberPw}); // 로그인 훅 실행
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link to={"/"} data-value="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        GTT    
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                LOGIN
                            </h1>
                            {/*<form className="space-y-4 md:space-y-6" onSubmit={goLogin}>*/}
                                <div>
                                    <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
                                    <input type="text" value={memberId} onChange={(e) => setMemberId(e.target.value)} name="id" id="id" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your id"/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" value={memberPw} onChange={(e) => setMemberPw(e.target.value)} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••"/>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">로그인정보 기억하기</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">ID/PW 찾기</a>
                                </div>
                                <button onClick={handleLogin} type="submit" className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    로그인
                                </button>
                                <KakaoLoginComponent/>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    계정이 없으신가요? <Link to={"/signIn"} className="font-medium text-primary-600 hover:underline dark:text-primary-500" data-value="signIn" >회원가입</Link>
                                </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
