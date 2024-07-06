import {Avatar, Button, CardHeader, Tab, Tabs, TabsHeader, Typography} from "@material-tailwind/react";
import {UserPlusIcon} from "@heroicons/react/24/solid";
import {useLocation} from "react-router-dom";
import React from "react";
import {useRecoilState} from "recoil";
import {userState} from "../../../atoms/userState";

const img = "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"


const PlayerListHeader = ({TABS,moveTo,pathName, page, onData})=>{
    const path = useLocation().pathname.split("/")[2];
    const [userInfo,setUserInfo] = useRecoilState(userState)


    const handleTabClick = (value) => {
        onData(value);
    };

    return(
        <div>
            {path === 'list' ?
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Player list
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button variant="outlined" size="sm">
                                view all
                            </Button>
                            {userInfo.nick !== "Anonymous" ? (
                                <Button className="flex items-center gap-3" size="sm" onClick={()=>{moveTo({pathName:pathName})}}>
                                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Player
                                </Button>
                            ) : <></>}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value="all" className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({label, value}) => (
                                    <Tab key={value} value={value} onClick={() => handleTabClick(value)}>
                                        {value === "all" ? (
                                            <div style={{
                                                width: '37px',
                                                height: '37px',
                                                backgroundColor: 'black',
                                                borderRadius: '50%',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Avatar src={"https://i.namu.wiki/i/A2m4odgcf4QVA233qL4q3Zq70ljqs2gLvAo8-kRRWQO0-yw4jImntYYP9Fol1ZChTgJMJhnRJo4G2bOdfgeq5FQFXkaHoqubFi1J2tlslVRJRqZVABGSTQAYwl5UnMTUyOHrb_twR1yJOikjLjhllQ.svg"} alt="{player.teamName}" size="sm"/>
                                            </div>
                                        ) : (
                                            <Avatar src={`/img/teams/${value}`} alt="{player.teamName}" size="sm"/>
                                        )}
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                    </div>
                    <br/>
                </CardHeader>
                : <></>
            }

        </div>
    )
}

export default PlayerListHeader;
