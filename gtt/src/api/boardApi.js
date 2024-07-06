import axios from "axios";
import {API_SERVER_HOST} from "./filesApi";
import jwtAxios from "../utill/jwtUtill";

const prefix = `${API_SERVER_HOST}/api/board`

export const getBoardList = async(pageParam)=>{
    const {page,size} = pageParam
    const res = await axios.get(`${prefix}/list`,{params:{page:page,size:size}})
    return res.data
}
export const getMyBoard = async (pageParam, userId) => {
    const { page, size } = pageParam

    const res = await jwtAxios.get(`${prefix}/myPost/list`, {
        params: {page: page, size: size, userId: userId}
    })
    return res.data
}

export const getOne = async(bno)=>{
    console.log(bno)
    const res = await axios.get(`${prefix}/${bno}`)
    return res.data
}

export const insertBoard = async (title,content,theTeam,writer)=>{
    const res = await jwtAxios.post(`${prefix}/`,{
        title:title,
        content:content,
        theTeam:theTeam,
        writer:writer
    })
    return res.data
}

export const modifyBoard = async (title,content,theTeam,writer,bno)=>{
    const res = await jwtAxios.put(`${prefix}/${bno}`,{
        title:title,
        content:content,
        theTeam:theTeam,
        writer:writer
    })
    return res.data
}

export const removeBoard = async (bno)=>{
    const res = await jwtAxios.delete(`${prefix}/${bno}`)
    return res.data
}
