import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getAccessToken, getMemberWithAccessToken} from "../../api/kakaoApi";
import useUserAuth from "../../hooks/useUserAuth";


const KakaoRedirectPage = ()=>{
    const [searchParams] = useSearchParams()
    const authCode = searchParams.get("code")
    const {successLogin} = useUserAuth()

    useEffect(() => {
        getAccessToken(authCode).then(accessToken => {
            console.log(accessToken)

            getMemberWithAccessToken(accessToken).then((userInfo)=>{
                console.log(userInfo)
                successLogin(userInfo)
            })
        })
    }, [authCode]);
    return (
        <div>
        </div>
    )
}

export default KakaoRedirectPage