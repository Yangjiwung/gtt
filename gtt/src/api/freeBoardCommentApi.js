import axios from "axios";
import {API_SERVER_HOST} from "./filesApi";


const prefix = `${API_SERVER_HOST}/api/free/comment`

export const getFreeComList = async({pathName})=>{
    console.log(pathName)
    const res = await axios.get(`${prefix}/list/${pathName}`)
    return res.data
}

export const insertFreeComment = async (writer, content, fno) => {
    let url = `${prefix}/${fno}/`;
    let requestBody = { writer: writer, content: content ,fno:fno};
    const res = await axios.post(url, requestBody)
    return res.data
}




export const removeFreeComment = async (comNo)=>{
    const res = await axios.delete(`${prefix}/${comNo}`)
    return res.data
}

export const modifyFreeComment = async ({comNo, content,writer,fno,recomNo})=>{
    const res = await axios.put(`${prefix}/${comNo}`,{
        comNo:comNo,
        content:content,
        writer:writer,
        fno:fno,
        recomNo:recomNo,
    })
    return res.data
}