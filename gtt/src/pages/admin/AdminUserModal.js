// MemberDetailsDialog.js
import {Button, Dialog} from "@material-tailwind/react";

export const MemberDetailsDialog = ({ open, currentMember, onClose }) => {
    if (!open) return null;
    return (
        <Dialog open={open} onClose={onClose}>
            <Dialog.Header>회원 상세정보</Dialog.Header>
            <Dialog.Body>
                {currentMember && (
                    <div>
                        <p>ID: {currentMember.userId}</p>
                        <p>PW: {currentMember.pass}</p>
                        <p>Nickname: {currentMember.nick}</p>
                        <p>Email: {currentMember.email}</p>
                        <p>Phone: {currentMember.phone}</p>
                        <p>Birth: {currentMember.birth}</p>
                        <p>ZoneCode: {currentMember.zoneCode}</p>
                        <p>Address: {currentMember.address}</p>
                        <p>AddrSube: {currentMember.addrSub}</p>
                    </div>
                )}
            </Dialog.Body>
            <Dialog.Footer>
                <Button onClick={onClose}>닫기</Button>
            </Dialog.Footer>
        </Dialog>
    );
};

// ConfirmDeleteDialog.js
export const ConfirmDeleteDialog = ({ open, onDelete, onClose }) => {
    if (!open) return null;
    return (
        <Dialog open={open} onClose={onClose}>
            <Dialog.Header>삭제 확인</Dialog.Header>
            <Dialog.Body>
                정말로 삭제하시겠습니까?
            </Dialog.Body>
            <Dialog.Footer>
                <Button onClick={onDelete}>삭제</Button>
                <Button onClick={onClose}>취소</Button>
            </Dialog.Footer>
        </Dialog>
    );
};

// EditMemberDialog.js
export const EditMemberDialog = ({ open, currentMember, onSave, onClose }) => {
    if (!open) return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            userId: e.target.userId.value,      // 유저 아이디
            password: e.target.password.value,  // 유저 비밀번호
            nick: e.target.nick.value,          // 유저 닉네임
            email: e.target.email.value,        // 유저 이메일
            phone: e.target.phone.value,        // 유저 휴대폰
            birth: e.target.birth.value,         // 유저 생년월일
            zoneCode: e.target.zoneCode.value,  // 유저 우편번호
            address: e.target.address.value,    // 유저 주소
            addrSub: e.target.addrSub.value,    // 유저 나머지 주소
        };
        onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Dialog.Header>회원 정보 수정</Dialog.Header>
            <Dialog.Body>
                <form onSubmit={handleSubmit}>
                    <input name="userId" defaultValue={currentMember?.userId} required />
                    <input name="password" defaultValue={currentMember?.password} required />
                    <input name="nick" defaultValue={currentMember?.nick} required />
                    <input name="email" defaultValue={currentMember?.email} required />
                    <input name="phone" defaultValue={currentMember?.phone} required />
                    <input name="birth" defaultValue={currentMember?.birth} required />
                    <input name="zoneCode" defaultValue={currentMember?.zoneCode} required />
                    <input name="address" defaultValue={currentMember?.address} required />
                    <input name="addrSub" defaultValue={currentMember?.addrSub} required />
                    <hr/>
                    <Button type="submit">저장</Button>
                </form>
            </Dialog.Body>
            <Dialog.Footer>
                <Button onClick={onClose}>닫기</Button>
            </Dialog.Footer>
        </Dialog>
    );
};