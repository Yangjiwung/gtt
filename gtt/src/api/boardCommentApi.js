import axios from "axios";
import {API_SERVER_HOST} from "./filesApi";


const prefix = `${API_SERVER_HOST}/api/board/comment`

export const getBoardComList = async({pathName})=>{
    console.log(pathName)
    const res = await axios.get(`${prefix}/list/${pathName}`)
    return res.data
}

export const insertBoardComment = async (writer, content, bno) => {
    let url = `${prefix}/${bno}/`;
    let requestBody = { writer: writer, content: content ,bno:bno};
    const res = await axios.post(url, requestBody)
    return res.data
}




export const removeBoardComment = async (comNo)=>{
    const res = await axios.delete(`${prefix}/${comNo}`)
    return res.data
}

export const modifyBoardComment = async ({comNo, content,writer,bno,recomNo})=>{
    const res = await axios.put(`${prefix}/${comNo}`,{
        comNo:comNo,
        content:content,
        writer:writer,
        bno:bno,
        recomNo:recomNo,
    })
    return res.data
}