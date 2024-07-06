import React from "react";
import { Button, IconButton } from "@material-tailwind/react";

const PageComponet = ({ serverData, movePage, pathName }) => {
    console.log(serverData);
    return (
        <div className="m-6 flex justify-center">
            {
                serverData.prev ?
                    <Button variant="outlined" size="sm" onClick={() => movePage({ pathName: pathName ,pageParam:{ page: serverData.prevPage }})}>Previous</Button>
                    : <></>
            }
            {serverData.pageNumList.map(pageNum =>
                <IconButton
                    key={pageNum}
                    variant={`${serverData.current === pageNum ? 'outlined' : 'text'}`}
                    onClick={() => movePage({ pathName: pathName ,pageParam:{ page: pageNum }})}
                    size="sm">
                    {pageNum}
                </IconButton>
            )}
            {serverData.next ?
                <Button variant="outlined" size="sm" onClick={() => movePage({ pathName: pathName, pageParam: {page: serverData.nextPage}})}>Next</Button>
                : <></>
            }
        </div>
    );
};

export default PageComponet;