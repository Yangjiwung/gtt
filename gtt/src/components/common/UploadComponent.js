import {Card} from "@material-tailwind/react";
import {insertFiles} from "../../api/filesApi";


const UploadComponent = ()=>{


    return (
        <div>
            <Card>
                <input type="file" onChange={insertFiles} multiple/>
            </Card>
        </div>
    )
}

export default UploadComponent
