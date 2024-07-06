import {Typography} from "@material-tailwind/react";
import {ChevronUpDownIcon} from "@heroicons/react/24/outline";
import ListComponent from "../NewsComponent";
import {memo} from "react";


const ListTable = memo(({TABLE_HEAD,serverData, page, size, path}) =>{
    return(
            <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                <tr>
                    {TABLE_HEAD.map((head, index) => (
                        <th
                            key={head}
                            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                        >
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                            >
                                {head}{" "}
                                {index !== TABLE_HEAD.length - 1 && (
                                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                )}
                            </Typography>
                        </th>
                    ))}
                </tr>
                </thead>
                {serverData.dtoList.length >0 && (
                    <ListComponent serverData={serverData} page={page} size={size} path={path}/>)
                }
            </table>
    )
})

export default ListTable
