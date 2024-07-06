import {Typography} from "@material-tailwind/react";
import useCustomMove from "../../hooks/useCustomMove";
import {useEffect, useState} from "react";

const ListComponent = ({serverData,page,size,path}) =>{
    const {moveToRead} = useCustomMove()
    const [num,setNum] = useState([])
    const [dtoList,setDtoList] = useState([])
    useEffect(() => {
        setDtoList(serverData.dtoList)
        if(path ==="news"){
            setNum(serverData.dtoList.map(dto=>dto.newsNo))
        }else if(path ==="board"){
            setNum(serverData.dtoList.map(dto=>dto.bno))
        }else if(path ==="free"){
            setNum(serverData.dtoList.map(dto=>dto.fno))
        }else if(path ==="notice"){
            setNum(serverData.dtoList.map(dto=>dto.notiNo))
        }
    }, []);
    return (
        <tbody>
        {dtoList.map( (dto,index) => {
            const isLast = index === serverData.dtoList.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
                <tr key={num[index]} onClick={()=> moveToRead({pathName:`/${path}/read`,num:num[index],totalPage:serverData.totalCount})}>
                    <td>
                        <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray" className="font-normal">{dto.title}</Typography>
                        </div>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray"className="font-normal">{dto.writer}</Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">{dto.hits}</Typography>
                    </td>
                    <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {dto.recomNo}
                        </Typography>
                    </td>
                    <td>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {dto.regDate /*.format("yyyy-MM-dd")*/}
                        </Typography>
                    </td>
                </tr>
            );

        })}
        </tbody>
    )
}

export default ListComponent
