import {createSearchParams, Link, useLocation, useSearchParams} from "react-router-dom";
import {Avatar, Breadcrumbs, Button, Card, CardBody, CardFooter, Chip, Textarea,Typography} from "@material-tailwind/react";
import PageComponent from "../../components/common/PageComponent";
import {getComList} from "../../api/commentApi";
import useCustomMove from "../../hooks/useCustomMove";
import React, {useEffect, useRef, useState} from "react";
import CommentCell from "../../components/common/CommentCell";
import QuilEditorReadOnly from "../../components/common/quill/QuillEditorReadOnly";
import {useRecoilState} from "recoil";
import {pageState} from "../../atoms/pageState";

const initState = {
    dtoList:[],
    pageNumList:[],
    pageRequestDTO: null,
    prev:false,
    next:false,
    totalCount:0,
    prevPage:0,
    nextPage:0,
    totalPage:0,
    current:0
}


const BasicReadPage = ()=>{
    const {moveToList,loadToList} = useCustomMove()
    const [page,setPage] = useRecoilState(pageState)
    const [queryParams] = useSearchParams();
    const [refresh, setRefresh] = useState(false);
    const [comServerData, setComServerData] = useState(initState)
    const newsNo = useLocation().pathname.split("/")[3]
    const [isFirst,setIsFirst] =useState(false)
    const pathName = `${newsNo+"?"+queryParams}`
    const ReadQuillRef = useRef(null);
    const content = ""



    useEffect(() => {
        let pathName = isFirst===true?`${newsNo+"?" + createSearchParams({page:queryParams.get('page'),size:queryParams.get('size')}).toString()}` : `${newsNo}?page=1&size=10`; setIsFirst(true);
        getComList({pathName}).then(data => {
            setComServerData(data)
        })
        if(ReadQuillRef.current){
            const ReadQuillInstance = ReadQuillRef.current.getEditor();
            ReadQuillInstance.setContents(content)
        }
    }, [queryParams,refresh]);
    return(
        <section className="bg-white w-full h-full p-2 py-2">
            <div className="flex flex-box justify-between items-center">
                <Breadcrumbs fullWidth className="bg-white -z-10">
                    <Link to={'/'} className="opacity-60">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                        </svg>
                    </Link>
                    <Link to={'/news'} className="opacity-60">
                        <span>Components</span>
                    </Link>
                    <a href="#">Breadcrumbs</a>
                </Breadcrumbs>
                <div className="flex p-2">
                    <Button className="rounded-full" onClick={() => moveToList({
                        pathName: '/news/list',
                        pageParam: {page: `${page.page}`, size: `${page.size}`}
                    })}>List</Button>
                    <Button className="rounded-full">Modify</Button>
                </div>
            </div>
            <Card className="flex flex-auto p-1">
                <div className="grid gap-2 grid-cols-6 flex flex-col justify-between">
                    <Chip icon={
                        <Avatar
                            size="xs"
                            variant="circular"
                            className="h-full w-full -translate-x-0.5"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"/>
                    }
                          value={<Typography variant="small">Team Name</Typography>}
                    />
                    <div className="flex-box">
                        Title
                    </div>
                </div>
                <CardBody>
                    <Card className="p-2 m-2 w-full h-48">
                        <QuilEditorReadOnly ref={ReadQuillRef}/>
                    </Card>
                    <Card className="m-2">

                        <Textarea label="comment"></Textarea>
                        <div className="grid grid-cols-8 gap-3 p-2 items-center">
                            <Button>Add</Button>
                        </div>
                    </Card>
                </CardBody>
                <CardFooter>
                    <Card className="p-2">
                        {comServerData.dtoList.map((dto) => {
                            return (
                                <CommentCell comNo={dto.comNo} writer={dto.writer} content={dto.content}/>
                            )
                        })}
                        <PageComponent serverData={comServerData} movePage={loadToList} pathName={pathName}/>
                    </Card>
                </CardFooter>
            </Card>
        </section>
    );
}

export default BasicReadPage;
