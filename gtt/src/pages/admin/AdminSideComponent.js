import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionHeader, AccordionBody, Card, Typography, List, ListItemPrefix } from "@material-tailwind/react";
import {PresentationChartBarIcon, ShoppingBagIcon, UserCircleIcon, Cog6ToothIcon, InboxIcon, PowerIcon} from "@heroicons/react/24/solid";
import { useResetRecoilState } from "recoil";
import { pageState } from "../../atoms/pageState";

const AdminSideComponent = () => {
    const navigate = useNavigate();
    const pageReset = useResetRecoilState(pageState);
    const [open, setOpen] = useState(0);

    const menuItems = [
        {
            id: 1,
            title: "회원관리",
            icon: <UserCircleIcon className="h-5 w-5" />,
            links: [
                { title: "회원리스트", path: "/admin/list" },
                { title: "회원추가", path: "/admin/memAdd" },
                { title: "로그인테스트", path: "/admin/memLoginTest" },
                { title: "회원설정", path: "/admin/memSet" }
            ]
        },
        {
            id: 2,
            title: "방문자",
            icon: <PresentationChartBarIcon className="h-5 w-5" />,
            links: [
                { title: "연간통계", path: "/admin/year" },
                { title: "월간통계", path: "/admin/month" },
                { title: "주간통계", path: "/admin/weekly" },
                { title: "일간통계", path: "/admin/daily" }
            ]
        },
        {
            id: 3,
            title: "메일",
            icon: <InboxIcon className="h-5 w-5" />,
            links: [
                { title: "수신확인", path: "/admin/inbox" },
                { title: "발신확인", path: "/admin/outbox" },
                { title: "메일쓰기", path: "/admin/compose" },
                { title: "메일설정", path: "/admin/mailSet" }
            ]
        },
        {
            id: 4,
            title: "구매관리",
            icon: <ShoppingBagIcon className="h-5 w-5" />,
            links: [
                { title: "티켓팅확인", path: "/admin/order" },
                { title: "입금확인", path: "/admin/payment" },
                { title: "발송확인", path: "/admin/dispatch" },
                { title: "사용확인", path: "/admin/shopping" }
            ]
        },
        {
            id: 5,
            title: "사이트설정",
            icon: <Cog6ToothIcon className="h-5 w-5" />,
            links: [
                { title: "API설정", path: "/admin/api" },
                { title: "디자인설정", path: "/admin/design" },
                { title: "광고설정", path: "/admin/ad" },
                { title: "서버설정", path: "/admin/server" }
            ]
        },
    ];

    const handleOpen = (id) => setOpen(open === id ? 0 : id);

    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-6 shadow-xl shadow-blue-gray-900/5 overflow-hidden">
            <div className="mb-2 p-2">
                <Typography variant="h5" color="blue-gray" component="a" onClick={() => { pageReset(); navigate('/admin/') }}>
                    관리자메뉴
                </Typography>
            </div>
            <List className="p-0 min-w-[200px]">
                {menuItems.map((item) => (
                    <Accordion key={item.id} open={open === item.id}>
                        <AccordionHeader onClick={() => handleOpen(item.id)}>
                            <ListItemPrefix>{item.icon}</ListItemPrefix>
                            {item.title}
                        </AccordionHeader>
                        <AccordionBody className="text-center">
                            {item.links.map(link => (
                                <Typography key={link.title} component="a" onClick={() => { pageReset(); navigate(link.path) }}>
                                    {link.title}
                                </Typography>
                            ))}
                        </AccordionBody>
                    </Accordion>
                ))}
                <Typography className={`flex`}>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    관리자모드종료
                </Typography>
            </List>
        </Card>
    );
};

export default AdminSideComponent;