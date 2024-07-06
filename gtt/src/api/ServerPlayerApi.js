import axios from "axios"
import {API_SERVER_HOST} from "./filesApi";

const prefix = `${API_SERVER_HOST}/api/lol`

export const getOnePlayer = async (id) => {
    const res = await axios.get(`${prefix}/player/${id}`)

    return res.data
}

export const getOneTeam = async (id) => {
    const res = await axios.get(`${prefix}/team/${id}`)

    return res.data
}

export const getPlayerList = async (pageParam) => {
    const {page, size} = pageParam
    const res = await axios.get(`${prefix}/player/list`, {params:{page:page, size:size}})

    return res.data
}

export const getPlayerListWithTeam = async (pageParam) => {
    const {page, size} = pageParam
    const {keyword} = pageParam
    const res = await axios.get(`${prefix}/player/list/${keyword}`, {params:{page:page, size:size, keyword:keyword}})

    return res.data
}

export const getTeamList = async () => {
    const res = await axios.get(`${prefix}/team/list`)

    return res.data
}

export const getWinnerList = async () => {
    const res = await axios.get(`${prefix}/team/winner`)

    return res.data
}

export const postAdd = async (player) => {
    const header =     {headers: {'Content-Type': 'application/json'}}
    const res = await axios.post(`${prefix}/`, player, header)

    return res.data
}

export const putOnePlayer = async (id, player) => {
    const header =     {headers: {'Content-Type': 'application/json'}}
    const res = await axios.put(`${prefix}/${id}`, player, header)

    return res.data
}

export const deleteOnePlayer = async (id) =>{
    const res = await axios.delete(`${prefix}/${id}`)

    return res.data
}
