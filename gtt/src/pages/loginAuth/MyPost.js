import SidebarLayout from "../../layouts/SidebarLayout";
import React, {startTransition, useEffect, useState} from "react";
import {getList, getMyNews} from "../../api/newsApi";
import {getPlayerList} from "../../api/playerApi";
import {useRecoilState} from "recoil";
import {userState} from "../../atoms/userState";
import {tokenState} from "../../atoms/tokenState";
import {MyPostSectionCard} from "../../components/common/MyPostSectionCard";
import {getMyPost, getNoticeList} from "../../api/noticeApi"

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


const MyPost = () => {
    const [newsServerData, setNewsServerData] = useState(initState)
    const [myPostServerData, setMyPostServerData] = useState(initState)
    const [refresh,setRefresh] = useState(false)

    const [userInfo] = useRecoilState(userState)
    const [tokenInfo] = useRecoilState(tokenState)

    const userId = userInfo.nick
    useEffect(() => {
        if(newsServerData===initState) {
            getMyPost({page: 1, size: 5}, userId).then(data => {
                setMyPostServerData(data);
            })
            getMyNews({page: 1, size: 5}, userId).then(data => {
                setNewsServerData(data)
            })
        }
    },[refresh])

    return(
        <SidebarLayout>
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                My Post
            </h1>
                    <div className="container mx-auto mt-8 max-w-screen-md">
                        <div className="grid grid-rows-auto gap-10 justify-items-center">
                            <MyPostSectionCard
                                pathName="/myPage/notice/list"
                                serverData={myPostServerData}
                                sectionTitle={"My Notice"}
                            />
                            <MyPostSectionCard
                                pathName="/myPage/news/list"
                                serverData={newsServerData}
                                sectionTitle={"My News"}
                            />
                        </div>
                    </div>
        </SidebarLayout>
    )
}
export default MyPost;