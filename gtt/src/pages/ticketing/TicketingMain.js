import TicketingPage from "./TicketingPage";
import SidebarLayout from "../../layouts/SidebarLayout";
import {useState} from "react";

const TicketingMain = () => {
    const [selectedTeam, setSelectedTeam] = useState(null);

    return (
        <SidebarLayout>
            <div>

                <div className="grid col-auto gap-5 mt-6 p-6">
                {/*    <div className="col-start-1 col-end-2">
                         티켓팅 메인 사이드
                        <TicketingSide></TicketingSide>
                    </div>*/}
                    <div className="col-start-1 col-end-4 justify-center">
                        {/* 티켓팅 메인 본문 */}
                        <TicketingPage selectedTeam={selectedTeam} ></TicketingPage>
                    </div>
                </div>
            </div>
        </SidebarLayout>

    );
}

export default TicketingMain;