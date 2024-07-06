import React, { useState, useMemo } from 'react';
import { Button } from "@material-tailwind/react";
import MatchCard from "./MatchCard";
import TicketingNav from "./TicketingNav";

const teams = [
    "Gen.G", "SKT1", "Hanwha Life Esports", "kt Rolster", "Dplus KIA",
    "KWANGODNG FREECS", "FearX", "Nongshim RedForce", "DRX", "OKSavingBank BRION"
];

const startDate = new Date(2024, 4, 6);

const generateGames = () => {
    const games = [];
    for (let i = 0; i < teams.length; i++) {
        for (let j = 0; j < 10; j++) {
            let opponent = teams[(i + j + 1) % teams.length];
            let matchDate = new Date(startDate.getTime() + j * 7 * 24 * 60 * 60 * 1000);
            games.push({
                team: teams[i],
                matchDate: matchDate.toLocaleDateString('ko-KR'),
                matchHour: "17:00",
                matchName: "LCK 스프링",
                matchRound: `${j + 1}라운드`,
                matchOpponent: `vs ${opponent}`
            });
        }
    }
    return games;
};

const games = generateGames();

const TicketingPage = () => {
    // 선택된 리그 상태를 관리합니다.
    const [selectedLeague, setSelectedLeague] = useState(null);

    // 선택된 리그에 해당하는 경기를 필터링합니다.
    const filteredGames = useMemo(() => games.filter(game => game.team === selectedLeague), [selectedLeague]);

    // 페이지당 보여질 게임 수입니다.
    const gamesPerPage = 4;
    // 현재 페이지 상태를 관리합니다.
    const [currentPage, setCurrentPage] = useState(1);

    // 현재 페이지에 보여질 게임 목록을 계산합니다.
    const paginatedGames = useMemo(() => {
        const startIndex = (currentPage - 1) * gamesPerPage;
        const endIndex = startIndex + gamesPerPage;
        return filteredGames.slice(startIndex, endIndex);
    }, [currentPage, filteredGames]);

    // 전체 페이지 수를 계산합니다.
    const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

    // 페이지 변경 함수입니다.
    const changePage = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

    // 선택된 리그를 업데이트하는 함수입니다.
    const handleLeagueSelect = (leagueNo) => {
        setSelectedLeague(leagueNo)
    }

    return (
        <div>
            {/* TicketingNav 컴포넌트에 선택된 리그를 전달합니다. */}
            <TicketingNav onLeagueSelect={handleLeagueSelect} />
            {/* MatchCard 컴포넌트에 선택된 리그를 전달합니다. */}
            <MatchCard selectedLeague={selectedLeague} />
            {/* Pagination */}
            <div className="flex justify-center space-x-2 mt-4">
                <Button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>이전</Button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button key={index} onClick={() => setCurrentPage(index + 1)} className={index + 1 === currentPage ? 'bg-blue-700' : ''}>
                        {index + 1}
                    </Button>
                ))}
                <Button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>다음</Button>
            </div>
        </div>
    );
}

export default TicketingPage;
