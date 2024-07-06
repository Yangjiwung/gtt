import {useRecoilState} from "recoil";
import {chatListState, chatState} from "../atoms/chatData";
import axios from "axios";
import {API_SERVER_HOST} from "../api/filesApi";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {useState} from "react";


const useWebSocket = () => {
    const [chatList, setChatList] = useRecoilState(chatListState);
    const [chat, setChat] = useRecoilState(chatState);
    const [chatRoomId, setChatRoomId] = useState("");
    const userId = "test"
    const CHAT_SERVER_URL = "ws://localhost:8080/ws/chat";

    const callBack = function (message){
        console.log(message);
        if(!message===undefined&&message&&message.body){
            let msg = JSON.parse(message.body);
            setChatList((prevChatList) => [...prevChatList, msg]);
        }
    }
    const connect = async ()=>{
        /*const socket = new SockJS("http://localhost:8080/chat")
        const client = StompJS.over(socket);
        client.subscribe("/api/chat/room/"+chatRoomId,function (res){
            console.log(res,JSON.parse(res.body).message);
        });*/
        const res = await axios.post(API_SERVER_HOST+"/api/chat/room",{name:"test"});
        console.log(res)
        const chatRoomId = res.data.room.roomId;
        const client = new StompJS.Client({
            webSocketFactory:()=>new SockJS("http://localhost:8080/ws/chat"),
            /*brokerURL:CHAT_SERVER_URL,*/
            /*connectHeaders:{
                login:"",
                passcode:"password",
                name:"test",
            },*/
            debug:function (str){
                console.log(str);
            },
            reconnectDelay:5000,
            heartbeatIncoming:4000,
            heartbeatOutgoing:4000,
            onConnect:()=>{
                console.log("connect");
                client.subscribe("http://localhost:8080/api/chat/room/"+chatRoomId, callBack)
            },
            onStompError:(frame)=>{
                console.log(frame);
            }
        });
        client.activate();
        return {client:client,chatRoomId:chatRoomId};
    }
    const disConnect =({client})=>{
        if(client===null){
            return;
        }
        client.deactive();
    }

    const sendChat = ({chat:chat,chatRoomId:chatRoomId,client:client})=>{
        if(chat===""){
            return;
        }
        console.log(chat,chatRoomId,client);
        return chat="";
    }

    return {connect,disConnect,sendChat}
}
export default useWebSocket
