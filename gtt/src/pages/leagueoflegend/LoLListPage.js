import {Avatar, Card, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Tooltip, Typography} from "@material-tailwind/react";
import axios from "axios";
import React, {useEffect, useRef, useState} from "react";

export const getChampions = async () => {
    const res = await axios.get(`http://ddragon.leagueoflegends.com/cdn/14.8.1/data/ko_KR/champion.json`)

    return res.data
}
const initState = {
    data: null,
    format: '',
    type: '',
    version: '',
}

const searchMap = ['all', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
const searchEngMap = ['all', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']


const LoLListPage = () => {
    const [serverData, setServerData] = useState()
    const [champions, setChampions] = useState()
    const [keys, setKeys] = useState("")
    const [refresh, setRefresh] = useState(false)
    const [searchKey, setSearchKey] = useState("")
    useEffect(() => {
        getChampions().then(data => {
            setServerData(data)
            setChampions(data.data)
        })
    }, [refresh]);

    var keyString = ""
    for (let key in champions) {
        keyString += key + "/"
    }
    const keyList = keyString.split("/")
    console.log(champions)
    return (
        <Card className="grid">
            <Tabs value={"all"}>
                <TabsHeader>
                    {searchEngMap.map((key, index) =>
                        <Tab key={index} value={key} onClick={() => setSearchKey(key)}>
                            <Typography variant={"small"}>{key}</Typography>
                        </Tab>
                    )}
                </TabsHeader>
                <TabsBody>
                    <Tabs value="all">
                        <TabsHeader className="start-1 end-12 overflow-x-scroll">
                            {serverData !== undefined ?
                                keyList.map((championsKey) => {
                                    if (championsKey === "") {
                                        return;
                                    }
                                    return (
                                        searchKey === "all" || searchKey === "" ?
                                            <Tab key={champions[championsKey].key} value={champions[championsKey].name}
                                                 className="min-w-24">
                                                <div className="grid-rows-2">
                                                    <Avatar
                                                        src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${champions[championsKey].image.full}`}
                                                        alt={`${champions[championsKey].name}`} size="md"/>
                                                    <Typography variant={"small"}>{championsKey}</Typography>
                                                </div>
                                            </Tab> :
                                            (championsKey[0].toLowerCase() === searchKey ?
                                                <Tab key={champions[championsKey].key}
                                                     value={champions[championsKey].name} className="min-w-24">
                                                    <div className="grid-rows-2">
                                                        <Avatar
                                                            src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${champions[championsKey].image.full}`}
                                                            alt={`${champions[championsKey].name}`} size="md"/>
                                                        <Typography variant={"small"}>{championsKey}</Typography>
                                                    </div>
                                                </Tab> : <></>))
                                }) : <></>}
                        </TabsHeader>
                        <TabsBody>
                            {serverData !== undefined ?
                                keyList.map((championsKey) => {
                                    if (championsKey === "") {
                                        return;
                                    }
                                    return (
                                        searchKey === "all" || searchKey === "" ?
                                            <TabPanel key={champions[championsKey].key}
                                                      value={champions[championsKey].name} className="min-w-24">
                                                <div className="grid-rows-2">
                                                    <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championsKey + "_0.jpg"}`}/>
                                                </div>
                                            </TabPanel> :
                                            (championsKey[0].toLowerCase() === searchKey ?
                                                <TabPanel key={champions[championsKey].key}
                                                          value={champions[championsKey].name} className="min-w-24">
                                                    <div className="grid-rows-2">
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championsKey + "_0.jpg"}`}/>
                                                    </div>
                                                </TabPanel> : <></>))
                                }) : <></>}
                            {serverData !== undefined ?
                                keyList.map((championsKey) => {
                                    const champion = champions[championsKey];
                                    if (!champion) {
                                        return null;
                                    }
                                    return (
                                        searchKey === "all" || searchKey === "" ? (
                                            <TabPanel key={champion.key} value={champion.name} className="min-w-24">
                                                <div className="mb-3 flex items-center justify-between">
                                                    <Typography variant="h5" color="blue-gray"
                                                                className="font-medium text-3xl">
                                                        <strong>{champion.name}</strong>
                                                        <small className="ml-3 text-lg font-bold">{champion.id}</small>
                                                    </Typography>
                                                    <Typography variant="paragraph" color="blue-gray"
                                                                className="font-bold">
                                                        {champion.title}
                                                    </Typography>
                                                </div>
                                                <div className="grid grid-cols-3">
                                                    <Typography color="gray" className="font-bold col-start-1 mb-3">
                                                        공격력 : {champion.stats.attackdamage}
                                                    </Typography>
                                                    <Typography color="gray" className="font-bold col-start-2 mb-3">
                                                        물리방어력 : {champion.stats.armor}
                                                    </Typography>
                                                    <Typography color="gray" className="font-bold col-start-3 mb-3">
                                                        마법방어력 : {champion.stats.spellblock}
                                                    </Typography>
                                                    <Typography color="gray" className="font-bold col-start-4 mb-3">
                                                        이동속도 : {champion.stats.movespeed}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography>
                                                        <h5 className="items-center justify-items-center font-bold">스토리</h5>
                                                        {champion.blurb}
                                                    </Typography>
                                                </div>
                                            </TabPanel>
                                        ) : (championsKey[0].toLowerCase() === searchKey ?
                                            <TabPanel key={champion.key} value={champion.name} className="min-w-24">
                                                <div className="mb-3 flex items-center justify-between">
                                                    <Typography variant="h5" color="blue-gray"
                                                                className="font-medium text-3xl">
                                                        <strong>{champion.name}</strong>
                                                        <small className="ml-3 text-lg font-bold">{champion.id}</small>
                                                    </Typography>
                                                    <Typography variant="paragraph" color="blue-gray"
                                                                className="font-bold">
                                                        {champion.title}
                                                    </Typography>
                                                </div>
                                                <div className="grid grid-cols-3">
                                                    <Typography color="gray" className="font-bold col-start-1 mb-3">
                                                        공격력 : {champion.stats.attackdamage}
                                                    </Typography>
                                                    <Typography color="gray" className="font-bold col-start-2 mb-3">
                                                        물리방어력 : {champion.stats.armor}
                                                    </Typography>
                                                    <Typography color="gray" className="font-bold col-start-3 mb-3">
                                                        마법방어력 : {champion.stats.spellblock}
                                                    </Typography>
                                                    <Typography color="gray" className="font-bold col-start-4 mb-3">
                                                        이동속도 : {champion.stats.movespeed}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography>
                                                        <h5 className="items-center justify-items-center font-bold">스토리</h5>
                                                        {champion.blurb}
                                                    </Typography>
                                                </div>
                                            </TabPanel> : <></>))
                                }) : null}
                        </TabsBody>
                    </Tabs>
                </TabsBody>
            </Tabs>
        </Card>
    )
}

export default LoLListPage