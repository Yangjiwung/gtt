import { Suspense, lazy } from "react";
import authRouter from "./authRouter.js";
import newsRouter from "./newsRouter";
import ticketingRouter from "./ticketingRouter.js";
import playerRouter from "./playerRouter.js";
import Spin from "../test/pages/Spin";
import noticeRouter from "./noticeRouter";
import lolRouter from "./lolRouter";
import adminRouter from "./adminRouter.js";
import boardRouter from "./boardRouter";
import freeBoardRouter from "./freeBoardRouter";
import cartRouter from "./cartRouter";


const { createBrowserRouter } = require("react-router-dom");

const Loading = Spin;
const Main = lazy(()=>import("../pages/MainPage.js"));
const About = lazy(()=>import("../pages/AboutPage.js"));
const Login = lazy(() => import("../pages/loginAuth/Login.js"));
const SignIn = lazy(() => import("../pages/loginAuth/SignIn.js"));
const Member = lazy(() => import("../pages/member/Member.js"));
const Team = lazy(()=>import("../pages/teams/TeamPage"))
const NewsIndex=lazy(()=>import("../pages/news/IndexPage"));
const BoardIndex = lazy(()=>import("../pages/board/IndexPage"));
const FreeBoardIndex = lazy(()=>import("../pages/freeBoard/IndexPage"));
const Ticketing = lazy(() => import("../pages/ticketing/TicketingMain.js"));
const PlayerIndex = lazy(() => import("../pages/player/PlayerIndexPage"));
const LOLIndex = lazy(()=>import("../pages/leagueoflegend/LoLIndexPage"))
const Test = lazy(()=>import("../test/pages/TestPage.js"));
const GridTest = lazy(()=>import("../test/pages/GridTest"))
const NotFound = lazy(()=>import("../pages/error/404NotFound"))
const SidebarLayout = lazy(()=>import("../layouts/SidebarLayout.js"));
const NoticeIndex = lazy(()=> import("../pages/notice/NoticeIndexPage"))
const MyPage = lazy(() => import("../pages/loginAuth/MyPage"))
const MyPost = lazy(()=>import("../pages/loginAuth/MyPost"))
const KakaoRedirect = lazy(()=>import("../pages/loginAuth/KakaoRedirectPage"))
const AdminIndexPage = lazy(() => import("../pages/admin/AdminIndexPage"));
const Stadium = lazy(()=>import("../components/ticketing/Stadium"))
const CartMain = lazy(()=> import("../pages/cart/CartMain"))

const root = createBrowserRouter([
    {
        path:"spin",
        element:<Suspense fallback={Loading}><Spin /></Suspense>
    },
    {
        path:"test",
        element:<Suspense fallback={Loading}><Test /></Suspense>,
        errorElement:NotFound,
    },
    {
        path:"grid",
        element:<Suspense fallback={Loading}><GridTest/></Suspense>,
        errorElement:NotFound,
    },
    {
        path:"team",
        element:<Suspense fallback={Loading}><Team />></Suspense>,
        errorElement:NotFound,
    },
    {
        path: "",
        element:<Suspense fallback={Loading}><Main/></Suspense>,
        errorElement:NotFound,
    },
    {
        path:"login",
        element:<Suspense fallback={Loading}><Login/></Suspense>,
        errorElement:NotFound,
    },
    {
        path: "about",
        element: <Suspense fallback={Loading}><About/></Suspense>,
        errorElement:NotFound,
    },
    {
        path : "login",
        element : <Suspense fallback = {Loading}><Login/></Suspense>,
        children : authRouter(),
        errorElement:NotFound,
    },
    {
        path: "login/kakao",
        element: <Suspense fallback={Loading}><KakaoRedirect /></Suspense>
    },
    {
        path : "signIn",
        element : <Suspense fallback = {Loading}><SignIn/></Suspense>,
        children : authRouter(),
        errorElement:NotFound,
    },
    {
        path : "member",
        element : <Suspense fallback = {Loading}><Member/></Suspense>,
        children : authRouter(),
        errorElement:NotFound,
    },
    {
        path:"news",
        element:<Suspense fallback={Loading}><NewsIndex /></Suspense>,
        children:newsRouter(),
        errorElement:NotFound,
    },
    {
      path:"board",
      element:<Suspense fallback={Loading}><BoardIndex /></Suspense>,
      children:boardRouter(),
      errorElement:NotFound,
    },
    {
        path:"free",
        element:<Suspense fallback={Loading}><FreeBoardIndex/></Suspense>,
        children:freeBoardRouter(),
        errorElement:NotFound,
    },
    {
        path:"Ticketing",
        element:<Suspense fallback={Loading}><Ticketing /></Suspense>,
        children:ticketingRouter(),
        errorElement:NotFound,
    },
    {
        path:"player",
        element:<Suspense fallback={Loading}><PlayerIndex/></Suspense>,
        children: playerRouter(),
        errorElement:NotFound,
    },
    {
        path:"lol",
        element:<Suspense fallback={Loading}><LOLIndex /></Suspense>,
        children:lolRouter(),
        errorElement:NotFound,
    },
    {
        path: "*",
        element:NotFound,
        errorElement:NotFound,
    },
    {
        path:"sidebar",
        element:<Suspense fallback={Loading}><SidebarLayout/></Suspense>
    },
    {
        path:"grid",
        element:<Suspense fallback={Loading}><GridTest/></Suspense>
    },
    {
        path:"notice",
        element:<Suspense fallback={Loading}><NoticeIndex/></Suspense>,
        children: noticeRouter(),
        errorElement:NotFound,
    },
    {
        path:"myPage",
        element:<Suspense fallback={Loading}><MyPage/></Suspense>
    },
    {
        path: "admin",
        element: <Suspense fallback={Loading}><AdminIndexPage/></Suspense>,
        children: adminRouter(),
        errorElement: NotFound
    },
    {
        path:"myPost",
        element:<Suspense fallback={Loading}><MyPost/></Suspense>
    },
    {
        path:"stadium",
        element:<Suspense fallback={Loading}><Stadium/></Suspense>
    },
    {
        children:cartRouter(),
        path:"cart",
        element:<Suspense fallback={Loading}><CartMain/></Suspense>
    }
])

export default root;
