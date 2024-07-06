// 불러올 파일 import
import SidebarLayout from "../../layouts/SidebarLayout";
import { Button, Card, CardFooter, IconButton, Input, Tooltip, Typography } from "@material-tailwind/react";
import React, {useState, useEffect, useRef} from "react";
import { PencilIcon, TrashIcon, ArrowPathIcon, CheckIcon, PlusIcon } from "@heroicons/react/24/solid";
import { allTeam, addTeam, updateTeam, deleteTeam } from "../../api/teamApi";
import DropFiles from "../../components/common/DropFiles";
import {API_SERVER_HOST} from "../../api/filesApi";

// 테이블 머리부분에 들어가는 내용
const TABLE_HEAD = ["Team Image", "Team Name", "Actions"];

// 팀페이지 컴포넌트
const TeamPage = () => {
    // 상태관리
    const imageDiv = useRef();
    const [teams, setTeams] = useState([]);
    const [add, setAdd] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [editId, setEditId] = useState(null);
    const [newTeam, setNewTeam] = useState({ teamName: '', teamImage: "" });
    // 구성 요소가 마운트 해제되거나 효과가 다시 실행되기 전에 구독, 타이머, 이벤트 리스너 등을 정리하여 메모리 누수를 방지
    useEffect(() => {
        fetchTeams();
    }, [refresh]);
    // 팀 리스트 불러오기
    const fetchTeams = () => {
        allTeam()
            .then(response => {
                setTeams(response);
            })
            .catch(error => {
                console.error('Error fetching teams', error);
                setTeams([]);
            });
    }
    // 팀 추가
    const handleAddTeam = () => {
        // 새 팀 정보를 위한 로컬 변수 생성, newTeam 상태에서 복사
        let updatedTeam = { ...newTeam };
        // 이미지가 업로드된 경우, 이미지 파일 이름 추출 및 업데이트
        if (imageDiv.current) {
            const fileName = Array.from(imageDiv.current.children)[0].getAttribute("fileName");
            console.log("file", fileName); // 로그에 파일 이름 출력
            updatedTeam.teamImage = fileName; // 로컬 변수에 이미지 파일 이름 설정
        }
        // addTeam 함수를 호출하여 API를 통해 팀 추가 요청
        addTeam(updatedTeam)
            .then(resData => {
                // 요청이 성공하면, 새 팀 데이터로 상태 업데이트
                setTeams(prevTeams => [...prevTeams, resData]); // 상태에 새 팀 추가
                setAdd(false); // 추가 모드 해제
                setRefresh(!refresh)
                setNewTeam({ teamName: '', teamImage: "" }); // 입력 필드 초기화
            })
            .catch(error => {
                // 요청 실패 시 오류 로그 출력
                console.log("Failed to add team. Error: " + error.message);
            });
    };
    // 팀정보 수정
    const handleUpdateTeam = () => {
        let updatedTeam = { ...newTeam };  // 새 팀 객체를 만들고, 기존 newTeam의 정보를 복사해 입력
        // (imageDiv에서 최신 이미지 정보 확인)
        // imageDiv의 마지막 자식 요소를 가져와서, 즉 마지막에 추가된 이미지를 찾음
        const lastImage = imageDiv.current.lastElementChild;
        // 그 이미지의 fileName 속성을 읽음 이미지가 없으면 null 처리
        const newFileName = lastImage ? lastImage.getAttribute("fileName") : null;
        // 새 이미지 파일이 있으면 해당 이미지 newTeam 업데이트
        if (newFileName) {
            // 새 이미지 파일 이름이 있으면, 팀 정보에 업데이트
            updatedTeam.teamImage = newFileName;
        }
        // API 호출로 팀 정보를 업데이트
        updateTeam(editId, updatedTeam)
            .then(response => {
                const updatedTeams = teams.map(team =>
                    // 성공적으로 업데이트 되면, 모든 팀 리스트 중에서 현재 수정한 팀 정보만 새 정보로 교체
                    team.teamNo === editId ? { ...team, ...response } : team
                );
                // 수정된 전체 팀 리스트를 상태로 설정
                setTeams(updatedTeams);
                // 팀 ID를 초기화
                setEditId(null);
                // 입력폼 초기화
                setNewTeam({ teamName: '', teamImage: '' });
                // list 갱신
                setRefresh(!refresh);
            })
            .catch(error => {
                // 업데이트에 실패시 에러 메시지 출력
                console.log("Update Fail... " + error.message);
            });
    }
    // 팀정보 삭제
    const handleDeleteTeam = (id) => {
        deleteTeam(id)
            .then(response => { // 호출에 성공 했을시
                setTeams(prevTeams => [...prevTeams, response]);
                setRefresh(!refresh); // 상태를 새로고침
            })
            .catch(error => { // 호출에 실패 했을시
                console.log("Delete Fail... " + error.message);
            });
    }
    // 수정하기
    const startEdit = (team) => {
        setEditId(team.teamNo);
        setNewTeam({ teamName: team.teamName, teamImage: team.teamImage });
    };
    // 팀 정보 입력
    const handleInputChange = (e) => {
        setNewTeam(prev => ({ ...prev, teamName: e.target.value }));
    };
    // 수정취소
    const cancelEdit = () => {
        setEditId(null);
        setNewTeam({ teamName: '', teamImage: "" });
    }
    // 화면에서 보여질 HTML
    return (
        <SidebarLayout>
            <div>
                <Card>
                    <table onDrop={()=>console.log("table")}>
                        <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <tr>
                            {TABLE_HEAD.map(head => ( // 위의 변수에 저장된 테이블 헤드의 정보를 불러옴
                                <td key={head}><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">{head}</Typography></td>
                            ))}
                        </tr>
                        </thead>
                        <tbody onDrop={()=>console.log("tbody")}>
                        {teams.map(team => (
                            <tr key={team.teamNo}>
                                <td>
                                    {editId === team.teamNo ? (
                                        <DropFiles value={newTeam.teamImage} imageDiv={imageDiv} onChange={handleInputChange}/>
                                    ) : (
                                        <img
                                            src={team.teamImage ? `${API_SERVER_HOST}/api/files/${team.teamImage}` : "/img/no-image.png"}
                                            alt="Team Image"
                                            onError={(e) => e.target.src = "/img/no-image.png"} // 에러 발생 시 대체 이미지
                                            className="w-24 h-24 object-cover" // 이미지 크기 및 커버 설정
                                        />
                                    )}
                                </td>
                                <td className="col-start-3 col-end-10">
                                    {editId === team.teamNo ? (
                                        <Input value={newTeam.teamName} onChange={(e) => setNewTeam({ ...newTeam, teamName: e.target.value })} />
                                    ) : (
                                        <Typography>{team.teamName}</Typography>
                                    )}
                                </td>
                                <td className="col-start-10 col-end-12">
                                    <Tooltip content={editId === team.teamNo ? "Save Changes" : "Edit Team"}>
                                        <IconButton variant="text" onClick={() => editId === team.teamNo ? handleUpdateTeam() : startEdit(team)}>
                                            {editId === team.teamNo ? <CheckIcon className="h-4 w-4" /> : <PencilIcon className="h-4 w-4" />}
                                        </IconButton>
                                    </Tooltip>
                                    {editId === team.teamNo && (
                                        <Tooltip content="Cancel">
                                            <IconButton variant="text" onClick={cancelEdit}>
                                                <ArrowPathIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    <Tooltip content="Remove Team">
                                        <IconButton variant="text" onClick={() => handleDeleteTeam(team.teamNo)}>
                                            <TrashIcon className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                        {/*추가 버튼을 눌렀을때 tr 생성 */}
                        {add && (
                            <tr className={"col-start-1 col-end-3"}>
                                <td><DropFiles value={newTeam.teamImage} imageDiv={imageDiv}/></td>
                                <td><Input value={newTeam.teamName} onChange={handleInputChange} /></td>
                                <td>
                                    <IconButton onClick={handleAddTeam}><CheckIcon className="h-4 w-4"/></IconButton>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <CardFooter className="flex items-end justify-between border-t border-blue-gray-50 p-4">
                        <IconButton variant="text" onClick={() => setAdd(!add)}>
                            <PlusIcon className="h-4 w-4"/>
                        </IconButton>
                    </CardFooter>
                </Card>
            </div>
        </SidebarLayout>
    );
}

export default TeamPage;
