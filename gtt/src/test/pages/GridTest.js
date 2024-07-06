import {CommentCell} from "../../components/common/CommentCell";
import CommentInputCell from "../../components/common/CommentInputCell";
import ContentHeader from "../../components/common/ContentHeader";
import ContentBody from "../../components/common/ContentBody";
import SidebarLayout from "../../layouts/SidebarLayout";
const GridTest = () => {
    return (
        <SidebarLayout>
            <div className="grid grid-rows-3 grid-cols-9 gap-4">
                <div className="col-start-1 col-end-8 row-span-4">
                    <ContentHeader  /> {/* 헤더 높이 조절 */}
                </div>
                <div className="col-start-3 col-end-8 auto-rows-auto">
                    <ContentBody />
                </div>
                <div className="col-start-3 col-end-8 row-span-3">
                    <CommentInputCell />
                </div>
                <div className="col-start-3 col-end-8 auto-rows-auto">
                    <CommentCell />
                </div>
                <div className="col-start-1">
                    <div className="p-4 shadow-sm bg-purple-500 w-16 h-16 rounded-full flex justify-center items-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                             stroke="currentColor" className="w-6 h-6 items-center">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"/>
                        </svg>
                    </div>
                    <div className="p-4 shadow-sm bg-purple-500 w-16 h-16 rounded-full flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                        </svg>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
};

export default GridTest;
