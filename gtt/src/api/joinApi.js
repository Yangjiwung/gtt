import axios from "axios";
import {API_SERVER_HOST} from "./filesApi";

const prefix = `${API_SERVER_HOST}/api/member`;

// 로그인
export const login = async (userId, password) => {
    console.log(userId,password);
    const url = `${prefix}/login`;
    let data = new URLSearchParams();
    data.append("username", userId);
    data.append("password", password);
    const response = await axios.post(url, data);
    console.log(response)
    return response.data;
};

// 아이디 중복확인
export const validateID = async (userId) => {
    const url = `${prefix}/checkId/${userId}`;
    const response = await axios.get(url);
    return response.data;
};

// 닉네임 중복확인
export const validateNick = async (nick) => {
    const url = `${prefix}/checkNick/${nick}`;
    try {
        const response = await axios.get(url);
        return response.data; 
    } catch (error) {
        throw error; 
    }
};

// 메일 중복확인
export const validateEmail = async (email) => {
    const url = `${prefix}/checkEmail/${email}`;
    const response = await axios.get(url);
    return response.data;
}

// 회원가입
export const join = async ({userId:userId, password:password, phone:phone, nick:nick, email:email, birth:birth, address:address, addrSub:addrSub, zoneCode:zoneCode}) => {
    const url = `${prefix}/register`;
    console.log({userId:userId, password:password, phone:phone, nick:nick, email:email, birth:birth, address:address, addrSub:addrSub, zoneCode:zoneCode})
    try {
        const response = await axios.post(url,{
            userId:userId,
            password:password,
            phone:phone,
            nick:nick,
            email:email,
            birth:birth,
            zoneCode:zoneCode,
            address:address,
            addrSub:addrSub,
        });
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
};
