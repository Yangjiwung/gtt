import React, {useCallback, useEffect, useState} from "react";
// import {getPlayerList} from "../../api/playerApi"
import {getOneTeam, getPlayerList, getPlayerListWithTeam, getTeamList} from "../../api/ServerPlayerApi"
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../common/PageComponent";
import {Avatar, Button, Card, CardBody, CardHeader, IconButton, Typography} from "@material-tailwind/react";
import {useLocation} from "react-router-dom";
import {useRecoilState} from "recoil";
import {pageState} from "../../atoms/pageState";
import PlayerListHeader from "../player/list/PlayerListHeader";
import {API_SERVER_HOST} from "../../api/filesApi";

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}
const initState2 = {
    id: 0,
    teamName: '',
    location: '',
    image: '',
    rosterPhoto: "",
    serverPlayers: null
}
const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Dplus KIA",
        value: "Dplus KIAlogo profile.png",
    },
    {
        label: "DRX",
        value: "DRXlogo profile.png",
    },
    {
        label: "FearX",
        value: "FearXlogo profile.png",
    },
    {
        label: "Gen.G",
        value: "Gen.Glogo profile.png",
    },
    {
        label: "Hanwha Life Esports",
        value: "Hanwha Life Esportslogo profile.png",
    },
    {
        label: "KT Rolster",
        value: "KT Rolsterlogo profile.png",
    },
    {
        label: "Kwangdong Freecs",
        value: "Kwangdong Freecslogo profile.png",
    },
    {
        label: "Nongshim Esports",
        value: "Nongshim RedForcelogo square.png",
    },
    {
        label: "OKSavingBank BRION",
        value: "OKSavingsBank BRIONlogo profile.png",
    },
    {
        label: "T1",
        value: "T1logo profile.png",
    },
    {
        label: "Seoul Neon",
        value: "Seoul Neonlogo square.png",
    },
    {
        label: "Shadow Corp",
        value: "Shadow Corplogo square.png",
    }
];

const testTeam = {
    teamName: "Gen.G",
    teamImg: "/img/team/geng.png"
}

const ListComponent = () => {
    const pathName = useLocation().pathname
    const {refresh, moveToList, moveToAdd, moveToRead, setRefresh} = useCustomMove()
    const [page, setPage] = useRecoilState(pageState)
    const [serverData, setServerData] = useState(initState)
    const [dataFromChild, setDataFromChild] = useState("all");

    useEffect(() => {
        if (dataFromChild === "all") { // TABS 에서 전체보기를 눌렀을 때
            getPlayerList({page: page.page, size: page.size}).then(data1 => {
                console.log(data1)
                setServerData(data1)
            })
        } else { // 전체보기가 아니면
            getPlayerListWithTeam({page: page.page, size: page.size, keyword: dataFromChild}).then(data2 => {
                console.log(data2)
                setServerData(data2)
            })
        }
        // getPlayerList({page: page.page, size: page.size}).then(data => {
        //     console.log(data)
        //     setServerData(data)
        // })

    }, [refresh])

    const handleDataFromChild = (data) => {
        setDataFromChild(data);
        console.log(data)

        if (data === "all") { // TABS 에서 전체보기를 눌렀을 때
            getPlayerList({page: 1, size: page.size}).then(data1 => {
                console.log(data1)
                setServerData(data1)

            })
        } else { // 전체보기가 아니면
            getPlayerListWithTeam({page: 1, size: page.size, keyword: data}).then(data2 => {
                console.log(data2)
                setServerData(data2)
            })
        }
    };

    return (
        <section className="min-h-screen">
            <div className="container mx-auto">
                <PlayerListHeader TABS={TABS} moveTo={moveToAdd} pathName={'/player/add'} onData={handleDataFromChild}/>
                {/*{team.map((player) => {*/}
                {/*    <p>{player.name}</p>*/}
                {/*})}*/}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4">
                    {serverData.dtoList.map((player) => (
                        <div>
                            {dataFromChild === "all" ? (
                                <Card
                                    className="relative grid h-[20rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-t from-black/80 via-black/50"
                                    onClick={() => moveToRead({
                                        pathName: '/player/read',
                                        num: player.id,
                                        totalPage: serverData.totalCount
                                    })}
                                >
                                    <CardHeader
                                        floated={false}
                                        shadow={false}
                                        color="transparent"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            margin: 0,
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: 0,
                                            backgroundImage: `url('../img/players/${player.nickName}.png')`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    />

                                    <CardBody className="relative py-14 px-6 md:px-12 opacity-0 hover:opacity-100">

                                        <Typography
                                            variant="h2"
                                            color="white"
                                            className="mb-6 font-medium leading-[1.5]"
                                        >
                                            {player.nickName}
                                        </Typography>
                                        <Typography variant="h5" className="mb-4 text-white">
                                            {player.nameFull}
                                        </Typography>

                                        {/*팀 이미지 매칭*/}
                                        <div style={{
                                            width: '75px',
                                            height: '75px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Avatar
                                                key={player.id}
                                                size="xl"
                                                variant="circular"
                                                alt="tania andrew"
                                                src={`/img/teams/${player.teamImg}`} // team의 image 값 사용
                                            />
                                        </div>

                                    </CardBody>
                                </Card>
                            ) : (
                                player.teamImg === dataFromChild ?
                                    (
                                        <Card
                                            className="relative grid h-[20rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-t from-black/80 via-black/50"
                                            onClick={() => moveToRead({
                                                pathName: '/player/read',
                                                num: player.id,
                                                totalPage: serverData.totalCount
                                            })}
                                        >
                                            <CardHeader
                                                floated={false}
                                                shadow={false}
                                                color="transparent"
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    margin: 0,
                                                    height: '100%',
                                                    width: '100%',
                                                    borderRadius: 0,
                                                    backgroundImage: `url('../img/players/${player.nickName}.png')`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            />

                                            <CardBody className="relative py-14 px-6 md:px-12 opacity-0 hover:opacity-100">

                                                <Typography
                                                    variant="h2"
                                                    color="white"
                                                    className="mb-6 font-medium leading-[1.5]"
                                                >
                                                    {player.nickName}
                                                </Typography>
                                                <Typography variant="h5" className="mb-4 text-white">
                                                    {player.nameFull}
                                                </Typography>

                                                {/*팀 이미지 매칭*/}
                                                <div style={{
                                                    width: '75px',
                                                    height: '75px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Avatar
                                                        key={player.id}
                                                        size="xl"
                                                        variant="circular"
                                                        alt="tania andrew"
                                                        src={`/img/teams/${player.teamImg}`} // team의 image 값 사용
                                                    />
                                                </div>

                                            </CardBody>
                                        </Card>
                                    )
                                    : <></>

                            )
                            }
                        </div>

                    ))}
                </div>
            </div>
            <PageComponent serverData={serverData} movePage={moveToList} pathName={pathName}/>

        </section>
    )
}

export default ListComponent