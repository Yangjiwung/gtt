import React, {forwardRef, useEffect, useRef, useState} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Input, Typography} from "@material-tailwind/react";
import {deleteOne, getOne, putOne} from "../../api/noticeApi";

import useCustomMove from "../../hooks/useCustomMove";
import {DialogResult} from "../common/DialogResult";
import QuilEditor from "../common/quill/QuilEditor";
import ContentHeader from "../common/ContentHeader";
import {Delta} from "quill/core";

const intiState = {
    notiNo: 0,
    title:'',
    content:'',
    writer:''
}

const initState = {
    dtoList:[],
    pageNumList:[],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const NoticeModifyComponent = forwardRef(({notiNo, page}) => {
    const quillEditorRef = useRef()
    //console.log(notiNo + "번 게시물 수정")
    const [notice, setNotice] = useState({...intiState})
    const [result, setResult] = useState(null)
    const {moveToList, moveToRead} = useCustomMove()
    const [serverData, setServerData] = useState(initState)
    const [content,setContent] = useState("");

    useEffect(() => {
        getOne(notiNo).then(data => {
            console.log(data)
            setNotice(prevNotice=>({...prevNotice,title:data.title,content:data.content,writer:data.writer,notiNo:data.notiNo}))
            const QuillInstance = quillEditorRef.current.getEditor();
            QuillInstance.setContents(data.content !== "" ? JSON.parse(data.content, new Delta()) : new Delta());
        })

    }, [page])
    console.log(notice)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const handleClickModify = () => { // 수정버튼 클릭시
        const modifiedNotice = { ...notice };
        delete modifiedNotice.regDate;
        delete modifiedNotice.modDate;
        delete modifiedNotice.writer;

        putOne(modifiedNotice).then(data => {
            console.log("modify result : " + data)
            setResult("SUCCESS")
        }).catch(error => {
            console.log(error)
            setResult("FAIL")
        })
    }
    const handleClickDelete = () => {
        console.log(notiNo + "번 게시물 삭제 ")
        deleteOne(notiNo).then(data => {
            console.log("delete result : " + data)
            setResult("DELETE SUCCESS")

        }).catch(error => {
            console.log(error)
            setResult("FAIL")
        })
    }
// 모달을 닫으면 원래 있던 리스트로 페이지 정보를 가지고 리턴
    const closeDialog = () =>{
        setResult(null)
        moveToList({pathName:'/notice/list', pageParam:{page:page.page, size:page.size}})
    }


    // 모달 창 닫은 후 동작
    const closeModal = () => {
        if (result === 'DELETE SUCCESS') {
            moveToList({ pathName: '/notice/list', pageParam: { page: `${page.page}`, size: `${page.size}` } })
        } else {
            moveToRead({ pathName: '/notice/read', num: notiNo, totalPage: serverData.totalCount })
        }
    }



    const handleChangeNotice = (e) => {
        const { name, value } = e.target;
        setNotice(prevNotice => ({
            ...prevNotice,
            [name]: value
        }));
    };
    const handleQuillChange = ()=>{
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
            <ContentHeader pathName={"/notice/"} serverData={serverData} page={page} moveTo={moveToList} text={"notice"} location={"modify"}/>
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
                            <Input label="제목" name="title" onChange={handleChangeNotice} value={notice.title} />
                        </div>
                        <div className="col-start-3 p-1">
                            <div className="w-full">
                                <Input label="작성자" value={notice.writer} />
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
                    <div className="flex justify-end p-4 space-x-4">
                        <Button Button size="sm" color="red" className="rounded-md" onClick={handleClickDelete}>
                            {result ?<DialogResult
                                title={'공지사항'}
                                content={`${result}`}
                                callbackFn={closeDialog}
                                open={result !== null}
                                setOpen={setOpen}
                            />: <></> }삭제
                        </Button>
                        <Button Button size="sm" color="blue" className="rounded-md" onClick={handleClickModify}>
                            {result ?<DialogResult
                                title={'공지사항'}
                                content={`${result}`}
                                callbackFn={closeDialog}
                                open={result !== null}
                                setOpen={setOpen}
                            />: <></> }수정</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
})
export default NoticeModifyComponent;