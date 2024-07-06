import {Avatar, Card, Chip, Typography} from "@material-tailwind/react";
import QuilEditorReadOnly from "./quill/QuillEditorReadOnly";
import React from "react";

const ContentBody = ({ref,title,content,teamImg,teamName,date,viewCount,writer})=>{
    return (

        <Card className="p-2 m-2 min-h-[10rem]">
            <div className="grid grid-cols-auto gap-4 grid-rows-auto flex items-stretch flex items-center flex flex-box mt-2 mb-2 ml-2 ">
                <div className="col-start-1 col-end-2 p-1">
                    <Chip icon={
                        <Avatar
                            size="xs"
                            variant="circular"
                            className="h-full w-full -translate-x-0.5 "
                            src={teamImg} />
                    }
                          value={<Typography variant="small">{teamName}</Typography>}

                    />
                </div>
                <div className="col-start-2 col-end-5 self-center p-1">
                    <strong>{title}</strong>
                </div>
                <div className="col-start-7 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd"
                              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                              clip-rule="evenodd"/>
                    </svg>{/*이미지가 없을 시 사용*/}
                    &nbsp;&nbsp;<small>{writer}</small>
                </div>
                <div className="col-start-8 flex items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="w-5 h-5">
                        <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                        <path fill-rule="evenodd"
                              d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                              clip-rule="evenodd"/>
                    </svg>
                    &nbsp;&nbsp;<small>{viewCount}</small>
                </div>
                <div className="col-start-9 col-end-9 self-center p-1">
                    <small>date : {date}</small>
                </div>
            </div>
            <hr/>
            <div className="p-3">
                <QuilEditorReadOnly ref={ref} value={content} />
            </div>
        </Card>
    )
}

export default ContentBody;
