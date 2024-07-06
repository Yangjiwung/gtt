import {Button, Tooltip, Typography} from "@material-tailwind/react";
import useCustomMove from "../../hooks/useCustomMove";
import {startTransition, useEffect, useState} from "react";
import {deleteOne} from "../../api/noticeApi";

const MyPostCardList = ({pathName, serverData,page,size}) =>{
    const {moveToRead, moveToModify} = useCustomMove()
    const dtoList = Array.isArray(serverData.dtoList)?serverData.dtoList:[]
    const [refresh,setRefresh] = useState(false)

    useEffect(() => {
        if (refresh) {
            setRefresh(false); // 페이지 새로고침 후 refresh 상태를 다시 false로 변경
        }
    }, [refresh]);
    const handleClickDelete = async (notiNo) => {
        try {
            await deleteOne(notiNo);
            console.log("삭제되었습니다.");
            setRefresh(true)
        } catch (error) {
            console.error("에러 발생:", error);
        }
    };

    return (
        <tbody>
        {dtoList.map( (dto,index) => {
            const isLast = index === serverData.dtoList.length - 1;
            const classes = isLast ? "p-2 w-1/6" : "p-2 border-b border-blue-gray-50";

            return (
                <tr key={dto.newsNo || dto.notiNo || dto.pno} onClick={() => {
                    startTransition(() => {  // startTransition으로 중단되는 업데이트를 처리
                        if (dto.notiNo) {
                            moveToRead({ pathName: "/notice/read", num: dto.notiNo, totalPage: serverData.totalCount })
                        } else if (dto.newsNo){
                            moveToRead({ pathName: "/news/read", num: dto.newsNo, totalPage: serverData.totalCount })
                        }
                    })
                }}>
                    <td className="p-2 w-3/6  border-b border-blue-gray-50">
                        <Typography variant="small" color="blue-gray" className="font-normal">{dto.title.length > 10 ? `${dto.title.substring(0, 15)}...` : dto.title}</Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">{dto.writer}</Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">{dto.hits}</Typography>
                    </td>
                    <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {dto.regDate /*.format("yyyy-MM-dd")*/}
                        </Typography>
                    </td>
                    {dtoList.length > 0 && (
                        <td className="flex justify-end">
                            <Tooltip content="수정">
                                <Button className="rounded-md" size="sm" color="blue" variant="text"  onClick={(e) => {
                                    e.stopPropagation();
                                    if (dto.notiNo) {
                                        moveToModify({ pathName: "/notice/modify", num:dto.notiNo })
                                    } else if (dto.newsNo) {
                                        moveToModify({ pathName: "/news/modify", num:dto.newsNo })
                                    }
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M15 4.5A3.5 3.5 0 0 1 11.435 8c-.99-.019-2.093.132-2.7.913l-4.13 5.31a2.015 2.015 0 1 1-2.827-2.828l5.309-4.13c.78-.607.932-1.71.914-2.7L8 4.5a3.5 3.5 0 0 1 4.477-3.362c.325.094.39.497.15.736L10.6 3.902a.48.48 0 0 0-.033.653c.271.314.565.608.879.879a.48.48 0 0 0 .653-.033l2.027-2.027c.239-.24.642-.175.736.15.09.31.138.637.138.976ZM3.75 13a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" clipRule="evenodd" />
                                        <path d="M11.5 9.5c.313 0 .62-.029.917-.084l1.962 1.962a2.121 2.121 0 0 1-3 3l-2.81-2.81 1.35-1.734c.05-.064.158-.158.426-.233.278-.078.639-.11 1.062-.102l.093.001ZM5 4l1.446 1.445a2.256 2.256 0 0 1-.047.21c-.075.268-.169.377-.233.427l-.61.474L4 5H2.655a.25.25 0 0 1-.224-.139l-1.35-2.7a.25.25 0 0 1 .047-.289l.745-.745a.25.25 0 0 1 .289-.047l2.7 1.35A.25.25 0 0 1 5 2.654V4Z" />
                                    </svg>
                                </Button>
                            </Tooltip>
                            <Tooltip content="삭제">
                                <Button
                                    className="rounded-md"
                                    size="sm"
                                    color="red"
                                    variant="text"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClickDelete(dto.notiNo); // dto.notiNo 전달
                                    }}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                        <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3Z" />
                                        <path fillRule="evenodd" d="M13 6H3v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6ZM5.72 7.47a.75.75 0 0 1 1.06 0L8 8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06L9.06 9.75l1.22 1.22a.75.75 0 1 1-1.06 1.06L8 10.81l-1.22 1.22a.75.75 0 0 1-1.06-1.06l1.22-1.22-1.22-1.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                </Button>
                            </Tooltip>
                        </td>
                    )}
                </tr>
            );

        })}
        </tbody>
    )
}

export default MyPostCardList
