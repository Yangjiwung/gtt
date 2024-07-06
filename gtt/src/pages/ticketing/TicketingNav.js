import React, { useState } from 'react';
import { Avatar, Card, CardBody, Typography } from "@material-tailwind/react";

const TicketingNav = ({ onLeagueSelect }) => {
    // 선택된 리그 상태를 관리합니다.
    const [selectedLeague, setSelectedLeague] = useState(null);

    // 팀 데이터 배열 정의
    const league = [
        { name: "LCK", img: "/img/league/LCK.png", leagueNo: 183 },
        { name: "LCK CL", img: "/img/league/LCK_CL.png", leagueNo: 184 },
        { name: "LCK Academy Series", img: "/img/league/LCK_AS.png", leagueNo: 185 },
    ];

    // 팀을 선택할 때 호출되는 함수입니다.
    const handleTeamSelect = (league) => {
        // 선택된 리그 상태를 업데이트하고 부모 컴포넌트로 전달합니다.
        setSelectedLeague(league.leagueNo);
        onLeagueSelect(league.leagueNo);
    };

    return (
        <Card className="mb-6 w-full">
            <CardBody>
                <div className="grid col-auto gap-5">
                    <div className="col-start-1 col-end-2">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            예매하기
                        </Typography>
                    </div>
                </div>
                <div className="flex justify-center flex-wrap gap-6">
                    {league.map((league) => (
                        <div key={league.leagueNo} className="flex items-center gap-4 cursor-pointer" onClick={() => handleTeamSelect(league)} style={{ border: selectedLeague === league.leagueNo ? '2px solid skyblue' : 'none', padding: '4px', borderRadius: '50%' }}>
                            <Avatar className="bg-gray-200" src={league.img} alt={league.name} />
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
}

export default TicketingNav;
