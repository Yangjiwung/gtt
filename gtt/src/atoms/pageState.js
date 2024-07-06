import {atom} from "recoil";
const initPageState = {
    page:1,
    size:10,
    keyword:'',
    type:'',
    currentPage:1,
    totalPage:1,
}

export const pageState = atom({
    key:'pageState',
    default:initPageState
})
