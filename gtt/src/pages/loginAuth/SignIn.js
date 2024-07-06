import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import AddrWithDaum from './AddrWithDaum';
import {
    Button,
    IconButton,
    Typography,
    AccordionHeader,
    AccordionBody,
    Accordion,
    Input
} from '@material-tailwind/react';
import { Dialog, DialogHeader, DialogBody } from '@material-tailwind/react';
import useUserAuth from "../../hooks/useUserAuth";

const SignIn = () => {
    // 주소 검색 모달 상태 제어
    const [modalOpen, modalSetOpen]  = React.useState(false);
    // 개인 정보 취급동의 상태 제어
    const [termsChecked, setTermsChecked] = useState(false);
    // 아이디 입력 상태 제어 (중복 아이디 체크여부 포함)
    const [userId, setUserId] = useState('');       // id
    const [idStatus, setIdStatus] = useState(null);
    // 비밀번호 입력 상태제어 (비밀번호, 비밀번호 확인 체크 여부 포함)
    const [password, setPassword] = useState('');   // pw
    const [confirmPw, setConfirmPw] = useState(''); // confirmPw
    const [pwStatus, setPwStatus] = useState(null);
    const [pw2Status, setPw2Status] = useState(null);
    // 닉네임 입력 상태 제어 (중복 닉네임 체크여부 포함)
    const [nick, setNick] = useState('');           // nick
    const [nickStatus, setNickStatus] = useState(null);
    // 전화번호 입력 상태제어 (전화번호 유효성 체크여부 포함)
    const [phone, setPhone] = useState('');         // phone
    const [phoneStatus, setPhoneStatus] = useState(null);
    // 이메일 입력 상태제어 (중복 이메일 체크여부 포함)
    const [email, setEmail] = useState('');         // email
    const [emailStatus, setEmailStatus] = useState(null);
    // 나머지 주소 입력 상태제어 (나머지 주소 입력 체크여부 포함)
    const [addrSub, setAddrSub] = useState('');     // addrSub
    const [addrSubStatus, setAddrSubStatus] = useState(null);
    // 그 외 생년월일 입력 및 우편번호, 주소 입력 상태제어
    const [birth, setBirth] = useState('');         // birth
    const [address, setAddress] = useState('');     // address
    const [zoneCode, setZoneCode] = useState('');   // zoneCode
    // useUserAuth에서 리턴한 값 (입력된 내용 검증 메서드도 반환)
    const { checkPw, checkId, checkEmail, checkNick, formatAndCheckPhoneNumber, handlePhoneBlur, checkAddrSub, validateAndJoin } = useUserAuth();
    // 머트리얼 모달 동작 메서드 상태 제어
    const modalHandleOpen = () => modalSetOpen(true);
    const modalHandleClose = () => modalSetOpen(false);
    // 추가정보작성 아코디언 이벤트 상태 제어
    const [detail, setDetail] = React.useState(0);
    const detailOpen = (value) => setDetail(detail === value ? 0 : value);
    // 주소 검색 후 결과 값을 반환하는 메서드
    const handleUpdateAddress = (fullAddress, zoneCode) => {
        setAddress(fullAddress);
        setZoneCode(zoneCode);
    };
    // id 체크 핸들러
    const handleCheckId = (userId) => {
        checkId(userId, setUserId, setIdStatus);  // setIdStatus를 인수로 전달
    };
    // id 체크후 결과 값으로 input창 라벨 스타일 변경
    const getUserIdLabel = () => {
        if (idStatus === 'valid') return "ID (사용 가능)";
        if (idStatus === 'invalid') return "ID (사용 중)";
        return "ID 체크";
    };
    // pw 1,2 체크 핸들러
    const handleCheckPw = (password, confirmPw) => {
        checkPw(password, confirmPw, setPassword, setConfirmPw, setPwStatus, setPw2Status);
    };
    // pw 1,2 체크 후 input창 라벨 스타일 변경
    const getUserPWLabel = () => {
        if (pwStatus === 'valid') return "PW (입력)";
        if (pwStatus === 'invalid') return "PW (입력)";
        if (pw2Status === 'valid') return "PW (일치)";
        if (pw2Status === 'invalid') return "PW (불일치)";
        return "PW 체크";
    };
    // email 체크 핸들러
    const handleCheckEmail = (email) => {
        checkEmail(email, setEmail, setEmailStatus);  // setIdStatus를 인수로 전달
    };
    // email 체크후 결과 값으로 input창 라벨 스타일 변경
    const getUserEmailLabel = () => {
        if (emailStatus === 'valid') return "email (사용 가능)";
        if (emailStatus === 'invalid') return "email (사용 중)";
        return "이메일 체크";
    }
    // 닉네임 체크 핸들러
    const handleCheckNick = (nick) => {
        checkNick(nick, setNick, setNickStatus);  // setNickStatus를 인수로 전달
    };
    // 닉네임 체크후 결과 값으로 input창 라벨 스타일 변경
    const getNickLabel = () => {
        if (nickStatus === 'valid') return "닉네임 (사용 가능)";
        if (nickStatus === 'invalid') return "닉네임 (사용 중)";
        return "닉네임 체크";
    };
    // 전화번호 체크 핸들러
    const handlePhoneChange = (e) => {
        formatAndCheckPhoneNumber(e.target.value, setPhone, setPhoneStatus);
    };
    // 전화번호 체크후 결과 값으로 input창 라벨 스타일 변경
    const getPhoneLabel = () => {
        if (phoneStatus === 'valid') return "전화번호 (사용 가능)";
        if (phoneStatus === 'invalid') return "전화번호 (불가능)";
        return "전화번호 검증";
    };
    // 나머지 주소 체크 핸들러
    const handleAddrSubBlur = () => {
        checkAddrSub(addrSub, setAddrSubStatus);
    };
    // 나머지 주소 변경 처리
    const handleAddrSubChange = (e) => {
        const newAddrSub = e.target.value;
        setAddrSub(newAddrSub); // 입력 값 상태 업데이트
        checkAddrSub(newAddrSub, setAddrSubStatus); // 입력 값 검증
    };
    // 나머지 주소 체크후 결과 값으로 input창 라벨 스타일 변경
    const getAddrSubLabel = () => {
        if (addrSubStatus === 'valid') return "추가 주소 (입력됨)";
        if (addrSubStatus === 'invalid') return "추가 주소를 입력해주세요";
        return "추가 주소 입력";
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <Link to={"/"} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            GTT
                        </Link>
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                JOIN
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={(e) => validateAndJoin(e, userId, password, confirmPw, nick, phone, email, addrSub, termsChecked, idStatus, pwStatus, pw2Status, nickStatus, phoneStatus, emailStatus, addrSubStatus, birth, address, zoneCode)}>
                                {/* 폼 내용 */}
                                <div>
                                    {/* ID */}
                                    <Typography htmlFor="userId" className="grid-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID 입력</Typography>
                                    <Input
                                        name="userId"
                                        label={getUserIdLabel()}
                                        type="text"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        onBlur={() => handleCheckId(userId)}
                                        error={idStatus === 'invalid'}
                                        success={idStatus === 'valid'}
                                        className="grid-2"  // 이전에는 "grid-3"였습니다.
                                        placeholder="아이디를 입력하세요"
                                    />
                                </div>
                                <div>
                                    {/* PW */}
                                    <Typography htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PW 입력</Typography>
                                    <Input
                                        name="password"
                                        value={password}
                                        label={getUserPWLabel()}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        id="password"
                                        placeholder="비밀번호 입력"
                                        className={`bg-gray-50 border ${password ? 'border-blue-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                </div>
                                <div>
                                    {/* PW Confirm */}
                                    <Typography htmlFor="confirmPw" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PW 입력 확인</Typography>
                                    <Input
                                        name="confirmPw"
                                        label={getUserPWLabel()}
                                        type="password"
                                        value={confirmPw}
                                        onChange={(e) => setConfirmPw(e.target.value)}
                                        onBlur={() => handleCheckPw(password, confirmPw)}
                                        error={pw2Status === 'invalid'}
                                        success={pw2Status === 'valid'}
                                        className={`bg-gray-50 border ${pwStatus === 'invalid' ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                        placeholder="비밀번호 확인"
                                    />
                                </div>
                                <div>
                                    {/* nick */}
                                    <Typography as="label" htmlFor="nickname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">닉네임</Typography>
                                    <Input
                                        name="nickname"
                                        label={getNickLabel()}
                                        type="text"
                                        value={nick}
                                        onChange={(e) => setNick(e.target.value)}
                                        onBlur={() => handleCheckNick(nick, setNick, setNickStatus)}
                                        error={nickStatus === 'invalid'}
                                        success={nickStatus === 'valid'}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="닉네임을 입력하세요"
                                    />
                                </div>
                                <div>
                                    <Accordion open={detail === 1}>
                                        <AccordionHeader onClick={() => detailOpen(1)}>
                                                추가정보작성
                                        </AccordionHeader>
                                        <AccordionBody className="scroll">
                                            <div>
                                                <Typography as="label" htmlFor="birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">생년월일</Typography>
                                                {/* birth */}
                                                <input type={"date"} value={birth} onChange={(e) => setBirth(e.target.value,"yyyy-MM-dd")} name="birth" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                            </div>
                                            <div>
                                                <Typography htmlFor="zoneCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">우편번호</Typography>
                                                <div className="grid grid-cols-12 gap-5">
                                                    <div className='col-span-10'>
                                                        {/* zoneCode */}
                                                        <input type="text" value={zoneCode || ''} name="zoneCode" onChange={setZoneCode} id="zoneCode" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="우편번호(검색결과로 입력됨)" readOnly />
                                                    </div>
                                                    <div className='col-span-2'>
                                                        <IconButton onClick = {modalHandleOpen} variant="gradient" title='주소검색'>
                                                            <svg className="w-6 h-6 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                                                            </svg>
                                                        </IconButton>
                                                        <Dialog open={modalOpen} handler={modalHandleClose}>
                                                            <DialogHeader>
                                                                <div className="grid grid-cols-12 gap-5 w-full">
                                                                    <div className='col-span-10 text-center'>
                                                                        주소찾기
                                                                    </div>
                                                                    <div className='col-span-2'>
                                                                        <Button color='red' onClick={modalHandleClose} variant="gradient" title='창닫기'>
                                                                            X
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </DialogHeader>
                                                            <DialogBody>
                                                                <AddrWithDaum onClose={modalHandleClose} onUpdateAddress={handleUpdateAddress} />
                                                            </DialogBody>
                                                        </Dialog>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {/* address */}
                                                <Typography htmlFor="adress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">주소</Typography>
                                                <input type="text" name="address" id="address" onChange={setAddress} value={address || ''} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="주소입력(검색결과로 입력됨)" readOnly />
                                            </div>
                                            <div>
                                                {/* addrSub */}
                                                <Typography htmlFor="addrSub" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">나머지 주소</Typography>
                                                <Input
                                                    name="addrSub"
                                                    type="text"
                                                    id="addrSub"
                                                    label={getAddrSubLabel()}
                                                    value={addrSub}
                                                    onChange={handleAddrSubChange}  // 이벤트 핸들러를 수정한 handleAddrSubChange로 변경
                                                    onBlur={handleAddrSubBlur}
                                                    error={addrSubStatus === 'invalid'}
                                                    success={addrSubStatus === 'valid'}
                                                    className={`bg-gray-50 border ${addrSubStatus === 'invalid' ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                                    placeholder="나머지 주소입력"
                                                />
                                            </div>
                                            <div>
                                                {/* phone */}
                                                <Typography htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">휴대폰 번호</Typography>
                                                <Input
                                                    name="phone"
                                                    type="text"
                                                    id="phone"
                                                    label={getPhoneLabel()}
                                                    value={phone}
                                                    onChange={handlePhoneChange}
                                                    onBlur={() => handlePhoneBlur(phone, setPhone, setPhoneStatus)}
                                                    error={phoneStatus === 'invalid'}
                                                    success={phoneStatus === 'valid'}
                                                    placeholder="전화번호를 입력하세요"
                                                />
                                            </div>
                                            <div>
                                                {/* email */}
                                                <Typography htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</Typography>
                                                <Input
                                                    name="email"
                                                    id="email"
                                                    label={getUserEmailLabel()}
                                                    type="text"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    onBlur={() => handleCheckEmail(email)}
                                                    error={emailStatus === 'invalid'}
                                                    success={emailStatus === 'valid'}
                                                    placeholder="이메일을 입력하세요"
                                                />
                                            </div>
                                        </AccordionBody>
                                    </Accordion>
                                </div>
                                {/* 체크박스 */}
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} id="terms" type="checkbox" />
                                    </div>
                                    <label htmlFor="terms" className="ml-3 text-sm font-light text-gray-500 dark:text-gray-300">
                                        <Link to={"#"} className="underline text-blue-500">개인정보 취급방침</Link>에 동의합니다
                                    </label>
                                </div>
                                <button type="submit" className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    회원가입
                                </button>
                                <p className='ml-3 text-sm font-light text-gray-500 dark:text-gray-300'>
                                    이미 계정이 있으신가요? &nbsp;
                                    <Link to={"/login"} className="text-primary" data-value="login">로그인</Link>
                                    <br />
                                    메인화면으로 돌아갈까요? &nbsp;
                                    <Link to={"/"} className="text-primary" data-value="home">홈으로</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SignIn;
