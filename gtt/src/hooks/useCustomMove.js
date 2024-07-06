import { useState} from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import {useRecoilState} from "recoil";
import {pageState} from "../atoms/pageState";

const getNum = (param,defaultValue) => {
    if(!param){
        return defaultValue
    }
    return parseInt(param)
}

const useCustomMove = () => {
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();
    const [refresh, setRefresh] = useState(false);
    const [page, setPage] = useRecoilState(pageState)
    const queryDefault = createSearchParams( {page:page.page, size:page.size }).toString();
    if(!page){
        return{moveToList: null, loadToList: null};
    }

    const moveToList = ({ pathName, pageParam = {} }) => {
        let queryStr = "";
        console.log(page)
        if (pageParam) {
            const pageNum = getNum(parseInt(pageParam.page), 1);
            const sizeNum = getNum(parseInt(pageParam.size), 10);
            setPage((page)=>({...page, page: pageNum, size: sizeNum}))
            setRefresh(!refresh)
            queryStr = createSearchParams({ page: pageNum, size: sizeNum }).toString();
        } else {
            queryStr = queryDefault;
        }
        navigate({ pathname: pathName, search: queryStr });

    };

    const moveToAdd = ({pathName}) => {
        navigate({pathname:pathName})
    }

    const moveToModify = ({ pathName, num }) => {
        navigate({
            pathname: `${pathName}/${num}`,
            search: queryDefault,
        });
    };

    const moveToRead = ({ pathName, num, totalPage }) => {
        console.log(page.page,page.size)
        console.log(num)
        setPage((page)=>({...page,currentPage:parseInt(num),totalPage:parseInt(totalPage)}))
        navigate({
            pathname: `${pathName}/${num}`,
            search: queryDefault,
        });
    };

    const loadToList =({pageParam :pageParam, pathName:pathName})=>{
        let queryStr = "";

        if (pageParam) {
            const pageNum = getNum(parseInt(pageParam.page), 1);
            const sizeNum = getNum(pageParam.size, 10);
            queryStr = createSearchParams({ page: pageNum, size: sizeNum }).toString();
        } else {
            queryStr = queryDefault;
        }
        navigate({ pathname: `.`, search: queryStr });
        return {pageParam,pathName}
    }
    return { moveToList, moveToModify, moveToRead, loadToList,moveToAdd, getNum ,refresh,setRefresh};
};

export default useCustomMove;
