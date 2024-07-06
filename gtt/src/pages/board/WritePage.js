import ContentHeader from "../../components/common/ContentHeader";
import {Card, CardBody} from "@material-tailwind/react";
import React, {forwardRef} from "react";
import ContentInputBody from "../../components/common/ContentInputBody";
import {useRecoilValue} from "recoil";
import useCustomMove from "../../hooks/useCustomMove";
import {pageState} from "../../atoms/pageState";
import {insertBoard,modifyBoard} from "../../api/boardApi";


const WritePage =forwardRef(()=>{
    const page = useRecoilValue(pageState)
    const {moveToList} = useCustomMove();

    return (
        <section className="bg-white w-full h-full p-2 py-2">
            <ContentHeader page={page} pathName={'/board/'} moveTo={moveToList} text={"board"} location={"write"}/>
            <Card className="flex flex-auto p-1">
                <CardBody>
                    <ContentInputBody insert={insertBoard} modify={modifyBoard} pathName={"board"}/>
                </CardBody>
            </Card>
        </section>
    )
})
export default WritePage;
