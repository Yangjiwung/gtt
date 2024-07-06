import {createSearchParams, useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import NoticeReadComponent from "../../components/notice/NoticeReadComponent";
import CommentInputCell from "../../components/common/CommentInputCell";
import {CommentCell} from "../../components/common/CommentCell";
import {getComList, getNoticeComments, insertComment, modifyComment, removeComment} from "../../api/commentApi";
import {useRecoilState, useRecoilValue} from "recoil";
import {pageState} from "../../atoms/pageState";
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

    const ReadPage =() =>{
        const notiNo = useLocation().pathname.split("/")[3]
        const [queryParams] = useSearchParams()
        const [page,setPage] = useRecoilState(pageState)
        const [refresh, setRefresh] = useState(false)
       /* const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
        const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10*/
        const [comServerData, setComServerData] = useState(initState)
        const [isFirst,setIsFirst] =useState(false)
        const userInfo = useRecoilValue(userState)


        useEffect(() => {
            let pathName = isFirst===true?`${notiNo+"?" + createSearchParams({page:queryParams.get('page'),size:queryParams.get('size')}).toString()}` : `${notiNo}?page=1&size=10`; setIsFirst(true);
            getNoticeComments({pathName}).then(data => {
                setComServerData(data)
                console.log("comServerData"+comServerData)
            })
        }, [queryParams, refresh])
        return(
            <div className=" w-full bg-white mt-6">
                <NoticeReadComponent notiNo={notiNo} page={page} size={page.size}></NoticeReadComponent>
                {userInfo.nick !== "Anonymous" ? (
                    <div className="p-0 m-2 mt-10">
                        <CommentInputCell refresh={refresh} setRefresh={setRefresh} insertComment={insertComment}/>
                    </div>
                ) : <></>}
                <div className="p-0 m-2 mt-10">
                    {comServerData.dtoList.map((dto) => {
                        console.log(dto)
                        return(
                            <CommentCell key={dto.comNo} notiNo={notiNo} comno={dto.comNo} writer={dto.writer} content={dto.content} modDate={dto.modDate} recomNo={dto.recomNo} refresh={refresh} setRefresh={()=>setRefresh(!refresh)}
                                modifyComment={modifyComment} removeComment={removeComment}
                            />
                        )
                    })}
                </div>
             </div>

        );
}
export default ReadPage;