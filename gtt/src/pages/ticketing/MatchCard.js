import React, { useCallback, useEffect, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    Dialog,
    DialogBody,
    DialogHeader, Spinner,
    Typography
} from "@material-tailwind/react";
import { getTournament } from "../../api/lolAPI";
import KSPO from "../../components/ticketing/KSPO";
import Stadium from "../../components/ticketing/Stadium"

const MatchCard = ({selectedLeague}) => {
    const [tournament, setTournament] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [matchData, setMatchData] = useState(null)
    const [showDialog, setShowDialog] = useState(false);

    const handleOpenModal = useCallback((match) => {
        setMatchData(match)
        setOpenModal(true);
    }, []);

    const handleOpenDialog = () => {
        setShowDialog(true)
    };
    const handleCloseDialog = () => {
        setShowDialog(false);
    };


    useEffect(() => {
        const fetchTournamentData = async () => {
            setIsLoading(true);
            try {
                const tournamentData = await getTournament(selectedLeague);
                console.log("API data:", tournamentData);

                // 토너먼트 객체에 stadium 속성 추가
                const updatedTournament = {
                    ...tournamentData.tournament,
                    stadium: getRandomStadium()
                };
                setTournament(updatedTournament);
            } catch (error) {
                console.error("Error fetching tournament data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTournamentData();
    }, [selectedLeague]); // selectedLeague가 변경될 때마다 실행

    const getRandomStadium = () => {
        const stadiums = ["LOL PARK", "KSPO DOME"];
        return stadiums[Math.floor(Math.random() * stadiums.length)];
    };

    if (isLoading) {
        return <div className="flex justify-center min-h-[250px] p-20"><Spinner color="blue" className="h-16 w-16 text-gray-900/50" /></div>
    }

    if (!tournament) {
        return <div className="flex justify-center min-h-[250px] p-20"><Typography variant="h3">현재 예매가능한 경기가 없습니다.</Typography></div>

    }

    return (
        <div>
            {tournament.matches.length > 0 ? (
                tournament.matches.map((match, index) => (
                    <Card key={match.matchId} className="mb-4"
                          style={{
                              height: "150px",
                              backgroundImage: `linear-gradient(rgba(128, 128, 128, 0.0), rgba(128, 128, 128, 0.3)), url(${
                                  (() => {
                                      switch (tournament.id) {
                                          case 183:
                                              return '/img/league/LCK_bg.png';
                                          case 184:
                                              return '/img/league/LCK_CL_bg.png';
                                          case 185:
                                              return '/img/league/LCK_AS_bg2.png';
                                          default:
                                              return '/img/league/LCK_bg.png/default.png'; // 기본값 설정
                                      }
                                  })()
                              })`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundColor: 'rgb(255,255,255)' // 기본적인 배경색 설정
                          }}>
                        <CardBody>
                            <div className="row-start-1 items-center text-center mb-0">
                                <Typography variant="h6" color="white">
                                    <small>{tournament.name}</small>
                                </Typography>
                            </div>
                            <div className="grid grid-cols-8 gap-5 flex items-center">
                                <div className="col-start-1 col-end-2 ">
                                    <Typography variant="h6" color="white">
                                        <small>{match.matchDate}</small>
                                    </Typography>
                                </div>

                                <div className="col-start-2 col-end-3 ">
                                    <Typography variant="h6" color="white">
                                        {tournament.stadium}
                                    </Typography>
                                </div>

                                <div className="col-start-3 col-end-9 flex justify-center">
                                    <Typography variant="h4" color="white">
                                        {match.serverTeam1.teamName} <small>vs</small> {match.serverTeam2.teamName}
                                    </Typography>
                                </div>
                                <div className="col-start-9 flex justify-end w-full">
                                    <Button onClick={() => handleOpenModal(match)} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl">
                                        예매
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))
            ) : (
                <div className="flex justify-center min-h-[250px] p-20"><Typography variant="h3">현재 예매가능한 경기가 없습니다.</Typography></div>
            )}

            <Dialog open={openModal} onClose={() => {
                setOpenModal(false)
                setMatchData(null)
            }} handler={handleOpenModal}>
                <Dialog.Header
                    className="rounded-t-lg flex justify-between bg-gradient-to-r from-cyan-500 to-blue-500 bg-gradient-to-bl items-center">
                    <Typography color="white" variant="h4">
                        예매 정보 <small>{tournament.name}</small>
                    </Typography>
                </Dialog.Header>
                <Dialog.Body>
                    {tournament && matchData && (
                        <div>
                            <Typography variant="h6">
                                <p>{matchData.matchDate}</p>
                                <p>{tournament.stadium}</p>
                            </Typography>
                            {matchData && (
                                <Typography variant="h5">
                                    {matchData.serverTeam1.teamImg}{matchData.serverTeam1.teamName} vs {matchData.serverTeam2.teamImg}{matchData.serverTeam2.teamName}
                                </Typography>
                            )}
                        </div>
                    )}
                </Dialog.Body>
                <Dialog.Footer>
                    <Button onClick={() => {
                        handleOpenDialog(matchData);
                        setOpenModal(false);
                    }}>예매</Button>
                    <Button onClick={() => {
                        setOpenModal(false)
                    }}>닫기</Button>
                </Dialog.Footer>
            </Dialog>

            {/*좌석선택*/}
            <Dialog size="lg" className="w-full" open={showDialog} handler={handleCloseDialog}>
                <DialogHeader
                    className="rounded-t-lg flex justify-between bg-gradient-to-r from-cyan-500 to-blue-500 bg-gradient-to-bl items-center">
                    <div className="flex items-center">
                        <Typography color="white" variant="h3" className="mr-4">
                            예매하기
                        </Typography>
                        <div>
                            <Typography color="white" variant="h5">{tournament.name} -</Typography>
                        </div>
                        {matchData && (
                            <Typography variant="h5" color="white">
                                {matchData.serverTeam1.teamName} vs {matchData.serverTeam2.teamName}
                            </Typography>
                        )}
                    </div>
                    <Button variant="gradient" color="red" size="sm" onClick={handleCloseDialog}>
                        X
                    </Button>
                </DialogHeader>
                <DialogBody className="overflow-hidden ">
                    <div className="max-w-full max-h-full h-[34.5rem]">
                        {tournament.stadium === "LOL PARK" ? <Stadium matchData={matchData} stadium={tournament.stadium} /> : <KSPO matchData={matchData} stadium={tournament.stadium}/>}
                        {/* 예매 정보 추가 */}
                    </div>
                </DialogBody>
            </Dialog>
        </div>
    );
};

export default MatchCard;
