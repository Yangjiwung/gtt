import { useState, useEffect } from "react";
import BasicMenu from "../components/menus/BasicMenu";
import Sidebar from "../components/common/Sidebar";
import ReadPage from "../pages/news/ReadPage";
import SideCell from "../components/common/SideCell";
import {Button, Drawer} from "@material-tailwind/react";
import ChatComponent from "../components/common/chat/ChatComponent";

const SidebarLayout = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const openSidebar = ()=>setSidebar(!sidebar);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1080); // 가로 너비가 768px 이하이면 모바일로 판단
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // 컴포넌트가 마운트될 때 한 번 호출하여 초기값 설정

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {/* 기존 헤더 대신 BasicMenu */}
            <BasicMenu />
            {/* 상단 여백 my-5 제거 */}
                <div
                    className="bg-zinc-100 w-full flex flex-col flex px-8 py-4 gap-2 space-y-4  md:flex-row md:space-x-4 md:space-y-0 relative ">
                    {/* 첫 번째와 다섯 번째 열은 isMobile이 true일 때 hidden 클래스 추가 */}
                    <div className={`col-span-1 p-2 w-full max-w-[20rem]  ${isMobile ? "hidden" : "sticky left-0"} top-0 h-screen overflow-y-auto`}>
                        <Sidebar/>
                    </div>
                    <Drawer placement={"left"} open={sidebar} onClose={openSidebar} className={"p-4"}>
                        <Sidebar/>
                    </Drawer>
                    {/* 두 번째와 네 번째 열은 isMobile이 true일 때 hidden 클래스 추가 */}
                    <main className="bg-white w-full flex-grow md:col-span-2 m-0 relative">
                        {children}
                        <div className={`${isMobile ? "" : "hidden"} sticky bottom-10 left-0 z-20`}>
                            <Button onClick={openSidebar}>sidebar</Button>
                        </div>
                        <ChatComponent />
                    </main>
                    {/* 세 번째와 여섯 번째 열은 isMobile이 true일 때 hidden 클래스 추가 */}
                    <div className={`col-span-1 p-2 w-full max-w-[20rem] mt-20  ${isMobile ? "hidden" : "sticky right-0"} top-0 h-screen overflow-y-auto`}>
                        <SideCell/>
                    </div>
                </div>
        </>
    );
};

export default SidebarLayout;
