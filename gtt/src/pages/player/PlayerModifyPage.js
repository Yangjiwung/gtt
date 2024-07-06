import {useParams} from "react-router-dom";
import PlayerModifyComponent from "../../components/player/PlayerModifyComponent"

const PlayerModifyPage = () => {
    const {pno} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                Player Modify
            </div>

            <PlayerModifyComponent pno={pno}/>
        </div>
    )
}

export default PlayerModifyPage