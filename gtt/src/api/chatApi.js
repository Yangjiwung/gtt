import axios from "axios";
import {API_SERVER_HOST} from "./filesApi";


const PREFIX = `${API_SERVER_HOST}/api/chat`;

const chatApi = ()=>{

    const getChatRooms = async()=>{
        const res = await axios.get(`${PREFIX}/rooms`);
        return res.data;
    }

    const createChatRoom = async({roomName:roomName,nick:nick})=>{
        const res = await axios.post(`${PREFIX}/room`,{name:roomName, creator: nick?nick:"Anonymous"});
        return res.data;
    }

    const getChatRoom = async({roomId:roomId})=>{
        const res = await axios.get(`${PREFIX}/room/${roomId}`);
        return res.data;
    }
    return {getChatRooms,createChatRoom,getChatRoom};
}

export default chatApi;
