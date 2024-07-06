import {Avatar, Button, Card, CardBody, CardFooter, CardHeader, Textarea, Typography,} from "@material-tailwind/react";
import {useState} from "react";
import {useRecoilValue} from "recoil";
import {userState} from "../../atoms/userState";


export const CommentCell=({comno,writer, position, content, newsNo, notiNo, modDate, recomNo,refresh,setRefresh,modifyComment, removeComment}) => {
    const [isModify,setIsModify] =useState(true)
    const [comment,setComment] = useState(content)
    const userInfo = useRecoilValue(userState)

    const toggleRecommend = () => {


    };
    const handleChange=(e)=>{
        setComment(e.target.value)
    }
    const handleModify=()=>{
        setIsModify(!isModify)
    }
    const handleDelete=()=>{
        if(window.confirm("삭제하시겠습니까?")) {
            removeComment(comno).then(result => {
                alert(result.result)
                setRefresh(!refresh)
            })
        }
    }
    const handleConfirm =()=>{
        modifyComment({comNo:comno,content:comment,writer:writer, newsNo:newsNo,notiNo:notiNo, recomNo:recomNo}).then((message)=>{alert(message.result); console.log(comno); setIsModify(!isModify)})
    }
    return (
        <Card comNo={comno} color="transparent" shadow={true} className="w-full mb-3">
            <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 flex items-center gap-4 pt-3 pb-0 pl-4 pr-4 "
            >
                <Avatar
                    size="md"
                    variant="circular"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    alt="tania andrew"
                />
                <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                        <Typography variant="h5" color="blue-gray">
                            {writer}
                        </Typography>
                        <div className="5 flex items-center gap-0 mr-3">
                            {/* 본인일 경우 보이는 수정, 삭제 버튼 */}
                            {userInfo.nick === writer ? (
                                <div>
                                    <Button size="sm" color="blue" variant="text" className="rounded-md" onClick={handleModify} disabled={!isModify}>
                                        modify
                                    </Button>
                                {isModify?<Button size="sm" color="red" variant="text" className="rounded-md"
                                                  onClick={handleDelete}>delete</Button>:<Button size="sm" color="red" variant="text" className="rounded-md"
                                                                                                 onClick={handleConfirm}>Confirm</Button>
                                }

                                </div>
                            ) : <></>}
                            <Button size="sm" color="red" variant="text" className="rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 recommend">
                                    <path
                                        d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                                </svg>
                            </Button>
                            <Typography color="blue-gray">
                                {recomNo}
                            </Typography>
                        </div>
                    </div>
                    <Typography color="blue-gray"><small>{position}position</small></Typography>
                </div>
            </CardHeader>
            <CardBody className="mb-2 pt-4">
                {isModify?<Typography>{comment}</Typography>:<Textarea value={comment} placeholder={"comment"} label={"comment"} onChange={handleChange}/>}
            </CardBody>
            <CardFooter className="p-1 flex justify-end">
                <div className="pr-6 pb-3">
                    <small>작성일 : {modDate}</small>
                </div>
            </CardFooter>
        </Card>
    );
}
