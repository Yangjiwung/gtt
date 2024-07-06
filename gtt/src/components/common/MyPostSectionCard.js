import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import MyPostCardList from "./MyPostCardList";
import React from "react";
import PageComponent from "./PageComponent";
import useCustomMove from "../../hooks/useCustomMove";


export const MyPostSectionCard = ({pathName, serverData, sectionTitle }) => {
    const { moveToList } = useCustomMove();


    return (
        <Card shadow={false} className="bg-gray-100/50 rounded-2xl p-6 w-full">
            <CardHeader shadow={false} className="bg-gray-100/50 rounded-2xl pt-6">
                <Typography variant={"h3"}>{sectionTitle}</Typography>
            </CardHeader>
            <CardBody className="px-4 py-0 flex flex-wrap-reverse justify-between">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    {!serverData.error && serverData.dtoList.length > 0 && (
                        <MyPostCardList pathName={pathName} serverData={serverData} page={1} size={5} />
                    )}
                </table>
            </CardBody>
            <PageComponent serverData={serverData} movePage={moveToList} pathName={pathName} />
        </Card>
    );
};
