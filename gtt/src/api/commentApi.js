import axios from "axios";
import {API_SERVER_HOST} from "./filesApi";


const prefix = `${API_SERVER_HOST}/api/comment`

export const getComList = async({pathName})=>{
    console.log(pathName)
    const res = await axios.get(`${prefix}/list/${pathName}`)
    return res.data
}
export const getNoticeComments = async({pathName})=>{
    console.log(pathName)
    const res = await axios.get(`${prefix}/list/notice/${pathName}`)
    return res.data
}

export const insertComment = async (writer, content, newsNo, notiNo) => {
    let url = null;
    let requestBody = { writer: writer, content: content };

    if (newsNo && !notiNo) {
        url = `${prefix}/news/${newsNo}/`
        requestBody.newsNo = newsNo;
    } else if (!newsNo && notiNo) {
        url = `${prefix}/notice/${notiNo}/`
        requestBody.notiNo = notiNo
    } else {
        throw new Error("오류발생")
    }

    const res = await axios.post(url, requestBody)
    return res.data
}




export const removeComment = async (comNo)=>{
    const res = await axios.delete(`${prefix}/${comNo}`)
    return res.data
}

export const modifyComment = async ({comNo, content,writer,newsNo,recomNo})=>{
    const res = await axios.put(`${prefix}/${comNo}`,{
        comNo:comNo,
        content:content,
        writer:writer,
        newsNo:newsNo,
        recomNo:recomNo,
    })
    return res.data
}