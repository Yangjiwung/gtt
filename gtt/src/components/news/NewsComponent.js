import { Avatar, Typography } from "@material-tailwind/react";
import useCustomMove from "../../hooks/useCustomMove";
import { memo, useEffect, useState } from "react";
import { getOneTeam } from "../../api/lolAPI";

const img = "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg";

const ListComponent = memo(({ serverData, page, size, path }) => {
    const { moveToRead } = useCustomMove();
    const [dtoList, setDtoList] = useState([]);
    const [num, setNum] = useState([]);
    const [team, setTeam] = useState([]);
    console.log(dtoList);

    useEffect(() => {
        setDtoList(serverData.dtoList);
        if (path === "news") {
            setNum(serverData.dtoList.map((dto) => dto.newsNo));
        } else if (path === "free") {
            setNum(serverData.dtoList.map((dto) => dto.fno));
        } else if (path === "board") {
            setNum(serverData.dtoList.map((dto) => dto.bno));
        }
        if(serverData.dtoList[0].theTeam) {// Promise.all을 사용하여 모든 getOneTeam 호출이 완료될 때까지 기다림
            Promise.all(serverData.dtoList.map(dto => getOneTeam(dto.theTeam)))
                .then(data => {
                    setTeam(data);
                })
                .catch(error => {
                    console.error("Error fetching teams:", error);
                });
        }
    }, [serverData]);

    return (
        <tbody>
        {dtoList.map((dto, index) => {
            const isLast = index === serverData.dtoList.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            console.log(team);
            return (
                <tr key={num[index]} onClick={() => moveToRead({ pathName: `/${path}/read`, num: num[index], totalPage: serverData.totalCount })}>
                        {team[index]&&team ? (
                        <td className={classes}>
                            <div className="flex items-center gap-3">
                                <Avatar src={`/img/teams/${team[index].image}`} alt={team[index].teamName} size="sm" />
                                <div className="flex flex-col">
                                    <Typography variant="small" color="blue-gray" className="font-normal">{team[index].teamName}</Typography>
                                </div>
                            </div>
                        </td>
                        ) : (
                            <></>
                        )}
                    <td>
                        <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray" className="font-normal">{dto.title}</Typography>
                        </div>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">{dto.writer}</Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">{dto.hits}</Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">{dto.recomNo}</Typography>
                    </td>
                    <td>
                        <Typography variant="small" color="blue-gray" className="font-normal">{dto.regDate /*.format("yyyy-MM-dd")*/}</Typography>
                    </td>
                </tr>
            );
        })}
        </tbody>
    );
});

export default ListComponent;
