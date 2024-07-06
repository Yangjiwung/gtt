import axios from "axios"
import {API_SERVER_HOST} from "./filesApi";

const prefix = `${API_SERVER_HOST}/api/playercomment`

export const checkPComment = async (pno, comWriter) => {
    const res = await axios.get(`${prefix}/${pno}/${comWriter}`)

    return res.data
}

// export const getPCommentList = async ({pathName}) => {
//     // const {page, size} = pageParam
//     const res = await axios.get(`${prefix}/list/${pathName}`)
//
//     return res.data
// }
export const getPCommentList = async ({pno}) => {
    const res = await axios.get(`${prefix}/list/${pno}`)

    return res.data
}

export const postPCommentAdd = async (playerComment) => {
    const header =     {headers: {'Content-Type': 'application/json'}}
    const res = await axios.post(`${prefix}/`, playerComment, header)

    return res.data
}

export const putOnePComment = async (playerComNo, playerComment) => {
    const header =     {headers: {'Content-Type': 'application/json'}}
    const res = await axios.put(`${prefix}/${playerComNo}`, playerComment, header)

    return res.data
}

export const deleteOnePComment = async (playerComNo) =>{
    const res = await axios.delete(`${prefix}/${playerComNo}`)

    return res.data
}
