import React, {memo, useEffect, useRef, useState} from "react";
import {Button, Card, Input} from "@material-tailwind/react";
import QuilEditor from "./quill/QuilEditor";
import {DropDownInput} from "./DropDownInput";
import {Delta} from "quill/core";
import useCustomMove from "../../hooks/useCustomMove";
import {useRecoilState, useRecoilValue} from "recoil";
import {pageState} from "../../atoms/pageState";
import {useLocation, useNavigate} from "react-router-dom";
import {userState} from "../../atoms/userState";
import {removeNews} from "../../api/newsApi";
import {removeBoard} from "../../api/boardApi";
import {removeFreeBoard} from "../../api/freeBoardApi";
import {DialogResult} from "./DialogResult";

const ContentInputBody = memo(({ serverData, insert, modify, pathName, remove }) => {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const navigate = useNavigate();
    const path = useLocation().pathname.split("/")[2];
    const { moveToList, moveToRead } = useCustomMove();
    const page = useRecoilValue(pageState);
    const quillEditorRef = useRef();
    const buttonRef = useRef();
    const inputRef = useRef();
    const [result, setResult] = useState(null);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState(userInfo[0] && userInfo[0].nick !== undefined ? userInfo[0].nick : "Anonymous");
    const [num, setNum] = useState(0);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [content, setContent] = useState("");
    const [stringContent, setStringContent] = useState({});

    useEffect(() => {
        if (serverData !== undefined && serverData.content !== "") {
            setContent(serverData.content);
            setTitle(serverData.title);
            setWriter(serverData.writer);
            if (pathName === "news") {
                setNum(serverData.newsNo);
            } else if (pathName === "free") {
                setNum(serverData.fno);
            } else if (pathName === "board") {
                setNum(serverData.bno);
            }
            const QuillInstance = quillEditorRef.current.getEditor();
            QuillInstance.setContents(serverData.content !== "" ? JSON.parse(serverData.content, new Delta()) : new Delta());
        }
    }, [serverData, userInfo]);

    const handleSave = () => {
        if (buttonRef.current) {
            const buttonInstance = buttonRef.current;
            setSelectedTeam(buttonInstance.innerText);
        }
        insert(title,stringContent,selectedTeam,writer).then(message => {
            if (pathName==="news"){
                alert(message.newsNo + "번 등록 완료")
            } else if (pathName === "free"){
                alert(message.fno + "번 등록 완료")
            } else if (pathName ==="board"){
                alert(message.bno + "번 등록 완료")
            }
            moveToList({pathName: `/${pathName}/list`,pageState:{ page:page.page, size : page.size}})
        })
    };

    const handleModify = () => {
        if (buttonRef.current) {
            const buttonInstance = buttonRef.current;
            setSelectedTeam(buttonInstance.innerText);
        }
        modify(title, stringContent, selectedTeam, writer, num).then(message => {
            setOpen(true);
            setResult(`${pathName}게시판 게시물이 수정되었습니다.`);
        });
    };

    const handleRemove = () => {
        switch (pathName) {
            case "news":
                deleteToNews();
                break;
            case "board":
                deleteToBoard();
                break;
            case "free":
                deleteToFreeBoard();
                break;
            default:
                alert("잘못된 경로입니다.");
        }
    };

    const deleteToNews = () => {
        removeNews(num).then(response => {
            setOpen(true);
            setResult("뉴스게시판 게시물이 삭제되었습니다.");
        }).catch(error => {
            console.error("삭제 API 호출 실패 :", error);
        });
    };

    const deleteToBoard = () => {
        removeBoard(num).then(response => {
            setOpen(true);
            setResult("일반게시판 게시물이 삭제되었습니다.");
        }).catch(error => {
            console.error("삭제 API 호출 실패 :", error);
        });
    };

    const deleteToFreeBoard = () => {
        removeFreeBoard(num).then(response => {
            setOpen(true);
            setResult("자유게시판 게시물이 삭제되었습니다.");
        }).catch(error => {
            console.error("삭제 API 호출 실패 :", error);
        });
    };

    const closeDialog = () => {
        setOpen(false);
        moveToList({ pathName: `/${pathName}/list`, pageState: { page: page.page, size: page.size } });
    };

    const handleDropDownChange = (e) => {
        if (buttonRef.current) {
            const buttonInstance = buttonRef.current;
            setSelectedTeam(buttonInstance.innerText);
        }
        setTitle(e.target.value);
    };

    const handleQuillChange = (e) => {
        const QuillInstance = quillEditorRef.current.getEditor();
        const val = QuillInstance.getContents();
        setContent(val);
        setStringContent(JSON.stringify(val));
    };

    return (
        <Card className="p-2 m-2 min-h-[10rem]">
            <form>
                <div className="grid grid-cols-auto gap-4 grid-rows-auto flex items-stretch flex items-center flex flex-box mt-2 mb-2 ml-2 ">
                    <div className="col-start-1 col-end-3 p-1">
                        <DropDownInput placeholder="title" buttonRef={buttonRef} inputRef={inputRef} onChange={handleDropDownChange} title={title}/>
                    </div>
                    <div className="col-start-3 p-1">
                        <div className="w-full">
                            <Input label="Username" readOnly={true} value={writer} />
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="p-3">
                    <QuilEditor ref={quillEditorRef} onChange={handleQuillChange} value={content}/>
                </div>
                <div className="p-3 justify-self-end flex justify-center">
                    {path === "write" ?
                        <Button onClick={handleSave} className="mr-5">
                            {result ? <DialogResult
                                title={'등록완료'}
                                content={`${result}`}
                                callbackFn={closeDialog}
                                open={result !== null}
                                setOpen={setOpen}
                            /> : <>등록</>}
                        </Button> :
                        <Button onClick={handleModify}>
                            {result ? <DialogResult
                                title={'수정완료'}
                                content={`${result}`}
                                callbackFn={closeDialog}
                                open={result !== null}
                                setOpen={setOpen}
                            /> : <>Modify</>}
                        </Button>
                    }
                    {path === "write" ? null :
                        <Button onClick={handleRemove} color={"red"}>
                            {result ? <DialogResult
                                title={'삭제완료'}
                                content={`${result}`}
                                callbackFn={closeDialog}
                                open={result !== null}
                                setOpen={setOpen}
                            /> : <>Remove</>}
                        </Button>
                    }
                </div>
            </form>
        </Card>
    );
});

export default ContentInputBody;
