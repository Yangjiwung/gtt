import NoticeAddComponent from "../../components/notice/NoticeAddComponent";
import {useRecoilValue} from "recoil";
import {pageState} from "../../atoms/pageState";


const AddPage = () =>{

    const page = useRecoilValue(pageState);

    return(
    <div className="p-4 w-full bg-white">
        <NoticeAddComponent page={page}/>
    </div>
    );
}

export default AddPage;