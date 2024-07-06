import {Avatar, Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import React from "react";
import useCustomMove from "../../hooks/useCustomMove";


export const PlayerCardSection = ({player,moveToRead})=>{
    return(
        <Card
            className="relative grid h-[15rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-t from-black/80 via-black/50"
            onClick={() => moveToRead({
                pathName: '/player/read',
                num: player.id,
            })}
        >
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                style={{
                    position: 'absolute',
                    inset: 0,
                    margin: 0,
                    height: '100%',
                    width: '100%',
                    borderRadius: 0,
                    backgroundImage: `url('../img/players/${player.nickName}.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <CardBody className="relative py-14 px-6 md:px-12 opacity-0 hover:opacity-100">

                <Typography
                    variant="h4"
                    color="white"
                    className="mb-0 font-extrabold leading-[4.0]"
                >
                    {player.nickName}
                </Typography>

                {/*팀 이미지 매칭*/}
                <div style={{
                    width: '75px',
                    height: '75px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Avatar
                        key={player.id}
                        size="xl"
                        variant="circular"
                        alt="tania andrew"
                        src={`/img/teams/${player.teamImg}`} // team의 image 값 사용
                    />
                </div>

            </CardBody>
        </Card>
    )
}