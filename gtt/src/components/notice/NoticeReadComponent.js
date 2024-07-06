import React, {useEffect, useState} from "react";
import {getOne} from "../../api/noticeApi";
import useCustomMove from "../../hooks/useCustomMove";
import {Card} from "@material-tailwind/react";
import QuilEditorReadOnly from "../common/quill/QuillEditorReadOnly";
import ContentHeader from "../common/ContentHeader";
import useUtils from "../../hooks/utils";


const initStaste = {
    notiNo:0,
    title:'',
    writer:'',
    content:'',
    regDate:'null',
    modDate:'null',
    hits:0
}

const NoticeReadComponent = ({notiNo, page, size}) => {

    const [notice, setNotice] = useState(initStaste)
    const {parseDeltaOrString} = useUtils();
    //const queryStr = createSearchParams({page, size}).toString()
    //console.log(queryStr)
    //console.log(page, size)
    // 이동 관련 기능은 모두 useCustomMove() 사용
    const {moveToList, moveToModify} =useCustomMove()
    const [serverData, setServerData] = useState(notice);
    useEffect(()=>{
        getOne(notiNo).then(data => {
            setNotice(data)
        })
    }, [notiNo])

    return(

        <Card className="p-2 m-2 min-h-[25rem]">
            <ContentHeader pathName={"/notice/"} moveToModify={moveToModify} numValue={notiNo} serverData={serverData} page={page} moveTo={moveToList} text={"notice"} location={"read"} writer={notice.writer} />
            <div className="grid grid-cols-auto gap-4 grid-rows-auto flex items-stretch flex items-center flex flex-box mt-2 mb-2 ml-4 ">
                <div className="col-start-1 col-end-5 self-center">
                    <strong>{notice.title}</strong>
                </div>
                <div className="col-start-7 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd"
                              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                              clip-rule="evenodd"/>
                    </svg>{/*이미지가 없을 시 사용*/}
                    &nbsp;&nbsp;<small>{notice.writer}</small>
                </div>
                <div className="col-start-8 flex items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="w-5 h-5">
                        <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                        <path fill-rule="evenodd"
                              d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                              clip-rule="evenodd"/>
                    </svg>
                    &nbsp;&nbsp;<small>{notice.hits}</small>
                </div>
                <div className="col-start-9 col-end-9 self-center p-1">
                    <small>date : {notice.regDate}</small>
                </div>
            </div>
            <hr/>
                <div className="p-4">
                    <QuilEditorReadOnly value={parseDeltaOrString(notice.content)} />
                </div>
        </Card>

    )
}

export default NoticeReadComponent;