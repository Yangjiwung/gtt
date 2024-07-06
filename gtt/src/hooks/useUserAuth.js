import {createSearchParams, useNavigate} from 'react-router-dom';
import {login, validateID, validateNick, join, vaiudateEmail, validateEmail} from "../api/joinApi";
import {useRecoilState, useResetRecoilState, useSetRecoilState} from "recoil";
import {userState} from "../atoms/userState";
import {tokenState} from "../atoms/tokenState";
import {getCookie, removeCookie, setCookie} from "../utill/cookieUtill";
import {useState} from "react";

const useUserAuth = () => {
    // 페이지 네비게이션
    const navigate = useNavigate();
    const [userInfo,setUserInfo] = useRecoilState(userState);
    const removeUserInfo = useResetRecoilState(userState);
    const [tokenInfo,setTokenInfo] = useRecoilState(tokenState);
    const removeTokenInfo = useResetRecoilState(tokenState)

    const successLogin = (result)=>{
        if (result!==undefined&&result.accessToken) {
            // 로그인 성공 메시지
            setTokenInfo((tokenInfo) => [{accessToken: result.accessToken, refreshToken: result.refreshToken}]);
            setUserInfo((userInfo)=>[{
                num:result.num,
                userId:result.userId,
                nick:result.nick,
                zoneCode:result.zoneCode,
                address:result.address,
                addrSub:result.addrSub,
                email:result.email,
                phone:result.phone,
                birth:result.birth,
                roles:result.roles,
            }]);
            setCookie("user",{
                num:result.num,
                userId:result.userId,
                nick:result.nick,
                zoneCode:result.zoneCode,
                address:result.address,
                addrSub:result.addrSub,
                email:result.email,
                phone:result.phone,
                birth:result.birth,
                roles:result.roles,
            },1);
            setCookie("token",{accessToken: result.accessToken, refreshToken: result.refreshToken},1);
            console.log(getCookie("user"),getCookie("token"))
            alert("로그인 되었습니다.");
            navigate("/");
        } else {
            // 실패 메시지
            alert("아이디/비밀번호를 확인하세요.");
        }
    }

    const exceptionHandle = (ex)=>{
        console.log(ex);
        const errorMsg = ex.response.data.message;
        const errorStr = createSearchParams({error:errorMsg}).toString()
        if(errorMsg==='REQUIRE_LOGIN'){
            alert("로그인이 필요합니다.")
            navigate("/login", {search: errorStr});
            return;
        }
        if(ex.response.data.error === 'ERROR_ACCESSDENIED'){
            alert("해당 메뉴를 사용할 권한이 없습니다.")
            navigate("/login", {search: errorStr});
            return;
        }
    }
    // 로그인
    const confirmLogin = ({userId, password}) => {
        const res = login(userId, password);
        console.log(res);
        res.then(result => {
            console.log(result);
            successLogin(result)
        })
        .catch(error => {
            console.log(error);
            // 오류 메시지
            alert("로그인 과정에서 오류가 발생했습니다: " + error.message);
        });
    };

    // 아이디 중복 검사
    const checkId = (userId, setUserId, setIdStatus) => {
        validateID(userId)
            .then(result => {
                console.log("API 전체 응답:", result);  // 전체 응답 로깅
                console.log("API 응답 메시지:", result.message);  // 메시지 로깅
                // 직접적인 메시지 사용을 통한 조건 확인
                if (result.message === true) {
                    setIdStatus('valid');
                } else if (result.message === false) {
                    setIdStatus('invalid');
                    setUserId("");  // 입력창을 빈값으로 설정
                }
            })
            .catch(error => {
                setIdStatus(null);  // API 호출 실패 시 ID 상태를 리셋
            });
    };

    // 이메일 중복 검사
    const checkEmail = (email, setEmail, setEmailStatus) => {
        validateEmail(email)
            .then(result => {
                console.log("API 전체 응답:", result);  // 전체 응답 로깅
                console.log("API 응답 메시지:", result.message);  // 메시지 로깅
                // 직접적인 메시지 사용을 통한 조건 확인
                if (result.message === true) {
                    setEmailStatus('valid');
                } else if (result.message === false) {
                    setEmailStatus('invalid');
                    setEmail("");  // 입력창을 빈값으로 설정
                } else {
                    console.log("예상치 못한 응답 메시지:", result.message);
                    setEmailStatus(null);
                }
            })
            .catch(error => {
                setEmailStatus(null);  // API 호출 실패 시 ID 상태를 리셋
            });
    };

    // 비밀번호 일치 확인
    const checkPw = (password, confirmPw, setPassword, setConfirmPw, setPwStatus, setPw2Status) => {
        console.log(password,confirmPw)
        if (password !== confirmPw) { // 비밀번호 불일치
            setPwStatus('invalid');
            setPw2Status('invalid');
            setConfirmPw("");
            setPassword("");
        }else { // 비밀번호 일치
            setPwStatus('valid');
            setPw2Status('valid');
        }
    };

    // 닉네임 중복 검사
    const checkNick = (nick, setNick, setNickStatus) => {
        validateNick(nick)
            .then(result => {
                console.log("API response:", result);
                if (result.message === true) {
                    setNickStatus('valid');
                } else if(result.message === false) {
                    setNickStatus('invalid');
                    setNick("");
                }
            })
            .catch(error => {
                setNickStatus(null);  // API 호출 실패 시 닉네임 상태를 초기화
                console.error("Error checking nickname:", error);
            });
    };

    // 전화번호 포맷 및 유효성 검사
    const formatAndCheckPhoneNumber = (phone, setPhone, setPhoneStatus) => {
        const numericPhone = phone.replace(/[^\d]/g, ''); // 숫자만 추출
        let formattedPhone = numericPhone;
        if (numericPhone.length <= 3) {
            formattedPhone = numericPhone;
        } else if (numericPhone.length <= 7) {
            formattedPhone = `${numericPhone.slice(0, 3)}-${numericPhone.slice(3)}`;
        } else if (numericPhone.length <= 11) {
            formattedPhone = `${numericPhone.slice(0, 3)}-${numericPhone.slice(3, 7)}-${numericPhone.slice(7)}`;
        }
        setPhone(formattedPhone);  // 항상 전화번호를 형식화
        if (numericPhone.length === 11) {
            setPhoneStatus('valid'); // 전화번호가 유효한 경우
        } else {
            setPhoneStatus('invalid'); // 전화번호가 유효하지 않은 경우
        }
    };
    // 전화번호 유효성검증 코드
    const handlePhoneBlur = (phone, setPhone, setPhoneStatus) => {
        const numericPhone = phone.replace(/[^\d]/g, '');
        if (numericPhone.length !== 11) {
            setPhone(''); // 전화번호가 유효하지 않으면 입력을 지움
            setPhoneStatus(null);
        }
    };

    // 나머지 주소 입력확인
    const checkAddrSub = (addrSub, setAddrSubStatus) => {
        if (addrSub.trim() === "") {
            setAddrSubStatus('invalid');
        } else {
            setAddrSubStatus('valid');
        }
    };

// 회원가입 전 입력 값 검증 및 API 호출
    const validateAndJoin = (e, userId, password, confirmPw, nick, phone, email, addrSub, termsChecked, idStatus, pwStatus, pw2Status, nickStatus, phoneStatus, emailStatus, addrSubStatus, birth, address, zoneCode) => {
        e.preventDefault();  // 폼 제출 기본 동작 중단
        let errors = [];
        // 입력 필드별 상태 검증
        if (!userId || idStatus !== 'valid') errors.push("아이디");
        if (!password || pwStatus !== 'valid' || pw2Status !== 'valid') errors.push("비밀번호");
        if (!nick || nickStatus !== 'valid') errors.push("닉네임");
        if (!phone || phoneStatus !== 'valid') errors.push("전화번호");
        if (!email || emailStatus !== 'valid') errors.push("이메일");
        if (!addrSub || addrSubStatus !== 'valid') errors.push("나머지 주소");
        if (!termsChecked) errors.push("개인정보 취급방침 동의");

        if (errors.length > 0) {
            alert(`${errors.join(", ")}의 입력을 확인해주세요`);
        }
        join({ userId, password, nick, phone, email, birth, address, addrSub, zoneCode })
            .then(response => {
                // response.data가 존재하는지 확인
                if (response.data === null) {
                    // 응답 데이터가 없는 경우 실패로 간주
                    console.log("등록 실패, 응답 데이터가 없음");
                    alert("회원 가입에 실패했습니다. 다시 시도해주세요.");
                } else {
                    // 응답 데이터가 존재하면 회원가입 성공으로 간주
                    console.log("등록 성공, 응답 데이터:", response.data);
                    alert("회원 가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
                    navigate("/login");
                }
            })
            .catch(error => {
                // 네트워크 오류 또는 기타 API 호출 오류 처리
                console.error("등록 과정 중 오류 발생:", error);
                alert("회원 가입 과정 중 오류가 발생했습니다: " + (error.response?.data?.message || error.message));
            });
    };

    const logout = ()=>{
        removeUserInfo()
        removeTokenInfo()
        removeCookie("user","/")
        removeCookie("token","/")
    }

    // 모든 리턴
    return { confirmLogin, checkId, checkEmail, checkNick, checkPw, validateAndJoin , formatAndCheckPhoneNumber, handlePhoneBlur, checkAddrSub,
            logout, exceptionHandle, successLogin};
};

export default useUserAuth;
