import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    Avatar,
    Card,
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
    Typography,
    List,
    Chip,
    ButtonGroup,
    Button
} from "@material-tailwind/react";

export const getItems = async () => {
    const res = await axios.get(`https://ddragon.leagueoflegends.com/cdn/14.9.1/data/ko_KR/item.json`);
    return res.data;
};

const LoLListPage = () => {
    const [serverData, setServerData] = useState();
    const [items, setItems] = useState();                           // lol item 객체
    const [refresh, setRefresh] = useState(false);
    const [selectedValues, setSelectedValues] = useState("");   // 아이템을 구분할 태그를 저장

    useEffect(() => {
        getItems().then((data) => {
            setServerData(data);
            setItems(data.data);
        });
    }, [refresh]);

    // 버튼을 누르면 value를 가져와 selectedValues에 입력
    const handleChangeTags = (e) => {
        const newValue = e.target.value;
        setSelectedValues(newValue)
        console.log(selectedValues)
    }

    var keyString = "";
    for (let key in items) {
        keyString += key + "/";
    }
    const keyList = keyString.split("/");
    console.log(items)

    return (
        <Card className="grid">
            <Tabs value="all">
                {/*아이템 태그 선택 버튼*/}
                <List className="flex-row">
                    <Button fullWidth value="" onClick={handleChangeTags}>전체보기</Button>
                </List>
                <List className="flex-row">
                    <Chip variant="ghost" value="물리"/>
                    <ButtonGroup fullWidth variant="outlined">
                        <Button value="Damage" onClick={handleChangeTags}>공격력</Button>
                        <Button value="CriticalStrike" onClick={handleChangeTags}>치명타</Button>
                        <Button value="AttackSpeed" onClick={handleChangeTags}>공격속도</Button>
                        <Button value="LifeSteal" onClick={handleChangeTags}>생명력 흡수</Button>
                        <Button value="ArmorPenetration" onClick={handleChangeTags}>물리 관통력</Button>
                    </ButtonGroup>
                </List>
                <List className="flex-row">
                    <Chip variant="ghost" value="마법"/>
                    <ButtonGroup fullWidth variant="outlined">
                        <Button value="SpellDamage" onClick={handleChangeTags}>주문력</Button>
                        <Button value="AbilityHaste" onClick={handleChangeTags}>스킬가속</Button>
                        <Button value="SpellVamp" onClick={handleChangeTags}>주문 흡혈</Button>
                        <Button value="Mana" onClick={handleChangeTags}>마나</Button>
                        <Button value="ManaRegen" onClick={handleChangeTags}>마나 재생</Button>
                        <Button value="MagicPenetration" onClick={handleChangeTags}>마법 관통력</Button>
                    </ButtonGroup>
                </List>
                <List className="flex-row">
                    <Chip variant="ghost" value="방어"/>
                    <ButtonGroup fullWidth variant="outlined">
                        <Button value="Health" onClick={handleChangeTags}>체력</Button>
                        <Button value="Armor" onClick={handleChangeTags}>방어력</Button>
                        <Button value="SpellBlock" onClick={handleChangeTags}>마법방어력</Button>
                        <Button value="HealthRegen" onClick={handleChangeTags}>체력 재생</Button>
                        <Button value="Tenacity" onClick={handleChangeTags}>강인함</Button>
                    </ButtonGroup>
                </List>
                <List className="flex-row">
                    <Chip variant="ghost" value="기타"/>
                    <ButtonGroup fullWidth variant="outlined">
                        <Button value="Boots" onClick={handleChangeTags}>신발</Button>
                        <Button value="NonbootsMovement" onClick={handleChangeTags}>이동속도</Button>
                        <Button value="Consumable" onClick={handleChangeTags}>소모품</Button>
                        <Button value="Active" onClick={handleChangeTags}>액티브</Button>
                        <Button value="Aura" onClick={handleChangeTags}>오오라</Button>
                        <Button value="Slow" onClick={handleChangeTags}>느려짐</Button>
                        <Button value="GoldPer" onClick={handleChangeTags}>골드획득</Button>
                        <Button value="Vision" onClick={handleChangeTags}>시야</Button>
                        <Button value="Trinket" onClick={handleChangeTags}>장신구</Button>
                    </ButtonGroup>
                </List>

                {/*아이템 이미지 선택 박스*/}
                <TabsHeader className="start-1 end-12 overflow-x-auto">
                    {serverData !== undefined &&
                        keyList.map((itemsKey) => {
                            if (itemsKey === "") {
                                return null;
                            } else if (itemsKey !== ""){
                                if (selectedValues === "") {
                                    return(
                                        items[itemsKey].maps["11"] === true && !items[itemsKey].hasOwnProperty('inStore') ? (
                                            <Tab key={itemsKey} value={items[itemsKey].name} className="min-w-24">
                                                <div className="grid-rows-2">
                                                    <Avatar
                                                        src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/${items[itemsKey].image.full}`}
                                                        alt={`${items[itemsKey].name}`}
                                                        size="md"
                                                    />
                                                    <Typography variant="small">{items[itemsKey].name}</Typography>
                                                </div>
                                            </Tab>
                                        ) : <></>
                                    )
                                } else if (selectedValues !== "") {
                                    return (
                                        (items[itemsKey].tags["0"] === selectedValues || items[itemsKey].tags["1"] === selectedValues || items[itemsKey].tags["2"] === selectedValues ||
                                            items[itemsKey].tags["3"] === selectedValues || items[itemsKey].tags["4"] === selectedValues || items[itemsKey].tags["5"] === selectedValues ||
                                            items[itemsKey].tags["6"] === selectedValues)
                                        && items[itemsKey].maps["11"] === true && !items[itemsKey].hasOwnProperty('inStore') ? (
                                            <Tab key={itemsKey} value={items[itemsKey].name} className="min-w-24">
                                                <div className="grid-rows-2">
                                                    <Avatar
                                                        src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/${items[itemsKey].image.full}`}
                                                        alt={`${items[itemsKey].name}`}
                                                        size="md"
                                                    />
                                                    <Typography variant="small">{items[itemsKey].name}</Typography>
                                                </div>
                                            </Tab>
                                        ) : <></>
                                    )
                                }
                            }
                        })}
                </TabsHeader>

                {/*아이템 세부 정보 출력 박스*/}
                <TabsBody>
                    {serverData !== undefined &&
                        keyList.map((itemsKey) => {
                            if (itemsKey === "") {
                                return null;
                            } else if (itemsKey !== ""){
                                if (selectedValues === "") {
                                    return(
                                        items[itemsKey].maps["11"] === true && !items[itemsKey].hasOwnProperty('inStore') ? (
                                            <TabPanel key={items[itemsKey].key} value={items[itemsKey].name}
                                                      className="min-w-24">
                                                <div className="grid-rows-2">
                                                    <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/${items[itemsKey].image.full}`}
                                                    />
                                                </div>
                                            </TabPanel>
                                        ) : <></>
                                    )
                                } else if (selectedValues !== "") {
                                    return (
                                        (items[itemsKey].tags["0"] === selectedValues || items[itemsKey].tags["1"] === selectedValues || items[itemsKey].tags["2"] === selectedValues ||
                                            items[itemsKey].tags["3"] === selectedValues || items[itemsKey].tags["4"] === selectedValues || items[itemsKey].tags["5"] === selectedValues ||
                                            items[itemsKey].tags["6"] === selectedValues)
                                        && items[itemsKey].maps["11"] === true && !items[itemsKey].hasOwnProperty('inStore') ? (
                                            <TabPanel key={items[itemsKey].key} value={items[itemsKey].name}
                                                      className="min-w-24">
                                                <div className="grid-rows-2">
                                                    <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/${items[itemsKey].image.full}`}
                                                    />
                                                </div>
                                            </TabPanel>
                                        ) : <></>
                                    )
                                }
                            }
                        })}
                    {serverData !== undefined &&
                        keyList.map((itemsKey) => {
                            const item = items[itemsKey];
                            if (!item) {
                                return null;
                            } else if (itemsKey !== ""){
                                if (selectedValues === "") {
                                    return(
                                        items[itemsKey].maps["11"] === true && !items[itemsKey].hasOwnProperty('inStore') ? (
                                            <TabPanel key={item.key} value={item.name} className="min-w-24">
                                                <div className="mb-3 flex items-center justify-between">
                                                    <Typography variant="h5" color="blue-gray"
                                                                className="font-medium text-3xl">
                                                        <strong>{item.name}</strong>
                                                        {/*<small className="ml-3 text-lg font-bold">Tag : {item.tags}</small>*/}
                                                    </Typography>
                                                    <Typography variant="paragraph" color="blue-gray" className="font-bold">
                                                        가격 : {item.gold.total}
                                                    </Typography>
                                                </div>
                                                <div className="grid">
                                                    <Typography color="gray" className="font-bold col-start-1 mb-3">
                                                        <hr/>
                                                        <br/>
                                                        {/*문자열로 들어오는 HTML 코드를 적용할 수 있도록 처리해 출력*/}
                                                        <div dangerouslySetInnerHTML={{__html: item.description}}/>
                                                        <br/>
                                                        <hr/>
                                                    </Typography>
                                                    <Typography color="gray" className="font-bold col-start-1 mb-3">
                                                        <br/>
                                                        {item.plaintext}
                                                        <br/>
                                                    </Typography>
                                                </div>
                                            </TabPanel>
                                        ) : <></>
                                    )
                                } else if (selectedValues !== "") {
                                    return (
                                        (items[itemsKey].tags["0"] === selectedValues || items[itemsKey].tags["1"] === selectedValues || items[itemsKey].tags["2"] === selectedValues ||
                                            items[itemsKey].tags["3"] === selectedValues || items[itemsKey].tags["4"] === selectedValues || items[itemsKey].tags["5"] === selectedValues ||
                                            items[itemsKey].tags["6"] === selectedValues)
                                        && items[itemsKey].maps["11"] === true && !items[itemsKey].hasOwnProperty('inStore') ? (
                                            <TabPanel key={item.key} value={item.name} className="min-w-24">
                                            <div className="mb-3 flex items-center justify-between">
                                                    <Typography variant="h5" color="blue-gray"
                                                                className="font-medium text-3xl">
                                                        <strong>{item.name}</strong>
                                                        {/*<small className="ml-3 text-lg font-bold">Tag : {item.tags}</small>*/}
                                                    </Typography>
                                                    <Typography variant="paragraph" color="blue-gray" className="font-bold">
                                                        가격 : {item.gold.total}
                                                    </Typography>
                                                </div>
                                                <div className="grid">
                                                    <Typography color="gray" className="font-bold col-start-1 mb-3">
                                                        <hr/><br/>
                                                        {/*문자열로 들어오는 HTML 코드를 적용할 수 있도록 처리해 출력*/}
                                                        <div dangerouslySetInnerHTML={{__html: item.description}}/>
                                                        <br/><hr/>
                                                    </Typography>
                                                    <Typography color="gray" className="font-bold col-start-1 mb-3">
                                                        <br/>
                                                        {item.plaintext}
                                                        <br/>
                                                    </Typography>
                                                </div>
                                            </TabPanel>
                                        ) : <></>
                                    )
                                }
                            }
                        })}
                </TabsBody>
            </Tabs>
        </Card>
    );
};

export default LoLListPage;
