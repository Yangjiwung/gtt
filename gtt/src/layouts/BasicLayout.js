import BasicMenu from "../components/menus/BasicMenu";

const BasicLayout = ({children}) =>{
    return (
        <>
        {/* 기존 헤더 대신 BasicMenu */}
        <BasicMenu />
        {/* 상단 여백 my-5 제거 */}
        <div className="bg-white w-full h-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            {/* 상단 여백 py-40 변경 flex 제거 */}
            <main className="w-full px-5 py-5">
                {children}
            </main>
        </div>
        </>
    )
}

export default BasicLayout;
