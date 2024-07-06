import {useLocation, useSearchParams} from "react-router-dom";
import ListComponent from "../../components/notice/NoticeListComponent";


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

const ListPage = () => {

    const [queryparams] = useSearchParams()


    // 초기값 - list?page=1&size=10 parsInt로 인트형으로 변환
    const page = queryparams.get("page") ? parseInt(queryparams.get("page")) : 1
    const size = queryparams.get("size") ? parseInt(queryparams.get("size")) : 10

    return(

           <div className="p-4 w-full bg-white">
               <ListComponent/>
           </div>
    )
}
export default ListPage;