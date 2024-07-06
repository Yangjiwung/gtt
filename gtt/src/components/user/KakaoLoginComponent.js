import {getKakaoLoginLink} from "../../api/kakaoApi";
import {Link} from "react-router-dom";


const KakaoLoginComponent = ()=>{
    const link = getKakaoLoginLink()

    return(
        <div className={"flex flex-col"}>
            <div className={"flex justify-center w-full"}>
                    <Link to={link}><img src={"/img/kakao_login_medium_narrow.png"}/></Link>
            </div>
        </div>
    )
}

export default KakaoLoginComponent
