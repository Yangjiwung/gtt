import { Accordion, AccordionHeader, AccordionBody, Card, CardBody } from "@material-tailwind/react";
import React from "react";

const FooterComponent = () => {
    const [open, setOpen] = React.useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    // Accordion 데이터 배열 정의
    const accordionData = [
        {
            id: 1,
            title: "e스포츠 정보",
            content: ["예매", "선수단", "팬커뮤니티", "e스포츠뉴스"]
        },
        {
            id: 2,
            title: "사이트정보",
            content: ["릴리즈노트", "SNS", "제작참여", "오류제보"]
        },
        {
            id: 3,
            title: "정보문의",
            content: ["협력신청", "파트너리스트", "고객센터", "공지사항"]
        }
    ];

    return (
        <>
            <Card className="bg-gray-50 dark:bg-gray-900">
                <CardBody>
                    <div className="grid grid-cols-3 gap-5 p-15">
                        {accordionData.map((item) => (
                            <div key={item.id}>
                                <Accordion open={open === item.id}>
                                    <AccordionHeader onClick={() => handleOpen(item.id)}>
                                        {item.title}
                                    </AccordionHeader>
                                    <AccordionBody >
                                        {item.content.map((line, index) => (
                                            <p key={index}>{line}</p>
                                        ))}
                                    </AccordionBody>
                                </Accordion>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default FooterComponent;