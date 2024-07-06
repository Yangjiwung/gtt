import { useEffect, useState } from "react";
import { getOne } from "../../api/todoApi";
import {getComList} from "../../api/commentApi";

const initState = {
    tno:0,
    title:'',
    writer:'',
    regDate:null,
    modDate:null,
    complete:false
}

const ReadComponent = ({tno})=>{
    const [todo, setTodo] = useState(initState)

    useEffect(()=>{
        getOne(tno).then(data =>{
            console.log(data)
            setTodo(data)
        })
    },[tno])
    return(
        <div>

        </div>
    )
}

export default ReadComponent;