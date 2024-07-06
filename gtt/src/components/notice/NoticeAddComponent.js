import React, {useRef, useState} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Input, Typography} from "@material-tailwind/react";
import {postAdd} from "../../api/noticeApi";
import useCustomMove from "../../hooks/useCustomMove";
import {DialogResult} from "../common/DialogResult";
import ContentHeader from "../common/ContentHeader";
import QuilEditor from "../common/quill/QuilEditor";
import {useRecoilValue} from "recoil";
import {userState} from "../../atoms/userState";

const NoticeAddComponent = ({page}) =>{
    const quillEditorRef = useRef()
    const userInfo = useRecoilValue(userState)
    // 초기활를 담당
    const initState = {
        title:'',
        writer:userInfo.nick,
        content:'',
        regDate:''
    }
    const [notice, setNotice] = useState(initState)
    const [title,setTitle] = useState(notice.title?notice.title:"")
    const [writer, setWriter] =useState(notice.writer?notice.writer:"")
    const [serverData, setServerData] = useState(initState)
    const [content,setContent] = useState("");

    // 결과데이터가 있는 경우 modal을 보여준다.
    const [result, setResult] = useState(null) // 결과상태

    const handleChangeNotice = (e)=> {
        const { name, value } = e.target;
        setNotice(prevNotice => ({
            ...prevNotice,
            [name]: value
        }));
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const handleClickAdd = () => {
        //console.log(notice)
        postAdd(notice).then(result => {
            //초기화
            setNotice(initState)
            setResult(result.notiNo)
        }).catch(e => {
            console.error(e)
        })
    }
    // 모달을 닫으면 원래 있던 리스트로 페이지 정보를 가지고 리턴
    const {moveToList} = useCustomMove()
    const closeDialog = () =>{
        setResult(null)
        moveToList({pathName:'/notice/list', pageParam:{page:page.page, size:page.size}})
    }
    const handleQuillChange = (e)=>{
        const QuillInstance = quillEditorRef.current.getEditor();
        const val = QuillInstance.getContents();
        console.log(val)
        setContent(val)
        setNotice(prevNotice => ({
            ...prevNotice,
            ["content"]: JSON.stringify(val)
        }))
    }

    return(
        <div className="m-2 p-4">
            <ContentHeader pathName={"/notice/"} serverData={serverData} page={page} moveTo={moveToList} text={"notice"} location={"add"} />
            <Card className="p-2 m-2 min-h-[10rem]">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Notice
                            </Typography>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <form>
                        <div className="grid grid-cols-auto gap-4 grid-rows-auto flex items-stretch flex items-center flex flex-box mt-2 mb-2 ml-2 ">
                            <div className="col-start-1 col-end-3 p-1">
                                <Input label="제목" name="title" onChange={handleChangeNotice} />
                            </div>
                            <div className="col-start-3 p-1">
                                <div className="w-full">
                                    <Input label="작성자" value={userInfo.nick} readOnly={true} />
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="p-3">
                            <QuilEditor ref={quillEditorRef} onChange={handleQuillChange} value={content}/>
                        </div>
                        <div className="p-3 justify-self-end flex justify-center">

                        </div>
                    </form>
                </CardBody>
                <CardFooter>
                    <Button onClick={handleClickAdd}>ADD</Button>
                    {result ?<DialogResult
                        title={'공지사항'}
                        content={`새로운 게시물${result} 번 게시물이 추가되었습니다.`}
                        callbackFn={closeDialog}
                        open={result !== null}
                        setOpen={setOpen}
                    />: <></> }
                </CardFooter>
            </Card>
        </div>
    )
}
export default NoticeAddComponent;