import React, {forwardRef, useEffect, useState} from "react";
import {Button, Input, Menu, MenuHandler, MenuItem, MenuList,} from "@material-tailwind/react";
import {getTeamsWithOutPlayers} from "../../api/lolAPI";


export const DropDownInput = forwardRef(({onChange,title,  buttonRef, inputRef}) => {
    const [teams, setTeams] = useState();
    const [teamIndex, setTeamIndex] = React.useState(0);
    const { teamNo,teamName,teamImage } = teams? {teamNo:teams[teamIndex],teamName:teams[teamIndex].teamName,teamImage: teams[teamIndex].image}: {id: 0,teamName:"",teamImg:"/img/team/geng.png"};

    useEffect(() => {
        getTeamsWithOutPlayers().then((teams)=>{
            setTeams(teams);
        })
    }, []);
    const handleChange = (e) => {
        onChange(e); // 상위 컴포넌트로 선택된 팀 전달
    };
    return (
        <div className="relative flex w-full ">
            <Menu placement="bottom-start" ref={buttonRef}>
                <MenuHandler>
                    <Button
                        ripple={false}
                        variant="text"
                        color="blue-gray"
                        className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                    >
                        <img
                            src={`/img/teams/${teamImage}`}
                            alt={teamNo}
                            className="h-4 w-4 rounded-full object-cover"
                        />
                        {teamName}
                    </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[18rem]">
                    {teams?teams.map((team, index) => {
                        return (
                            <MenuItem
                                key={team.id}
                                value={team.id}
                                className="flex items-center gap-2"
                                onClick={() => setTeamIndex(index)}
                            >
                                <img
                                    src={`/img/teams/${team.image}`}
                                    alt={team?team.teamName:""}
                                    className="h-5 w-5 rounded-full object-cover"
                                />
                                {team.id} <span className="ml-auto">{team.teamName}</span>
                            </MenuItem>
                        );
                    }):<></>}
                </MenuList>
            </Menu>
            <Input
                type="text"
                placeholder="title"
                value={title}
                ref={inputRef}
                className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
                containerProps={{
                    className: "min-w-0",
                }}
                onChange={handleChange}
            />
        </div>
    );
})
