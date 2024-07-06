import {IconButton, Popover, PopoverContent, PopoverHandler,} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import {memo, useState} from "react";
import {useRecoilState, useResetRecoilState} from "recoil";
import {chatListState, chatRoomState, messagesState} from "../../../atoms/chatData";
import ChatRoomComponent from "./ChatRoomComponent";
import ChatListComponent from "./ChatListComponent";

export const dismissType = {
    outsidePress: false,
};
const ChatComponent = memo(()=>{
    const messageReset = useResetRecoilState(messagesState)
    const [chatList, setChatList] = useRecoilState(chatListState);
    const resetRoom = useResetRecoilState(chatRoomState);
    const [isOpen, setIsOpen] = useState(false);
    const [isList, setIsList] = useState(true);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    const moveList = ()=>{
        messageReset();
        setIsList(!isList);
        resetRoom();
    }
    const moveRoom = ()=>{
        setIsList(!isList);
    }
    return(
        <div className={"fixed bottom-10 right-10 z-30"}>
            <Popover active={isOpen} dismiss={dismissType} onOutsideClick={handleClose}>
                <PopoverHandler>
                    <IconButton variant="outlined" onClick={handleClick}><FontAwesomeIcon icon={faComments} className={"text-lg"} /></IconButton>
                </PopoverHandler>
                <PopoverContent>
                    <div className="w-[250px] h-[400px]">
                        {isList?
                            <ChatListComponent chatList={chatList} moveTo={moveRoom}/>:
                            <ChatRoomComponent moveTo={moveList}/>}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
})
export default ChatComponent
