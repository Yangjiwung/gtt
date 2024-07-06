import axios from "axios";
import {API_SERVER_HOST} from "./filesApi";

//export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api/notice`

export const  getOne =async (notiNo) => {

    const res =await axios.get(`${prefix}/${notiNo}`)

    return res.data
}

export const getNoticeList =async (pageParam) => {
    const {page, size} = pageParam

    const res = await axios.get(`${prefix}/list`, {params:{page:page, size:size}})

    return res.data
}

export const getMyPost = async (pageParam, userId) => {
    const { page, size } = pageParam

        const res = await axios.get(`${prefix}/myPost/list`, {
            params: {page: page, size: size, userId: userId}
        })
        return res.data
}


export const postAdd = async (noticeObj) => {

    const res = await axios.post(`${prefix}/`,noticeObj)
    return res.data
}

export const deleteOne = async (notiNo) => {

    const res = await axios.delete(`${prefix}/${notiNo}`)
    return res.data
}

export const putOne = async (notice) =>{
    //const header =     {headers: {'Content-Type': 'application/json'}}
   // alert(notice.content)
     const res = await axios.put(`${prefix}/${notice.notiNo}`, notice)

    return res.data
}
