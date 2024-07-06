import React, { useEffect, useState } from 'react';
import BasicMenu from "../components/menus/BasicMenu";
import AdminSideComponent from "../pages/admin/AdminSideComponent";
import FooterComponent from "../components/common/FooterComponent";

const AdminPageLayout = ({children}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // 가로 너비가 768px 이하이면 모바일로 판단
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // 컴포넌트가 마운트될 때 한 번 호출하여 초기값 설정

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {/* BasicMenu - header 영역 */}
            <BasicMenu/>
            {/* 본문영역, 그리드 레이아웃 적용 */}
            <div className={`grid grid-cols-1 ${isMobile ? 'md:grid-cols-1' : 'md:grid-cols-6'} gap-4`}>
                {/* 사이드바 영역 */}
                <div className={`col-span-1 p-2 ${isMobile ? "hidden" : "block"}`}>
                    <AdminSideComponent/>
                </div>
                {/* 메인 영역 */}
                <div className={`col-span-5`}>
                    {/* 가로 사이즈가 768px 이하일 때 나타나는 상단 탭메뉴 */}
                    <div className={`${isMobile ? "block" : "hidden"} mb-4`}>
                        {/* 이 부분에 모바일 메뉴나 추가적인 컴포넌트 배치 */}
                    </div>
                    {/* 멤버 메인 페이지 들어가는 곳 */}
                    <div className="p-5">
                        {children}
                    </div>
                </div>
            </div>
            {/* Footer 영역 */}
            <FooterComponent/>
        </>
    );
}

export default AdminPageLayout;