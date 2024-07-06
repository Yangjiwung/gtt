import {useEffect,useState} from "react";
import {MagnifyingGlassIcon,ChevronUpDownIcon} from "@heroicons/react/24/outline";
import {Card,CardHeader,Input,Typography,Button,CardBody,Chip,CardFooter,Tabs,TabsHeader,Tab,Avatar,IconButton,Tooltip} from "@material-tailwind/react";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../../components/common/PageComponent";
import {getBoardList} from "../../api/boardApi";
import {useLocation, useSearchParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import {pageState} from "../../atoms/pageState";
import ListHeader from "../../components/news/list/ListHeader";
import ListTable from "../../components/news/list/ListBody";
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
const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Monitored",
        value: "monitored",
    },
    {
        label: "Unmonitored",
        value: "unmonitored",
    },
];
const TABLE_HEAD = ["Teams", "Title", "Writer", "hits", "Recommend", "RegDate"];

const ListPage = ()=>{
    const pathName = useLocation().pathname
    const [page,setPage] = useRecoilState(pageState)
    const {refresh,moveToList,moveToRead, moveToAdd} = useCustomMove()
    const [serverData, setServerData] = useState(initState)

    useEffect(() => {
        getBoardList({page:page.page,size:page.size}).then(data=>{
            setServerData(data)
            setPage((page)=>({...page,totalPage:data.totalCount}))
        })
    }, [refresh]);

    return(
        <Card className="h-full w-full">
            <ListHeader TABS={TABS} moveTo={moveToAdd} pathName={'/board/write'} path={"board"}/>
            <CardBody className="overflow-scroll px-0">
                <ListTable TABLE_HEAD={TABLE_HEAD} serverData={serverData} path={"board"} />
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <div className="w-full md:w-72">
                    <Input
                        label="Search"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" onClick={()=>{console.log("click")}} cursor='pointer' />}
                    />
                </div>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page {serverData.current} of {Math.ceil(serverData.totalCount/10)}
                </Typography>
                <div className="flex gap-2">
                    <PageComponent serverData={serverData} movePage={moveToList} pathName={`${pathName}`}/>
                </div>
            </CardFooter>
        </Card>
    )
}

export default ListPage;
