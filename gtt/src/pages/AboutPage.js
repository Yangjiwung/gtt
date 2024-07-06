import BasicLayout from "../layouts/BasicLayout";
import {Card, IconButton, Typography} from "@material-tailwind/react";
import {TeamCard} from "../components/common/TeamCard";
import ProjectInfoDetail from "../components/common/ProjectInfoDetail";
import ProjectImageComponent from "../components/common/ProjectImageComponent";

const members = [
    {
        img: `/img/bongo-cat.gif`,
        name: "남태욱",
        title: "Team Leader",
        git:"https://github.com/Sorune",
        review: "React에 대해서 처음 접하고 컴포넌트의 분리 및 재사용 측면에서 React가 생산성 측면에서 높은 점수를 가지고 있다는 것을 깨달았습니다. 또한 SpringBoot 와 Node.js 서버를 둘 다 운영해보며 프로그래밍에 대해서 전반적으로 잘 이해하게 되었습니다.\n" +
            "\n" +
            "특히 컴포넌트의 렌더링과 전역 변수 사용, SpringBoot 서버와 React간의 비동기 통신을 통해 LifeCycle에 대한 이해와 프론트, 백엔드 간의 긴밀한 협업이 필요한 이유에 대해서 깨달았습니다.\n" +
            "\n" +
            "추후에는 python의 flask 서버도 제대로 운영하며 데이터 구조 및 통신에 대해서 좀 더 공부해 볼 예정입니다.\n"
    },
    {
        img: `/img/bonobono.gif`,
        name: "이서준",
        title: "Team Sub Leader",
        git:"https://github.com/lsj0317",
        review: "마지막 프로젝트를 준비하면서\n" +
            "어려웠던 부분들도 있었지만\n" +
            "프로젝트를 만들면서 겪었던 어려움과\n" +
            "깨달음을 반복하면서 한층 더 성장하는\n" +
            "계기가 되었습니다\n" +
            "또한, 백엔드와 프론트엔드를 각각의 서버로 사용하면서 개발을 하게되어서\n" +
            "실무에서 파트를 나눠서 작업을 하는 이유와 프론트엔드와 백엔드를 연결하는 API호출에 관련해서도 어느정도 이지만 이해가 되었던 계기가 되었습니다\n" +
            "왜 많은 개발자들이 React라는 잘 짜여진 프레임 워크를 사용하는지와 컴포넌트 단위의 개발과 랜더링 및 재사용성이 용이한 리액트를 많이 사용하는지도 알 수 있었습니다\n" +
            "Java를 배우면서 왜 SpringBoot를 배우기 위해 그간의 과정들을 겪었는지도 조금은 이해 할 수 있었습니다 "
    },
    {
        img: `/img/뽀빠이.gif`,
        name: "양지웅",
        title: "Team Member",
        git:"https://github.com/Yangjiwung",
        review: "Spring과 비슷한 점도 많았지만 다른 부분도 분명히 있었지만 큰 틀은 비슷하다는 것을 알았습니다.\n" +
            "프로젝트를 진행하면서 어느정도 적응하고나니 boot의 의존성이 편리하다고 느꼈습니다.\n" +
            "\n" +
            "처음 진행하는 React 프로젝트라 .\n" +
            "물론 아직 부족하지만 차차 하나씩 알아가는 중입니다.\n"
    },
    {
        img: `/img/jerry.gif`,
        name: "전필우",
        title: "Team Member",
        git:"https://github.com/5516146",
        review: "실히 Spring과 차별화된 간편함을 느낄 수 있었고, 구현하기에도 편하였습니다.\n" +
            "\n" +
            "REACT를 처음 사용하였는데 사용법을 익히는 것에 힘들었지만 익숙해지고 나니까 편하게 개발할 수 있었습니다.\n" +
            "\n" +
            "또한 지금까지 배운 것들의 총 집합같은 느낌의 프로젝트여서 프로젝트를 진행하면서 더욱 재밌게 진행할 수 있었습니다\n"
    },
];

const AboutPage = ()=>{
    return (
        <BasicLayout>
            <section className="min-h-screen py-8 px-8 lg:py-28">
                <div className="container mx-auto">
                    <div className="mb-16 text-center lg:mb-28">
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="text-lg"
                        >
                            Meet the Team
                        </Typography>
                        <Typography
                            variant="h1"
                            color="blue-gray"
                            className="my-2 !text-2xl lg:!text-4xl"
                        >
                            GTT 프로젝트 팀원을 소개합니다
                        </Typography>
                        <div className="text-left mt-6">
                            <Typography variant="h6"  className="mx-auto w-full !text-gray-500 max-w-4xl">
                                조장 남태욱 : 전체적인 프로젝트 기획 및 라이브러리 관리, 폴더 구조 관리, 스프링 시큐리티 및 JWT 사용
                            </Typography>
                            <Typography variant="h6"  className="mx-auto w-full !text-gray-500 max-w-4xl">
                                부조장 이서준 : 버그리포팅 및 프로젝트의 전반적인 work-flow관리, 로그인 처리 및 검증 로직
                            </Typography>
                            <Typography variant="h6"  className="mx-auto w-full !text-gray-500 max-w-4xl">
                                팀원 양지웅 : 전반적인 디자인, 화면 구성, 게시판 작성. UI 이벤트 및 예매, 결제 로직 작성
                            </Typography>
                            <Typography variant="h6"  className="mx-auto w-full !text-gray-500 max-w-4xl">
                                팀원 전필우 : 게시판 작성 및 API 통신 구현, API 서버 작성 및 쿼리 작성
                            </Typography>
                        </div>
                    </div>
                    <ProjectInfoDetail/>
                    <ProjectImageComponent/>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {members.map((props, key) => (
                            <TeamCard key={key} {...props} />
                        ))}
                    </div>
                </div>
            </section>
        </BasicLayout>
    );
}

export default AboutPage;