import React, { useEffect, useState } from 'react';
import { Button, Card, Typography } from "@material-tailwind/react";
import {memberList, getMember, removeMember, updateMember, list} from "../../api/memberApi";
import { ConfirmDeleteDialog, EditMemberDialog, MemberDetailsDialog } from "../admin/AdminUserModal";
import {useRecoilState} from "recoil";
import {userState} from "../../atoms/userState";
import {tokenState} from "../../atoms/tokenState";

// 멤버 페이지 컴포넌트
const MemberList = () => {

    // 유저 정보
    const [userInfo] = useRecoilState(userState);
    const [tokenInfo] = useRecoilState(tokenState);

    // (상태관리)
    // 모달 열기 상태
    const [modalOpen, setModalOpen] = useState(false);
    // 삭제 확인 모달 열기 상태
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    // 수정 모달 열기 상태
    const [editModalOpen, setEditModalOpen] = useState(false);
    // 현재 선택된 회원 정보
    const [currentMember, setCurrentMember] = useState(null);
    // 회원 목록
    const [members, setMembers] = useState([]);
    // 삭제할 회원 번호
    const [memberToDelete, setMemberToDelete] = useState(null);
    // 리스트 갱신
    const [reloadFlag, setReloadFlag] = useState(false);
    // 활성화된 탭
    const [activeTab, setActiveTab] = useState(1);
    // 갱신
    const [refresh, setRefresh] = useState(false);

    // 이벤트 리스너 등을 정리
    // useEffect(() => {
    //     fetchMembers(tokenInfo);
    //     memberList(tokenInfo).then(data => {
    //         setMembers(data);
    //     })
    // }, [refresh]);
    useEffect(() => {
        console.log("Token info:", tokenInfo);  // 토큰 정보 확인
        fetchMembers(tokenInfo);
    }, [tokenInfo]);
    // 회원 리스트 출력
    const fetchMembers = (tokenInfo) => {
        memberList(tokenInfo.token).then(data => {
            console.log("Fetched members:", data);  // API로부터 받은 데이터 로깅
            setMembers(data);
        }).catch(error => {
            console.log("Failed to fetch members", error);
            setMembers([]);
        });
    };
    // 회원조회 모달
    const handleMemberClick = (memberId) => {
        getMember(memberId)
            .then(result => {
                setCurrentMember(result);
                setModalOpen(true);
            })
            .catch(error => {
                console.log('회원 정보 가져오기 실패', error);
            });
    }
    // 삭제 여부 모달
    const openDeleteModal = (memberId) => {
        setMemberToDelete(memberId);
        setDeleteModalOpen(true);
        setRefresh(!refresh);
    };
    // 회원 정보 삭제 메서드
    const handleDeleteMember = () => {
        removeMember(memberToDelete)
            .then(result => {
                if(result === "SUCCESS") {
                    setReloadFlag(!reloadFlag);
                    alert("Delete Success!");
                }
            })
            .catch(error => {
                console.log("Delete Fail... ", error);
            });
    }
    // 회원 정보 수정 모달 메서드
    const openEditModal = (member) => {
        setCurrentMember(member);
        setEditModalOpen(true);
    };
    // 회원 정보 수정 메서드
    const handleEditMember = (formData) => {
        updateMember(currentMember.num, formData)
            .then(result => {
                if(result === "SUCCESS") {
                    setReloadFlag(!reloadFlag);
                    alert('Modify Success!');
                }
                setEditModalOpen(false);
            })
            .catch(error => {
                console.log("Modify Fail... ", error);
            })
    }
    // 테이블 헤드 타이틀
    const renderTableHead = () => ["ID", "닉네임", "가입일", "수정일", "삭제여부", "수정여부"].map((head) => (
        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                {head}
            </Typography>
        </th>
    ));
    // 테이블 바디 데이터가 세팅되는 row 세팅 메서드
    const renderTableRows = () => members.map((member, index) => (
        <tr key={index} className="border-b border-blue-gray-50 p-4">
            <td onClick={() => handleMemberClick(member.num)}>{member.userId}</td>
            {activeTab === 1 && <td>{member.nick}</td>}
            {activeTab === 2 && <td>{member.joinDate}</td>}
            {activeTab === 3 && <td>{member.editDate}</td>}
            <td><Button onClick={() => openDeleteModal(member.num)}>삭제</Button></td>
            <td><Button color='orange' variant="gradient" onClick={() => openEditModal(member)}>수정</Button></td>
        </tr>
    ));
    // 상단 탭 메뉴
    const renderTabMenu = () => (
        <div className="flex border-b">
            <button className={`p-4 ${activeTab === 1 ? 'text-blue-500 border-blue-500' : 'text-gray-500 border-transparent'} border-b-2`} onClick={() => setActiveTab(1)}>
                전체 회원
            </button>
            <button className={`p-4 ${activeTab === 2 ? 'text-blue-500 border-blue-500' : 'text-gray-500 border-transparent'} border-b-2`} onClick={() => setActiveTab(2)}>
                활동 회원
            </button>
            <button className={`p-4 ${activeTab === 3 ? 'text-blue-500 border-blue-500' : 'text-gray-500 border-transparent'} border-b-2`} onClick={() => setActiveTab(3)}>
                비활동 회원
            </button>
        </div>
    );
    // 리턴 되는 HTML
    return (
        <div>
            <Card className="w-full overflow-hidden">
                {/* 상단 탭 */}
                {renderTabMenu()}
                <table className="min-w-max w-full text-left">
                    <thead className="sticky top-0 bg-white">
                    {/* 테이블 헤드 */}
                    {renderTableHead()}
                    </thead>
                    <tbody className="h-96 overflow-y-auto">
                    {/* 테이블 row(리스트 출력) */}
                    {renderTableRows()}
                    </tbody>
                </table>
            </Card>
            {/* 회원 상세정보 모달 */}
            <MemberDetailsDialog open={modalOpen} currentMember={currentMember} onClose={() => setModalOpen(false)}/>
            {/* 회원 삭제여부 모달 */}
            <ConfirmDeleteDialog open={deleteModalOpen} onDelete={handleDeleteMember} onClose={() => setDeleteModalOpen(false)}/>
            {/* 회원 수정내용 작성 모달 */}
            <EditMemberDialog open={editModalOpen} currentMember={currentMember} onSave={handleEditMember} onClose={() => setEditModalOpen(false)}/>
        </div>
    );
}

export default MemberList;