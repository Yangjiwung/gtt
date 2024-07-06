import {atom} from "recoil";

export const chatListState = atom({
    key: 'chatListState', // 상태의 고유 식별자
    default: [], // 초기값은 빈 배열로 설정합니다.
});

export const chatState = atom({
    key:'chatState',
    default:"",
})

export const clientState = atom({
    key:'clientState',
    default:null,
})

export const chatRoomState = atom({
    key:'chatRoomState',
    default:{
        id: 0,
        name:"",
        creator:"",
    },
})

export const messagesState = atom({
    key:'messagesState',
    default:[],
})
