import {Button} from "@material-tailwind/react";
import {useLocation} from "react-router-dom";
import React from "react";
import {deleteOnePlayer, postAdd, putOnePlayer} from "../../../api/playerApi";
import {useRecoilState} from "recoil";
import {userState} from "../../../atoms/userState";


const PlayerButtons = ({moveTo,pathName,page, moveToModify, moveToRead, serverData, id, player, imageDiv, setResultCallback})=>{
    const path = useLocation().pathname.split("/")[2];
    const pathNum = useLocation().pathname.split("/")[3];
    const [userInfo,setUserInfo] = useRecoilState(userState)



    const handleClickDelete = () => {

        deleteOnePlayer(id).then(data => {
            moveTo({
                pathName:pathName+'list',
                pageParam: {page: `${page.page}`, size: `${page.size}`}
            })
        })
    }

    const handleClickModify = () => {
        const children = imageDiv.current.children;
        let fileName = null;

        if (children && children.length > 0) { // 이미지 파일이 존재한는지 여부
            const firstChild = children[0];
            fileName = firstChild.getAttribute("fileName");
        } else { // 없을 시
            console.error("imageDiv에 자식 요소가 없습니다.");
        }

        // const fileName = Array.from(imageDiv.current.children)[0].getAttribute("fileName");
        // console.log("file", fileName);

        const formData = new FormData()

        if (player.nickName !== "" && player.name !== "" && player.age !== "" && player.nameFull !== ""
            && player.roles !== "" && player.birthdate !== "" && player.country !== "" && player.favChamps !== "") { // input 요소에 값이 전부 있을 경우

            formData.append("nickName", player.nickName)
            formData.append("name", player.name)
            formData.append("age", player.age)
            formData.append("country", player.country)
            formData.append("nameFull", player.nameFull)
            formData.append("roles", player.roles)
            formData.append("birthdate", player.birthdate)
            formData.append("birthdatePrecision", player.birthdate)
            formData.append("favChamps", player.favChamps)

            console.log(formData)

            putOnePlayer(id, formData).then(data => {
                moveTo({
                    pathName:pathName+'read/'+player.id,
                    pageParam: {page: `${page.page}`, size: `${page.size}`}
                })
            })
        } else { // input 요소에 값이 하나라도 없는 경우
            alert("올바른 값을 입력해주세요.");

            return;
        }
    }

    const handleClickAdd = (e) => {
        const children = imageDiv.current.children;

        let fileName = null;

        if (children && children.length > 0) { // 이미지 파일이 존재하는지 여부

            const firstChild = children[0];
            fileName = firstChild.getAttribute("fileName");
        } else { // 없을 시
            console.error("imageDiv에 자식 요소가 없습니다.");
        }

        console.log("nickName", player.nickName)
        console.log("name", player.name)
        console.log("age", player.age)
        console.log("country", player.country)
        console.log("nameFull", player.nameFull)
        console.log("roles", player.roles)
        console.log("birthdate", player.birthdate)
        console.log("birthdatePrecision", player.birthdate)
        console.log("favChamps", player.favChamps)

        // const fileName = Array.from(imageDiv.current.children)[0].getAttribute("fileName");
        // console.log("file", fileName);

        const formData = new FormData()

        if (player.nickName !== "" && player.name !== "" && player.age !== "" && player.nameFull !== ""
            && player.roles !== "" && player.birthdate !== "" && player.country !== "" && player.favChamps !== "") { // input 요소에 값이 전부 있을 경우

            formData.append("nickName", player.nickName)
            formData.append("name", player.name)
            formData.append("age", player.age)
            formData.append("country", player.country)
            formData.append("nameFull", player.nameFull)
            formData.append("roles", player.roles)
            formData.append("birthdate", player.birthdate)
            formData.append("birthdatePrecision", player.birthdate)
            formData.append("favChamps", player.favChamps)

            console.log(formData)

            postAdd(formData).then(data => {
                console.log(data, data.id)
                //setResultCallback(data.id)
                moveTo({
                    pathName:pathName+'read/' + data.id,
                    pageParam: {page: `${page.page}`, size: `${page.size}`}
                })
            })
        } else { // input 요소에 값이 하나라도 없는 경우
            alert("올바른 값을 입력해주세요.");

            return;
        }
    }

    return (
        <div className="flex flex-box justify-center items-center">
            <div className="flex p-2">
                {path === "read" || path === "modify" ?
                    <Button className="rounded-full" onClick={() => moveTo({
                        pathName: pathName + 'list',
                        pageParam: { page: `${page.page}`, size: `${page.size}` }
                    })}>List</Button> : <></>}

                {path==="read"?
                    <div>
                        {userInfo.nick !== "Anonymous" ? (
                            <Button className="rounded-full"
                                    onClick={() => moveToModify({pathName: pathName+"modify", num: id})}>Modify</Button>
                        ) : <></>}
                    </div>
                    :<></>}

                {path==="modify"?
                    <div className="justify-between">
                        <Button className="rounded-full" onClick={handleClickDelete}>Delete</Button><Button className="rounded-full" onClick={handleClickModify}>Modify</Button>
                    </div>:<></>}

                {path==="list"?
                    <Button className="rounded-full" onClick={() => moveTo({
                        pathName:pathName + "read/" + id
                    })}>Read</Button> : <></> }

                {path==="add" ?
                    <Button className="rounded-full" onClick={handleClickAdd}>Add</Button> : <></> }
            </div>
        </div>
    )
}
export default PlayerButtons
