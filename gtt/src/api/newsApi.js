import axios from "axios";
import {API_SERVER_HOST} from "./filesApi";

const prefix = `${API_SERVER_HOST}/api/news`

export const getList = async(pageParam)=>{
    const {page,size} = pageParam
    const res = await axios.get(`${prefix}/list`,{params:{page:page,size:size}})
    return res.data
}
export const getMyNews = async (pageParam, userId) => {
    const { page, size } = pageParam

    const res = await axios.get(`${prefix}/myPost/list`, {
        params: {page: page, size: size, userId: userId}
    })
    return res.data
}

export const getOne = async(newsNo)=>{
    console.log(newsNo)
    const res = await axios.get(`${prefix}/${newsNo}`)
    return res.data
}

export const insertNews = async (title,content,theTeam,writer)=>{
    const res = await axios.post(`${prefix}/`,{
        title:title,
        content:content,
        theTeam:theTeam,
        writer:writer
    })
    return res.data
}

export const modifyNews = async (title,content,theTeam,writer,newsNo)=>{
    const res = await axios.put(`${prefix}/${newsNo}`,{
        title:title,
        content:content,
        theTeam:theTeam,
        writer:writer
    })
    return res.data
}

// 뉴스 게시물 삭제
export const removeNews = async (newsNo) => {
    const res = await axios.delete(`${prefix}/${newsNo}`)
    return res.data;
}
