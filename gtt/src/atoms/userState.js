import {atom} from "recoil";
import {getCookie} from "../utill/cookieUtill";


const initUserState = {
    num:0,
    userId:"",
    nick:"Anonymous",
    zoneCode: "",
    address:"",
    addrSub:"",
    email:"",
    phone: "",
    birth:"",
    roles:["ROLE_Anonymous"],
}

export const loadUserCookie = ()=>{
    return getCookie("user")
}

export const userState = atom({
    key:"userState",
    default:loadUserCookie()||initUserState
})
