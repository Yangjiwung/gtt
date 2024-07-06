import React, {useEffect, useState} from "react";
import chatApi from "../../../api/chatApi";
import {
    Button,
    Card,
    IconButton,
    Input, ListItem,
    Popover,
    PopoverContent,
    PopoverHandler,
    Typography,
    List, ListItemPrefix, Avatar,
} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useRecoilState, useRecoilValue} from "recoil";
import {userState} from "../../../atoms/userState";
import {chatRoomState} from "../../../atoms/chatData";


const ChatListComponent = ({moveTo})=>{
    const user = useRecoilValue(userState);
    const [room, setRoom] = useRecoilState(chatRoomState);
    const {getChatRooms,createChatRoom} = chatApi()
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState("");
    const [refresh, setRefresh] = useState(false);

    const onChange=(e)=>{
        setRoomName(e.target.value)
    }
    const handleSubmit = ()=>{
        createChatRoom({roomName:roomName,nick:user.nick}).then((room)=>{
            alert(room.roomId+"번 방 생성 완료")
            setRefresh(!refresh)
        })
    }
    const handleMove = ()=>{

    }
    useEffect(() => {
        getChatRooms().then(res=>{
            console.log(res);
            setRooms(res.rooms)
        });
    }, [refresh]);
    console.log(rooms);
    return (
        <div>
            <Popover>
                <PopoverHandler>
                    <div className={"grid grid-cols-6 outline-1 justify-center items-center w-[250px]" }>
                        <Typography type={"div"} variant={"h5"} className={"text-black text-center col-start-2 col-end-5 overflow-auto"}>Room List</Typography>
                        <IconButton variant="text" className="col-start-6 col-end-6" debounce={300}>
                            <FontAwesomeIcon icon={faPlus} className={"text-lg"}/>
                        </IconButton>
                    </div>
                </PopoverHandler>
                <PopoverContent>
                    <Card>
                        <div className="relative flex w-[250px]">
                            <Input type="text" label="Room Name" value={roomName} onChange={onChange} className="pr-20" />
                            <Button
                                size="sm"
                                color={roomName ? "gray" : "blue-gray"}
                                disabled={!roomName}
                                className="!absolute right-1 top-1 rounded"
                                onClick={handleSubmit}
                            >
                                Create
                            </Button>
                        </div>
                    </Card>
                </PopoverContent>
            </Popover>
            <List className="overflow-auto max-h-[370px] scrollbar-hide overflow-y-scroll">
                <ListItem key={0} onClick={moveTo}>
                    <ListItemPrefix>
                        <Avatar variant="circular" className="w-6 h-6" src="/img/ChatGPT.png" />
                    </ListItemPrefix>
                    <Typography variant="h6">ChatGPT</Typography>
                </ListItem>
                {rooms?rooms.map((room)=>{
                    return(
                        <ListItem key={room.id} className="justify-between" onClick={()=> {
                            setRoom(prevData => ({
                                ...prevData,
                                id: room.id
                            }));
                            moveTo()
                        }}>
                            <Typography variant="h6">{room.name}</Typography>
                            <Typography variant={"small"} className={"justify-end"}>{room.creator}</Typography>
                        </ListItem>
                    )
                }):<></>}
            </List>
        </div>

    )
}
export default ChatListComponent
