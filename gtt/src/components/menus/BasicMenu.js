import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    MenuHandler,
    Menu,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {useRecoilState, useResetRecoilState} from "recoil";
import {pageState} from "../../atoms/pageState";
import {userState} from "../../atoms/userState";
import {UserCircleIcon} from "@heroicons/react/16/solid";
import useUserAuth from "../../hooks/useUserAuth";

const BasicMenu = () =>{
    const [openNav, setOpenNav] = React.useState(false);
    const [refresh,setRefresh] = useState(false)
    const userInfo = useRecoilState(userState)
    const pageReset = useResetRecoilState(pageState)
    const navigate = useNavigate();
    const pathName = useLocation().pathname
    const {logout} = useUserAuth()
    // 로그인 페이지로 이동하는 메서드
    const moveToLogin = () => {
        navigate("/login");
    };
    // 회원가입 페이지로 넘어가는 메서드
    const moveToSign = () => {
        navigate("/signIn");
    }
    const moveToMyPage = () => {
        navigate("/myPage");
    }
    const moveToMyPost = () => {
        navigate("/myPost")
    }
    const moveToOrderList = () => {
        navigate("/cart/payment")
    }
    const moveToLogout = ()=>{
        if(window.confirm("로그아웃 하시겠습니까?")){
            logout()
            window.location.reload()
            setRefresh(!refresh)
            console.log(pathName)
            if(pathName&&pathName==="/myPage"){
                navigate("/")
            }
        }
    }
    useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setOpenNav(false),
        );
      }, [userInfo,refresh]);
  
    const NavList =(prop)=>{
        return(
            <ul className="my-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2">
                <Typography as="li" className="pr-4 text-2xl hover:text-blue-500 text-blue-gray-800">
                    <Link to={'/'} onClick={pageReset}>Main</Link>
                </Typography>
                <Typography as="li" className="pr-4 text-2xl hover:text-blue-500 text-blue-gray-800">
                    <Link to={'/about'} onClick={pageReset}>About</Link>
                </Typography>
                <Typography as="li" className="pr-4 text-2xl hover:text-blue-500 text-blue-gray-800">
                    <Link to={'/notice/list'} onClick={pageReset}>Notice</Link>
                </Typography>
                <Typography as="li" className="pr-4 text-2xl hover:text-blue-500 text-blue-gray-800">
                    <Link to={'/cart/list'} onClick={pageReset}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>

                    </Link>
                </Typography>
                {prop.children}
            </ul>
        );
    }
    return (
        <Navbar className="mx-auto max-w-full px-3 py-3">
            <div className="flex items-center justify-between text-black">
                <Link to={'/'} className={"px-2"}>
                    <img src={"/img/logo.png"} width={"w-1 h-1"}/>
                </Link>
                <div className="hidden lg:block">
                    <NavList>
                        {userInfo[0].nick === "Anonymous" ?
                            <div className="flex items-center gap-x-1">
                                <Button variant="outlined" size="md" color="blue-gray" onClick={moveToLogin} fullWidth>
                                    Log In
                                </Button>
                                <Button variant="gradient" size="md" onClick={moveToSign} className="whitespace-nowrap"
                                        fullWidth>
                                    Sign In
                                </Button>
                            </div>
                            : <div className="flex items-center gap-x-1">
                                <Menu className={"px-4"}>
                                    <MenuHandler>
                                        <UserCircleIcon className={"h-24"}></UserCircleIcon>
                                    </MenuHandler>
                                    <MenuList>
                                        <MenuItem className="flex items-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"  xmlns="http://www.w3.org/2000/svg">
                                                <path  fill-rule="evenodd"  clip-rule="evenodd" d="M9.48999 1.17C9.10999 -0.39 6.88999 -0.39 6.50999 1.17C6.45326 1.40442 6.34198 1.62213 6.18522 1.80541C6.02845 1.9887 5.83063 2.13238 5.60784 2.22477C5.38505 2.31716 5.1436 2.35564 4.90313 2.33709C4.66266 2.31854 4.42997 2.24347 4.22399 2.118C2.85199 1.282 1.28199 2.852 2.11799 4.224C2.65799 5.11 2.17899 6.266 1.17099 6.511C-0.390006 6.89 -0.390006 9.111 1.17099 9.489C1.40547 9.54581 1.62322 9.65719 1.80651 9.81407C1.98979 9.97096 2.13343 10.1689 2.22573 10.3918C2.31803 10.6147 2.35639 10.8563 2.33766 11.0968C2.31894 11.3373 2.24367 11.5701 2.11799 11.776C1.28199 13.148 2.85199 14.718 4.22399 13.882C4.42993 13.7563 4.66265 13.6811 4.90318 13.6623C5.14371 13.6436 5.38527 13.682 5.60817 13.7743C5.83108 13.8666 6.02904 14.0102 6.18592 14.1935C6.34281 14.3768 6.45419 14.5945 6.51099 14.829C6.88999 16.39 9.11099 16.39 9.48899 14.829C9.54599 14.5946 9.65748 14.377 9.8144 14.1939C9.97132 14.0107 10.1692 13.8672 10.3921 13.7749C10.6149 13.6826 10.8564 13.6442 11.0969 13.6628C11.3373 13.6815 11.57 13.7565 11.776 13.882C13.148 14.718 14.718 13.148 13.882 11.776C13.7565 11.57 13.6815 11.3373 13.6628 11.0969C13.6442 10.8564 13.6826 10.6149 13.7749 10.3921C13.8672 10.1692 14.0107 9.97133 14.1939 9.81441C14.377 9.65749 14.5946 9.546 14.829 9.489C16.39 9.11 16.39 6.889 14.829 6.511C14.5945 6.45419 14.3768 6.34281 14.1935 6.18593C14.0102 6.02904 13.8666 5.83109 13.7743 5.60818C13.682 5.38527 13.6436 5.14372 13.6623 4.90318C13.681 4.66265 13.7563 4.42994 13.882 4.224C14.718 2.852 13.148 1.282 11.776 2.118C11.5701 2.24368 11.3373 2.31895 11.0968 2.33767C10.8563 2.35639 10.6147 2.31804 10.3918 2.22574C10.1689 2.13344 9.97095 1.9898 9.81407 1.80651C9.65718 1.62323 9.5458 1.40548 9.48899 1.171L9.48999 1.17ZM7.99999 11C8.79564 11 9.55871 10.6839 10.1213 10.1213C10.6839 9.55871 11 8.79565 11 8C11 7.20435 10.6839 6.44129 10.1213 5.87868C9.55871 5.31607 8.79564 5 7.99999 5C7.20434 5 6.44128 5.31607 5.87867 5.87868C5.31606 6.44129 4.99999 7.20435 4.99999 8C4.99999 8.79565 5.31606 9.55871 5.87867 10.1213C6.44128 10.6839 7.20434 11 7.99999 11Z" fill="#90A4AE"/>
                                            </svg>
                                            <Typography variant="small" className="font-medium" onClick={() => moveToMyPage()}>
                                                Edit Profile
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"/>
                                            </svg>
                                            <Typography variant="small" className="font-medium" onClick={() => moveToMyPost()}>
                                                My Post
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                            </svg>
                                            <Typography variant="small" className="font-medium" onClick={() => moveToOrderList()}>
                                                주문 내역
                                            </Typography>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                                <Button variant="outlined" size="md" color="blue-gray" onClick={()=>moveToLogout()} fullWidth>
                                    Logout
                                </Button>
                            </div>
                        }
                    </NavList>
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2}/>
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList>
                    {userInfo[0].nick === "Anonymous" ?
                        <div className="flex items-center gap-x-1">
                            <Button variant="outlined" size="md" color="blue-gray" onClick={moveToLogin} fullWidth>
                                Log In
                            </Button>
                            <Button variant="gradient" size="md" onClick={moveToSign} className="whitespace-nowrap"
                                    fullWidth>
                                Sign In
                            </Button>
                        </div>
                        : <div className="flex items-center gap-x-1">
                            <Menu className={"px-4"}>
                                <MenuHandler>
                                    <UserCircleIcon className={"h-24"}></UserCircleIcon>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem className="flex items-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"  xmlns="http://www.w3.org/2000/svg">
                                            <path  fill-rule="evenodd"  clip-rule="evenodd" d="M9.48999 1.17C9.10999 -0.39 6.88999 -0.39 6.50999 1.17C6.45326 1.40442 6.34198 1.62213 6.18522 1.80541C6.02845 1.9887 5.83063 2.13238 5.60784 2.22477C5.38505 2.31716 5.1436 2.35564 4.90313 2.33709C4.66266 2.31854 4.42997 2.24347 4.22399 2.118C2.85199 1.282 1.28199 2.852 2.11799 4.224C2.65799 5.11 2.17899 6.266 1.17099 6.511C-0.390006 6.89 -0.390006 9.111 1.17099 9.489C1.40547 9.54581 1.62322 9.65719 1.80651 9.81407C1.98979 9.97096 2.13343 10.1689 2.22573 10.3918C2.31803 10.6147 2.35639 10.8563 2.33766 11.0968C2.31894 11.3373 2.24367 11.5701 2.11799 11.776C1.28199 13.148 2.85199 14.718 4.22399 13.882C4.42993 13.7563 4.66265 13.6811 4.90318 13.6623C5.14371 13.6436 5.38527 13.682 5.60817 13.7743C5.83108 13.8666 6.02904 14.0102 6.18592 14.1935C6.34281 14.3768 6.45419 14.5945 6.51099 14.829C6.88999 16.39 9.11099 16.39 9.48899 14.829C9.54599 14.5946 9.65748 14.377 9.8144 14.1939C9.97132 14.0107 10.1692 13.8672 10.3921 13.7749C10.6149 13.6826 10.8564 13.6442 11.0969 13.6628C11.3373 13.6815 11.57 13.7565 11.776 13.882C13.148 14.718 14.718 13.148 13.882 11.776C13.7565 11.57 13.6815 11.3373 13.6628 11.0969C13.6442 10.8564 13.6826 10.6149 13.7749 10.3921C13.8672 10.1692 14.0107 9.97133 14.1939 9.81441C14.377 9.65749 14.5946 9.546 14.829 9.489C16.39 9.11 16.39 6.889 14.829 6.511C14.5945 6.45419 14.3768 6.34281 14.1935 6.18593C14.0102 6.02904 13.8666 5.83109 13.7743 5.60818C13.682 5.38527 13.6436 5.14372 13.6623 4.90318C13.681 4.66265 13.7563 4.42994 13.882 4.224C14.718 2.852 13.148 1.282 11.776 2.118C11.5701 2.24368 11.3373 2.31895 11.0968 2.33767C10.8563 2.35639 10.6147 2.31804 10.3918 2.22574C10.1689 2.13344 9.97095 1.9898 9.81407 1.80651C9.65718 1.62323 9.5458 1.40548 9.48899 1.171L9.48999 1.17ZM7.99999 11C8.79564 11 9.55871 10.6839 10.1213 10.1213C10.6839 9.55871 11 8.79565 11 8C11 7.20435 10.6839 6.44129 10.1213 5.87868C9.55871 5.31607 8.79564 5 7.99999 5C7.20434 5 6.44128 5.31607 5.87867 5.87868C5.31606 6.44129 4.99999 7.20435 4.99999 8C4.99999 8.79565 5.31606 9.55871 5.87867 10.1213C6.44128 10.6839 7.20434 11 7.99999 11Z" fill="#90A4AE"/>
                                        </svg>
                                        <Typography variant="small" className="font-medium">
                                            Edit Profile
                                        </Typography>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            <Button variant="outlined" size="md" color="blue-gray" onClick={()=>moveToLogout()} fullWidth>
                                Logout
                            </Button>
                        </div>
                    }
                </NavList>
            </Collapse>
        </Navbar>
    );
}

export default BasicMenu;
