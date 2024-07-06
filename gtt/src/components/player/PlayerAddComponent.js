import React, {useRef, useState} from "react";
import FetchingModal from "../common/FetchingModal"
import ResultModal from "../common/ResultModal"
import useCustomMove from "../../hooks/useCustomMove";
import {createSearchParams, useLocation, useSearchParams} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {pageState} from "../../atoms/pageState";
import ContentHeader from "../common/ContentHeader";
import PlayerButtons from "./list/PlayerButtons";
import {Card, Input} from "@material-tailwind/react";
import {DropDownInput} from "../common/DropDownInput";
import {DialogResult} from "../common/DialogResult";

const initState = {
    age : 0,
    nickName : '',
    realName : '',
    teamName : '',
    position : '',
    birthDate : null
}

const PlayerAddComponent = () => {
    const [player, setPlayer] = useState({...initState})
    const [fetching, setFetching] = useState(false)
    const [result, setResult] = useState(null)
    const imageDiv = useRef();

    const page = useRecoilValue(pageState)
    const {moveToList, moveToRead} = useCustomMove();

    const path = useLocation().pathname.split("/")[2];
    const buttonRef = useRef()
    const inputRef = useRef()
    const [selectedTeam, setSelectedTeam] = useState('');

    const [queryParams] = useSearchParams()
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10
    const queryStr = createSearchParams({page, size}).toString()

    const handleChangePlayer = (e) => {
        player[e.target.name] = e.target.value
        setPlayer({...player})
        console.log(player.playerImage)
        // setPlayer(prev => ({ ...prev, playerImage: e.target.value }));
    }

    const closeModal = () => {
        setResult(null)
        moveToList({page:1})
    }

    const handleDropDownChange = (e) => {
        if(buttonRef.current){
            const buttonInstance = buttonRef.current
            setPlayer((prevData)=>({...prevData,teamName: buttonInstance.innerText}))
            console.log(selectedTeam)
        }
        console.log(e.target.value)
        setPlayer((prevData)=>({...prevData,nickName: e.target.value}))
    };
    const handleResult = (data) => {
        setResult(data);
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const closeDialog = () =>{
        setResult(null)
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {fetching ? <FetchingModal/> : <></>}

            {/* ResultModal 안됨 */}
            {result ?
                <ResultModal title={'Player Add Result'} content={`${result}번 등록 완료`} callbackFn={closeModal}/> : <></>}

            <ContentHeader page={page} pathName={'/player/'} moveTo={moveToList}/>

             <Card className="p-2 m-2 min-h-[10rem]">
                <form>
                    <div className="grid grid-cols-auto gap-4 grid-rows-auto flex items-stretch flex items-center flex flex-box mt-2 mb-2 ml-2 ">
                        <div className="col-start-1 p-1">
                            <DropDownInput name="nickName" buttonRef={buttonRef} inputRef={inputRef} onChange={handleDropDownChange} value={player.nickName}/>
                        </div>
                        <div className="col-start-2 p-1">
                            <div className="w-full">
                                <Input label="이름" placeholder="name" name="name" defaultValue={player.name} type="text" onClick={handleChangePlayer} />
                            </div>
                        </div>
                        <div className="col-start-3 p-1">
                            <div className="w-full">
                                <Input label="이름" placeholder="nameFull" name="nameFull" defaultValue={player.nameFull} type="text" onClick={handleChangePlayer} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-3 w-100">
                        <div className="ml-4">
                            <Input label="나이" name="age" type={'number'} value={player.age} onChange={handleChangePlayer} min={0}></Input>
                        </div>
                        <div className="ml-4">
                            <Input label="출생일" name="birthdate" type={'date'} value={player.birthdate} onChange={handleChangePlayer}></Input>
                        </div>
                        <div className="ml-4">
                            <Input label="포지션" name="roles" value={player.roles} onChange={handleChangePlayer}/>
                        </div>
                    </div>
                    <div className="flex justify-around items-center p-3 w-100">
                        <div className="ml-4">
                            <Input label="지역" name="country" value={player.country} onChange={handleChangePlayer}/>
                        </div>
                        <div className="ml-4">
                            <Input label="선호 챔피언" name="favChamps" value={player.favChamps} onChange={handleChangePlayer}/>
                        </div>
                    </div>
                </form>
             </Card>
            {/*<div className="flex justify-center">*/}
            {/*    <div className="relative mb-4 flex w-full flex-wrap items-stretch">*/}
            {/*    <div className="w-1/5 p-6 text-right font-bold">PlayerImage</div>*/}
            {/*        <td>*/}
            {/*            <DropFiles value={player.playerImage} name="playerImage" imageDiv={imageDiv}/>*/}
            {/*        </td>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="flex justify-end">
                <div className="relative md-4 flex p-4 flex-wrap items-stretch">
                    <PlayerButtons page={page} pathName={'/player/'} moveTo={moveToList} pno={player.id}
                                   player={player} moveToRead={moveToRead} imageDiv={imageDiv} setResultCallback={handleResult}/>
                </div>
                {result ?<DialogResult
                    title={'플레이어'}
                    content={`${result}`}
                    callbackFn={closeDialog}
                    open={result}
                    setOpen={setOpen}
                />: <></> }
            </div>
        </div>
    )
}

export default PlayerAddComponent