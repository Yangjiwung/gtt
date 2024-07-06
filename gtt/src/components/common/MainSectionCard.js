import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import CardListComponent from "./CardListComponent";
import React from "react";

export const MainSectionCard =({serverData,sectionTitle,path}) =>{
    return (
        <Card shadow={false} className="bg-gray-100/50 rounded-2xl p-6 overflow-auto">
            <CardHeader shadow={false} className="bg-gray-100/50 rounded-2xl pt-6">
                <Typography variant={"h3"}>{sectionTitle}</Typography>
            </CardHeader>
            <CardBody className="px-4 py-0 flex flex-wrap-reverse justify-between items-center">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    {!serverData.error&&serverData.dtoList.length >0 && (
                        <CardListComponent serverData={serverData} page={1} size={5} path={path}/>)
                    }
                </table>
            </CardBody>
        </Card>
    );
}