import {createSearchParams, Link, useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import { Card, CardBody, CardFooter,} from "@material-tailwind/react";
import PageComponent from "../../components/common/PageComponent";
import {getComList, insertComment, modifyComment, removeComment} from "../../api/commentApi";
import useCustomMove from "../../hooks/useCustomMove";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {CommentCell} from "../../components/common/CommentCell";
import CommentInputCell from "../../components/common/CommentInputCell";
import ContentBody from "../../components/common/ContentBody";
import {useRecoilState, useRecoilValue} from "recoil";
import {pageState} from "../../atoms/pageState";
import {getOne} from "../../api/newsApi";
import ContentHeader from "../../components/common/ContentHeader";
import useUtils from "../../hooks/utils";
import {userState} from "../../atoms/userState";

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const newsDTO = {
    content:"",
    fileDTOList:[],
    files:[],
    hits:0,
    modDate:"",
    newsNo:35,
    recomNo:0,
    regDate:"",
    theTeam:"",
    title:"",
    writer:"",
}

const testTeam ={
    teamName:"Gen.G",
    teamImg:"/img/team/geng.png"
}

const ReadPage = () => {
    const {moveToList,loadToList,moveToModify} = useCustomMove()
    const [page,setPage] = useRecoilState(pageState)
    const [queryParams] = useSearchParams();
    const [refresh, setRefresh] = useState(false)
    const [serverData, setServerData] = useState(newsDTO)
    const [comServerData, setComServerData] = useState(initState)
    const newsNo = useLocation().pathname.split("/")[3]
    const [isFirst,setIsFirst] =useState(false)
    const pathName = `${newsNo+"?"+queryParams}`
    const ReadQuillRef = useRef(null);
    const {parseDeltaOrString} = useUtils();
    const content = ""
    const userInfo = useRecoilValue(userState)

    useEffect(() => {
        getOne(newsNo).then(data=>{
            setServerData(data)
        })
        let pathName = isFirst===true?`${newsNo+"?" + createSearchParams({page:queryParams.get('page'),size:queryParams.get('size')}).toString()}` : `${newsNo}?page=1&size=10`; setIsFirst(true);
        getComList({pathName}).then(data => {
            setComServerData(data)
        })
        if(ReadQuillRef.current){
            const ReadQuillInstance = ReadQuillRef.current.getEditor();
            ReadQuillInstance.setContents(content)
        }
    }, [queryParams,refresh]);

    return (
        <section className="bg-white w-full h-full p-2 py-2">
            <ContentHeader page={page} pathName={'/news/'} moveTo={moveToList} numValue={newsNo} moveToModify={ moveToModify } text={"news"} location={"read"} writer={serverData.writer}/>
            <Card className="flex flex-auto p-1">
                <CardBody>
                    <ContentBody
                        ref={ReadQuillRef}
                        teamName={testTeam.teamName}
                        teamImg={testTeam.teamImg}
                        title={serverData.title}
                        content={parseDeltaOrString(serverData.content)}
                        date={serverData.regDate}
                        viewCount={serverData.hits}
                        writer={serverData.writer}
                    />
                    {userInfo.nick !== "Anonymous" ? (
                        <Card className="m-2 row-start-3 mt-10">
                            <CommentInputCell refresh={refresh} setRefresh={()=>setRefresh(!refresh)} insertComment={insertComment}/>
                        </Card>
                    ) : <></>}
                </CardBody>
                <CardFooter>
                    {comServerData.dtoList.map((dto) => {
                        console.log(dto)
                        return (
                            <CommentCell key={dto.comNo} newsNo={newsNo} comno={dto.comNo} writer={dto.writer} content={dto.content} modDate={dto.modDate} recomNo={dto.recomNo} refresh={refresh} setRefresh={()=>setRefresh(!refresh)}
                                modifyComment={modifyComment} removeComment={removeComment}
                            />
                        )
                    })}
                    <PageComponent serverData={comServerData} movePage={loadToList} pathName={pathName}/>
                </CardFooter>
            </Card>
        </section>

    );
}

export default ReadPage;
