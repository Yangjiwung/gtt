import React, {useCallback, useEffect, useRef, useState} from "react";
import useCustomMove from "../../hooks/useCustomMove";
import {createSearchParams, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {pageState} from "../../atoms/pageState";
import {Button, Rating, Textarea} from "@material-tailwind/react";
import {checkPComment, getPCommentList, postPCommentAdd} from "../../api/playerCommentApi";
import {userState} from "../../atoms/userState";
import {focus} from "@testing-library/user-event/dist/focus";

const initState = {
    comment : '',
    comWriter : '',
    recomNo : 0,
    pno : 0,
    regDate : null,
    modDate : null
}

function RatedIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
        >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
    );
}
function UnratedIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
        </svg>
    );
}

const PlayerCommentAddComponent = ({refresh,setRefresh}) => {
    const [playerComment, setPlayerComment] = useState({...initState})
    const pno = useLocation().pathname.split("/")[3]
    const [userInfo,setUserInfo] = useRecoilState(userState)
    const textareaRef = useRef(null);
    const [check, setCheck] = useState(null)


    const {moveToList, moveToRead} = useCustomMove();

    console.log(userInfo.nick)
    const handleChangePComment= (e) => {
        if (e.target && e.target.name) {
            const { name, value } = e.target;
            playerComment[name] = value;
            setPlayerComment({...playerComment});
        }
    }

    useEffect(() => {
        checkPComment(pno, userInfo.nick).then(data => {
            console.log(data)
            setCheck(data)
        })
    }, [refresh]);

    const handleAdd = () => {
        const formData = new FormData()

        if (userInfo.nick === "Anonymous"){ // 댓글 작성할 때 로그인 확인
           if (window.confirm("로그인 후 응원 댓글을 남기실 수 있습니다. 로그인 화면으로 이동하시겠습니까?")){
                   window.location.href = "http://localhost:3000/login"
           }
        } else { // 로그인이 되어 있으면 진행
            if (playerComment.comment === "" ) { // 댓글이 null 이면 작성 안되게
                alert("응원 문구를 입력하세요.")

                return;

            } else if (playerComment.recomNo === 0) { // 평점이 0이면 작성 안되게
                alert("평점을 입력하세요.")

                return;

            } else { // 댓글, 평점이 있으면 작성
                console.log(check)

                if (check !== null && check === true) {
                    alert("이미 응원글을 작성하셨습니다.")

                } else if (check !== null && check === false) {
                    formData.append("comment", playerComment.comment)
                    formData.append("comWriter", userInfo.nick)
                    formData.append("pno", pno)
                    formData.append("recomNo", playerComment.recomNo)

                    postPCommentAdd(formData).then(data => {
                        alert("SUCCESS")
                        window.location.reload();
                        setRefresh(!refresh)
                    })
                }
            }
        }
    }

    return (
        <div className="border-4">
            <br/>
            <br/>
            <div className="flex w-full flex-col gap-6">
                <Textarea ref={textareaRef} className="w-full" variant="static" label="Comment" placeholder="Comment" name="comment" onChange={handleChangePComment}/>
                <div className="flex justify-around items-start">
                    <Rating
                        value={playerComment.recomNo}
                        ratedColor="red"
                        ratedIcon={<RatedIcon/>}
                        unratedIcon={<UnratedIcon/>}
                        name="recomNo"
                        onChange={(newValue) => setPlayerComment({...playerComment, recomNo: newValue})}
                    />

                    <Button className="flex items-center gap-3 justify-end" onClick={handleAdd}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
                        </svg>
                        Add Comment
                    </Button>
                </div>
            </div>


        </div>
    )
}

export default PlayerCommentAddComponent