import {useEffect, useMemo, useRef, useState} from "react";
import * as SockJs from "sockjs-client"
import {API_SERVER_HOST} from "../api/filesApi";
import {Stomp} from "@stomp/stompjs";
import {useRecoilState} from "recoil";
import {messagesState}from "../atoms/chatData";

const CHAT_SERVER_HOST = API_SERVER_HOST.replace("http://","");
export const useStomp = ()=>{
    const client = useRef();
    const [messages, setMessages] = useRecoilState(messagesState);

    useEffect(() => {
    }, [client]);
    console.log(messages)
    const onMessageReceived = (message:any) => {
        console.log(message)
        setMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]); // 메시지 목록에 새로운 메시지 추가
    }
    const connect = ({id:id,sender:sender})=>{
        console.log(id)
        client.current = Stomp.over(()=> {
            return new SockJs(`${API_SERVER_HOST}/api/chat`);
        })
        console.log(client.current);
        client.current.connect({},(frame)=>{
            console.log(`/sub/api/chat/room/${id}`)
            client.current.subscribe(`/sub/api/chat/room/${id}`,(message)=> {
                console.log(message)
                onMessageReceived(message)
            },JSON.stringify({
                room:{
                    id:id
                },
                sender:sender,
            }))
        })
        console.log("connect : "+client.current)
    }

    const disConnect = ()=>{
        if(!client.current){
            client.current.disconnect()
        }
        console.log(client.current)
    }

    const sendChat = ({message:message,sender:sender,roomId:roomId})=>{
        console.log(client.current)
        if(client.current&&message){
            client.current.send(
                `/pub/api/chat/message`,
                {}
                ,JSON.stringify({
                message:message,
                sender:sender,
                id:roomId,
            })
            );
        }
    }
    return {connect,disConnect,sendChat}
}
