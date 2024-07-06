import React, {useCallback, useEffect, useState} from "react";
// import {getOnePlayer} from "../../api/playerApi";
import {getOnePlayer} from "../../api/ServerPlayerApi";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import PlayerButtons from "./list/PlayerButtons";

const initState = {
    id : 0,
    age : 0,
    nickName : '',
    name : '',
    nameFull : '',
    country : '',
    roles : '',
    birthdate : null,
    favChamps : []
    // gpa : 0.0
}

const PlayerModifyComponent = ({pno}) => {
    const [player, setPlayer] = useState(initState)

    const navigate = useNavigate()
    const [queryParams] = useSearchParams()
    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10
    const queryStr = createSearchParams({page, size}).toString()

    const moveToList = useCallback(() => {
        navigate({pathname:'/player/list', search:queryStr})
    },[page, size])

    useEffect(() => {

        getOnePlayer(pno).then(data => {
            setPlayer(data)
        })
    }, [pno])

    const handleChangePlayer = (e) => {
        player[e.target.name] = e.target.value
        setPlayer({...player})
    }


    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">ID</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="id" type={'text'} value={player.id} readOnly
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">NickName</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="nickName" type={'text'} value={player.nickName} onChange={handleChangePlayer}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Name</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="name" type={'text'} value={player.name} onChange={handleChangePlayer}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">NameFull</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="nameFull" type={'text'} value={player.nameFull} onChange={handleChangePlayer}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">AGE</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="age" type={'number'} value={player.age} onChange={handleChangePlayer}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Country</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="country" type={'text'} value={player.country} onChange={handleChangePlayer}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Roles</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="roles" type={'text'} value={player.roles} onChange={handleChangePlayer}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">BirthDate</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="birthdate" type={'date'} value={player.birthdate} onChange={handleChangePlayer}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">FavoriteChampion</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="favChamps" type={'text'} value={player.favChamps} onChange={handleChangePlayer}
                    />
                </div>
            </div>

            <div className="flex justify-end p-4">
                <PlayerButtons page={page} pathName={'/player/'} moveTo={moveToList} id={pno} player={player}/>
            </div>
        </div>
    )
}

export default PlayerModifyComponent
