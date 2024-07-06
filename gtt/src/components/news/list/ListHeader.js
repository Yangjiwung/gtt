import {Button, CardHeader, Typography} from "@material-tailwind/react";
import {useRecoilState} from "recoil";
import {userState} from "../../../atoms/userState";


const ListHeader = ({TABS,moveTo,pathName, path})=>{
    // 페이지 이름 추출 및 첫 글자 대문자로 변환
    let pageName = pathName.split('/')[1].charAt(0).toUpperCase() + pathName.split('/')[1].slice(1);
    const [userInfo,setUserInfo] = useRecoilState(userState)

    // 페이지 이름이 "free"인 경우 "Board" 추가
    if (pageName === "Free") {
        pageName += "Board";
    }
    return(
        <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        {path} list
                    </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <Button variant="outlined" size="sm">
                        view all
                    </Button>
                    {pageName === "FreeBoard" ? ( // 자유게시판은 로그인을 하지 않아도 글쓰기 버튼이 보임
                        <Button className="flex items-center gap-3" size="sm" onClick={()=>{moveTo({pathName:pathName})}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            Add {pageName}
                        </Button>
                    ) : ( // 회원게시판, 뉴스게시판
                        <div>
                        {userInfo.nick !== "Anonymous" ? ( // 로그인이 되어있을 경우 글쓰기 버튼이 보임
                            <Button className="flex items-center gap-3" size="sm" onClick={()=>{moveTo({pathName:pathName})}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                Add {pageName}
                            </Button>
                            ) : <></>
                        }
                        </div>
                    )
                    }
                </div>
            </div>
            {/*<div className="flex flex-col items-center justify-end gap-4 md:flex-row">*/}
            {/*    <div className="flex flex-cols-2">*/}
            {/*        <DatePicker name="regDate"/>*/}
            {/*        <DatePicker name="modDate"/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </CardHeader>
    )
}

export default ListHeader;
