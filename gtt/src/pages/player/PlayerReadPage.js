import React, {useCallback} from "react";
import {createSearchParams, useNavigate, useParams, useSearchParams} from "react-router-dom";
import ReadComponent from "../../components/player/PlayerReadComponents";
import useCustomMove from "../../hooks/useCustomMove";
import ContentHeader from "../../components/common/ContentHeader";
import {useRecoilValue} from "recoil";
import {pageState} from "../../atoms/pageState";

const PlayerReadPage = () => {
    const {pno}  = useParams()
    const { moveToModify,moveToList } = useCustomMove();


    return (
        <div className="font-extrabold w-full bg-white mt-6">

            <div className="text-2xl">
                Player Read
            </div>

            <ReadComponent pno={pno}></ReadComponent>
        </div>
    );
}

export default PlayerReadPage;