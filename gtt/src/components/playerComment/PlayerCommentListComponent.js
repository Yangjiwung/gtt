import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Rating,
    Textarea,
    Typography
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { createSearchParams, useLocation, useSearchParams } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove";
import { useRecoilState } from "recoil";
import { pageState } from "../../atoms/pageState";
import { deleteOnePComment, getPCommentList, putOnePComment } from "../../api/playerCommentApi";
import {userState} from "../../atoms/userState";

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

const PlayerCommentListComponent = ({refresh, setRefresh}) => {
    const [serverData, setServerData] = useState([]);
    const [isModify, setIsModify] = useState("");
    const [modifiedComment, setModifiedComment] = useState("");
    const [modifiedRecomNo, setModifiedRecomNo] = useState(0);
    const [userInfo,setUserInfo] = useRecoilState(userState)

    const location = useLocation();
    const [queryParams] = useSearchParams();
    const pno = location.pathname.split("/")[3];
    const pathName = `${pno}?${createSearchParams({ page: queryParams.get("page"), size: queryParams.get("size") }).toString()}`;

    useEffect(() => {
        getPCommentList({ pno }).then((data) => {
            setServerData(data);
            console.log(data)
        });
    }, [refresh]);

    const handleCommentDelete = (playerComNo) => {
        deleteOnePComment(playerComNo).then((data) => {
            alert("COMMENT REMOVE SUCCESS");
            window.location.reload();
        });
    };

    const handleModify = (playerComment) => {
        setIsModify(playerComment.playerComNo);
        setModifiedComment(playerComment.comment);
        setModifiedRecomNo(playerComment.recomNo);
    };
    const handleCancel = () => {
        // setIsModify(false);
        window.location.reload();
    };

    const handleConfirmModify = (playerComment) => {
        const formData = new FormData();

        formData.append("comment", modifiedComment);
        formData.append("recomNo", modifiedRecomNo);

        putOnePComment(playerComment.playerComNo, formData).then((data) => {
            console.log(data)
            alert("COMMENT MODIFY SUCCESS");
            window.location.reload();
            setRefresh(!refresh)
        });
    };

    return (
        <div className="flex flex-col items-center h-screen">
            {serverData.map((playerComment) => (
                <Card key={playerComment.playerComNo} color="transparent" shadow={false} className="w-full  mb-8 px-8 border border-gray-300 rounded-lg">
                    <CardHeader color="transparent" floated={false} shadow={false} className="mx-0 flex items-center gap-4 pt-0 pb-8">
                        <Avatar size="lg" variant="circular" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="team logo" />
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between">
                                <Typography variant="h5" color="blue-gray">{playerComment.comWriter}</Typography>
                                <div className="5 flex items-center gap-0">
                                    {isModify === playerComment.playerComNo ? (
                                        <Rating
                                            value={modifiedRecomNo}
                                            ratedColor="red"
                                            ratedIcon={<RatedIcon />}
                                            unratedIcon={<UnratedIcon />}
                                            name="recomNo"
                                            onChange={(newRecomNo) => setModifiedRecomNo(newRecomNo)}
                                        />
                                    ) : (
                                        <Rating
                                            value={playerComment.recomNo}
                                            ratedColor="red"
                                            ratedIcon={<RatedIcon />}
                                            unratedIcon={<UnratedIcon />}
                                            name="recomNo"
                                            readonly
                                        />
                                    )}
                                </div>
                            </div>
                            <Typography color="blue-gray">{playerComment.playerComNo}</Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="mb-6 p-0 flex justify-between items-start">
                        {isModify === playerComment.playerComNo ? (
                            <Textarea
                                label={playerComment.comment}
                                value={modifiedComment}
                                onChange={(e) => setModifiedComment(e.target.value)}
                            />
                        ) : (
                            <Typography>{playerComment.comment}</Typography>
                        )}
                        <div>
                            {userInfo.nick === playerComment.comWriter ? (
                                <div>
                                    {isModify === playerComment.playerComNo ? (
                                        <Button variant="text" className="flex items-center gap-2" onClick={() => handleConfirmModify(playerComment)}>
                                            Confirm{" "}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                            </svg>
                                        </Button>
                                    ) : (
                                        <Button variant="text" className="flex items-center gap-2" onClick={() => handleModify(playerComment)}>
                                            Modify{" "}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                            </svg>
                                        </Button>
                                    )}
                                    {isModify ? (
                                        <Button variant="text" className="flex items-center gap-2" onClick={() => handleCancel()}>
                                            Cancel{" "}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                            </svg>
                                        </Button>
                                    ) : (
                                        <Button variant="text" className="flex items-center gap-2" onClick={() => handleCommentDelete(playerComment.playerComNo)}>
                                            Remove{" "}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                            </svg>
                                        </Button>
                                    )}
                                </div>
                            ) : <></>}
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default PlayerCommentListComponent;

