import {atom} from "recoil";


const initTokenState = {
    accessToken : "",
    refreshToken : "",
}

export const tokenState = atom({
    key:"accessTokenState",
    default:initTokenState,
})