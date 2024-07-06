
// 요청을 수행하기 위한 서버 경로
import axios from "axios";
import {API_SERVER_HOST} from "./filesApi";
import jwtAxios from "../utill/jwtUtill";

const prefix = `${API_SERVER_HOST}/api/member`;

// 회원 리스트 출력
export const memberList = async () => {
    const response = await jwtAxios.get(`${prefix}/members`);
    return response.data;
};

// 회원 한명 조회
export const getMember = async (num) => {
        const response = await axios.get(`${prefix}/${num}`);
        return response.data;
};

// 회원 삭제
export const removeMember = async (num) => {
    const response = await axios.delete(`${prefix}/${num}`);
    return response.data;
}

// 회원수정
export const updateMember = async (num, nick, birth, zoneCode, address, addrSub) => {
    console.log(num, nick, birth, zoneCode, address, addrSub);
    const response = await jwtAxios.put(`${prefix}/${num}`, {
        num:num,
        nick:nick,
        birth:birth,
        zoneCode:zoneCode,
        address:address,
        addrSub:addrSub
    });
    return response.data;
}

// 회원수정(일부 정보)
export const modify = async (num, nick, birth, zoneCode, address, addrSub, ) => {
    console.log(`들어온 값 : ${num}, ${nick}, ${birth}, ${zoneCode}, ${address}, ${addrSub}`);
    const res = await jwtAxios.put(`${prefix}/partModify/${num}`, {
        nick:nick,
        birth:birth,
        zoneCode:zoneCode,
        address:address,
        addrSub:addrSub
    })
    return res.data;
}
