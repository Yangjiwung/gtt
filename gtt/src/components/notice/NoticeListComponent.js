import useCustomMove from "../../hooks/useCustomMove";
import { useEffect, useState } from "react";
import { getNoticeList } from "../../api/noticeApi";
import PageComponent from "../common/PageComponent";
import { useRecoilState } from "recoil";
import { pageState } from "../../atoms/pageState";
import { useLocation } from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Typography
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {userState} from "../../atoms/userState";


const TABLE_HEAD = ["게시번호", "제목", "작성자", "작성일", "조회수"];

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
};

const ListComponent = () => {
    const { moveToList, refresh, moveToRead, moveToAdd, moveToModify } = useCustomMove();
    const pathName = useLocation().pathname;
    const [page, setPage] = useRecoilState(pageState);
    const [serverData, setServerData] = useState(initState);
    const [search, setSearch] = useState("");
    const [userInfo,setUserInfo] = useRecoilState(userState)

    useEffect(() => {
        getNoticeList({ page: page.page, size: page.size }).then(data => {
            console.log(data);
            setServerData(data);
        });
    }, [refresh]);

    const filteredData = serverData.dtoList.filter(notice =>
        notice.title.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Notice
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            공지사항 게시판입니다.
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        {userInfo.nick !== "Anonymous" ? (
                            <Button className="flex items-center gap-3" size="sm" onClick={() => moveToAdd({ pathName: '/notice/add' })}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                글작성
                            </Button>
                        ) : <></>
                        }
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map(notice =>
                        <tr key={notice.notiNo} className="p-4 border-b border-blue-gray-50" onClick={() => moveToRead({ pathName: '/notice/read', num: notice.notiNo, totalPage: serverData.totalCount })}>
                            <td>
                                <div className="flex items-center gap-3 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-bold"
                                    >
                                        {notice.notiNo}
                                    </Typography>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center gap-3 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {notice.title}
                                    </Typography>
                                </div>
                            </td>
                            <td >
                                <div className="flex items-center gap-3 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {notice.writer}
                                    </Typography>
                                </div>
                            </td>
                            <td >
                                <div className="flex items-center gap-3 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {notice.regDate}
                                    </Typography>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center gap-3 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {notice.hits}
                                    </Typography>
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div>
                    <PageComponent serverData={serverData} movePage={moveToList} pathName={pathName} />
                </div>
            </CardBody>

        </Card>
    );
};
export default ListComponent;
