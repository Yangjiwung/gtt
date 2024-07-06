import React, {useEffect, useRef, useState} from "react";
import BasicLayout from "../../layouts/BasicLayout";
import {CommentCell} from "../../components/common/CommentCell";
import CommentInputCell from "../../components/common/CommentInputCell";
import ContentHeader from "../../components/common/ContentHeader";
import ContentBody from "../../components/common/ContentBody";
import UploadComponent from "../../components/common/UploadComponent";
import DropFiles from "../../components/common/DropFiles";
import CustomCarousel from "../../components/common/CustomCarousel";
import {Button} from "@material-tailwind/react";
import QuilEditor from "../../components/common/quill/QuilEditor";
import QuilEditorReadOnly from "../../components/common/quill/QuillEditorReadOnly";
import SidebarLayout from "../../layouts/SidebarLayout";
// 회원정보 U,D(CRUD중) TEST
import ChatComponent from "../../components/common/chat/ChatComponent";
import ChatListComponent from "../../components/common/chat/ChatListComponent";
import KakaoLoginComponent from "../../components/user/KakaoLoginComponent";

const TestPage = () => {
    const slides = [
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
    ];

    const quillEditorRef = useRef()
    const ReadQuillRef = useRef();

    const handleSave = () => {
        if (quillEditorRef.current) {
            const quillInstance = quillEditorRef.current.getEditor();
            const content = quillInstance.getContents();
            console.log(content); // 에디터의 전체 텍스트 내용 로그 출력
            console.log(JSON.stringify(content.ops))
            const ReadQuillInstance = ReadQuillRef.current.getEditor();
            ReadQuillInstance.setContents(content)
            // 여기에 axios를 사용하여 서버와 통신하는 로직을 추가할 수 있습니다.
        }
    };

    return (
        <SidebarLayout>
            <p>컨텐츠 헤더</p>
            <ContentHeader/>
            <p>컨텐츠 바디</p>
            <ContentBody teamName={"T1"}/>
            <p>댓글 작성</p>
            <CommentInputCell/>
            <p>댓글 보기</p>
            <CommentCell writer={"양지웅"} position={"Developer"} content={"테스트 내용입니다"}/>
            <p>파일 입력</p>
            <UploadComponent/>
            <p>Editor</p>
            <QuilEditor ref={quillEditorRef} />
            <Button onClick={handleSave}>save</Button>
            <p>Editor ReadOnly</p>
            <QuilEditorReadOnly ref={ReadQuillRef}/>
            <p>Drop Down</p>
            <DropFiles/>
            <p>Custom Carousel</p>
            <CustomCarousel>
                {[...slides.map((s) => (
                    <img key={s} src={s}/>
                ))]}
            </CustomCarousel>
            <p>유저정보 보기모달 레이아웃</p>
            {/*  ---- 회원 ----  */}
                <hr className="my-5" />
            <p>채팅 메뉴</p>
            <ChatComponent/>
            <p>채팅방 리스트</p>
            <ChatListComponent/>
            <p>카카오 로그인</p>
            <KakaoLoginComponent />
        </SidebarLayout>
    )
}

export default TestPage;
