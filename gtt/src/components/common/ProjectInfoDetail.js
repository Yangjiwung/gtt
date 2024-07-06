import {Card, IconButton, Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {FaBug, FaFilePowerpoint, FaGithub, FaProjectDiagram} from "react-icons/fa";

const ProjectInfoDetail = () => {

    return (
        <div className="mb-16 text-center lg:mb-28 w-full">
            <Typography variant="h1" color="blue-gray" className="my-2 !text-2xl lg:!text-3xl mb-6">
                프로젝트 관리사항
            </Typography>
            <div className="flex flex-wrap justify-center gap-4">
                <div>
                    <Card className="flex flex-col items-center mb-4 p-2">
                        프로젝트-레포지토리
                        <IconButton className="mt-3 mb-3">
                            <Link to="https://github.com/Sorune/ReactProject" className="mt-3 mb-3">
                                <FaGithub className="mt-2 text-2xl" />
                            </Link>
                        </IconButton>
                        프로젝트의 전체적인 관리를 담당합니다.
                    </Card>
                </div>
                <div>
                    <Card className="flex flex-col items-center mb-4 p-2">
                        엑셀-디버그
                        <IconButton className="mt-3 mb-3">
                            <Link to="https://docs.google.com/spreadsheets/d/1K__W738_YQg0yh3rkiwWCpVvQ2T4lJbCyXSIrWNiGRI/edit?usp=sharing" className="mt-3 mb-3">
                                <FaBug className="mt-2 text-2xl" />
                            </Link>
                        </IconButton>
                        오류사항 체크 및 점검사항 문서화 자료입니다.
                    </Card>
                </div>
                <div>
                    <Card className="flex flex-col items-center mb-4 p-2">
                        엑셀-프로젝트구조
                        <IconButton className="mt-3 mb-3">
                            <Link to="https://docs.google.com/spreadsheets/d/1cy7wGvsxCtF6VVV1Sz8xcvjUmFtRpRdB0JwZAXDE3JE/edit?usp=sharing" className="mt-3 mb-3">
                                <FaProjectDiagram className="mt-2 text-2xl" />
                            </Link>
                        </IconButton>
                        GTT프로젝트의 구조 문서화 자료입니다.
                    </Card>
                </div>
                <div>
                    <Card className="flex flex-col items-center mb-4 p-2">
                        PPT-발표자료
                        <IconButton className="mt-3 mb-3">
                            <Link to="https://docs.google.com/presentation/d/16qg9zVZI4_lOkWRWDRszbVpyA3_koDfQgV_KafeirFU/edit?usp=sharing" className="mt-3 mb-3">
                                <FaFilePowerpoint className="mt-2 text-2xl" />
                            </Link>
                        </IconButton>
                        GTT프로젝트 발표내용 자료입니다.
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ProjectInfoDetail;