import ContentHeader from "../../components/common/ContentHeader";
import { Card, CardBody } from "@material-tailwind/react";
import React, {forwardRef, useEffect, useRef, useState} from "react";
import ContentInputBody from "../../components/common/ContentInputBody";
import { useRecoilValue } from "recoil";
import useCustomMove from "../../hooks/useCustomMove";
import { pageState } from "../../atoms/pageState";
import { getOne,insertNews,modifyNews } from "../../api/newsApi";
import {useLocation} from "react-router-dom";
import useUtils from "../../hooks/utils";

const testTeam = {
    teamName: "Gen.G",
    teamImg: "/img/team/geng.png",
};

const newsDTO = {
    content:"",
    fileDTOList:[],
    files:[],
    hits:0,
    modDate:"",
    newsNo:35,
    recomNo:0,
    regDate:"",
    theTeam:"",
    title:"",
    writer:"",
}

const ModifyPage = forwardRef(() => {
    const page = useRecoilValue(pageState);
    const { moveToModify,moveToList } = useCustomMove(); // useCustomMove 훅 사용
    const [serverData, setServerData] = useState(newsDTO);
    const {refresh, setRefresh} = useCustomMove();
    const newsNo = useLocation().pathname.split("/")[3]
    const ReadQuillRef = useRef(null);
    const [content,setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getOne(newsNo).then(data=>{
            setServerData(data)
            setContent(data.content)
            setTitle(data.title)
            console.log(data,serverData,content)
        })
        if(ReadQuillRef.current){
            const ReadQuillInstance = ReadQuillRef.current.getEditor();
            ReadQuillInstance.setContents(content)
        }
    }, [refresh]);

    return (
        <section className="bg-white w-full h-full p-2 py-2">
            <ContentHeader pathName={"/news/"} moveToModify={moveToModify} serverData={serverData} page={page} moveTo={moveToList} text={"news"} location={"modify"}/>
            <Card className="flex flex-auto p-1">
                <CardBody>
                    <ContentInputBody
                        ref={ReadQuillRef}
                        teamName={testTeam.teamName}
                        teamImg={testTeam.teamImg}
                        date={serverData.regDate}
                        serverData={serverData}
                        insert={insertNews}
                        modify={modifyNews}
                        pathName={"news"}
                    />
                </CardBody>
            </Card>
        </section>
    );
});
export default ModifyPage;
