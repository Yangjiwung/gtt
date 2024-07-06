import {useRef, useState} from "react";
import {Card} from "@material-tailwind/react";
import {API_SERVER_HOST, insertFiles} from "../../api/filesApi";

const DropFiles = ({imageDiv}) => {
    const FileInput = useRef(HTMLInputElement);
    const [upload, setUpload] = useState(false);

    const DropEvent = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
                console.log(e.dataTransfer.files[i])
            }
        }
    }
    const showImage = (imageUrl,fileName) => {
        const uploadImg = document.createElement("img")
        uploadImg.src = imageUrl;
        uploadImg.width = 100;
        uploadImg.setAttribute("fileName",fileName)
        imageDiv.current.appendChild(uploadImg);
        setUpload(!upload)
    }
    const handleChange = (e) => {
        const file = e.target.files[0];
        console.log("file", file);
        console.log(imageDiv.current)
        insertFiles(file).then(files => {
            const imageUrl = API_SERVER_HOST+"/api/files/" + files.at(0)
            console.log(files.at(0),imageUrl)
            showImage(imageUrl,files.at(0))});
    }
    return (
        <Card className="w-[100px] relative z-[1000] "  >
            <div className="flex items-center justify-center" ref={imageDiv} onDrop={DropEvent}>
            </div>
            {!upload?<label htmlFor="dropzone-file" onDrop={DropEvent}
                    className=" flex flex-col items-center justify-center w-[100px] h-[100px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center">
                    <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                </div>
                <input ref={FileInput} id="dropzone-file" type="file" className="hidden" onChange={handleChange}
                       multiple/>
            </label>:<></>}
        </Card>
    )
}

export default DropFiles;
