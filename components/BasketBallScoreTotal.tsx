import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Score } from '../utils'
//@ts-ignore
import Modal from "@material-tailwind/react/Modal";
//@ts-ignore
import ModalHeader from "@material-tailwind/react/ModalHeader";
//@ts-ignore
import ModalBody from "@material-tailwind/react/ModalBody";
//@ts-ignore
import ModalFooter from "@material-tailwind/react/ModalFooter";
//@ts-ignore
import Button from "@material-tailwind/react/Button";
import { Socket } from 'socket.io-client'
type Props = {
    id: string
    data: Score
    socket: Socket
    isAdmin: boolean
}
const BasketBallScoreTotal = ({ id, data, socket, isAdmin }: Props) => {
    const router = useRouter()
    const [teamAScore, setTeamAScore] = useState<number>(0)
    const [teamBScore, setTeamBScore] = useState<number>(0)
    let timer: any;
    let isUnloaded = false;
    let endGame = () => {
        data.timerState = 3;
        data.state = 4;
        socket.emit('score:submit', { id: id, score: data });
    }
    useEffect(() => {
        // setTeamAScore(0);
        // setTeamBScore(0);
        let score_a = 0;
        let score_b = 0;
        for (const qscore of data.gameMeta.quarters) {
            for (const team of (qscore as Score).teams) {
                if (team.name == data.teams[0].name) {
                    score_a += team.score;
                }
                if (team.name == data.teams[1].name) {
                    score_b += team.score;
                }
            }
        }
        setTeamAScore(score_a);
        setTeamBScore(score_b);
    }, [id, data])
    return (<div>
        <div className="bg-indigo-50 w-full shadow-lg mt-6 p-5 sm:p-10 border border-blue-100 rounded">
            <div className="text-center text-3xl sm:text-5xl font-bold">Basketball</div>
            <div className="grid grid-cols-11 text-center text-3xl sm:text-5xl mt-10">
                <div className="col-span-4">{data.teams[0].name}</div>
                <div className='col-span-3'></div>
                <div className="col-span-4">{data.teams[1].name}</div>
            </div>
            <div className="grid grid-cols-11 text-center scoreNumber mt-10">
                <div className="col-span-4">{teamAScore}</div>
                <div className="col-span-3">-</div>
                <div className="col-span-4">{teamBScore}</div>
            </div>
            <div className="text-center text-3xl sm:text-4xl mt-10">คะแนนรวม</div>
        </div>
        {
            data.state == 4 ? (
                <div>
                    <div className='flex flex-col items-center justify-center text-3xl mb-3 mt-4'>การแข่งขันเกมนี้จบลงแล้ว</div>
                    <div className='grid grid-cols-2 gap-4 mt-4'>
                        <Link href={'/'}>
                            <Button
                                color="green"
                                buttonType="filled"
                                size="lg"
                                rounded={false}
                                block={true}
                                iconOnly={false}
                                ripple="light"
                            >
                                รายการทั้งหมด
                            </Button>
                        </Link>
                        <Link href={`/game/${id}/sets`}>
                            <Button
                                color="indigo"
                                buttonType="filled"
                                size="lg"
                                rounded={false}
                                block={true}
                                iconOnly={false}
                                ripple="light"
                            >
                                ตรวจสอบควอเตอร์
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : !isAdmin ? '' : (
                <div className='grid grid-cols-3 gap-4 mt-4'>
                    <Link href={'/'}>
                        <Button
                            color="green"
                            buttonType="filled"
                            size="lg"
                            rounded={false}
                            block={true}
                            iconOnly={false}
                            ripple="light"
                        >
                            รายการทั้งหมด
                        </Button>
                    </Link>
                    <Link href={`${id}/sets`}>
                        <Button
                            color="indigo"
                            buttonType="filled"
                            size="lg"
                            rounded={false}
                            block={true}
                            iconOnly={false}
                            ripple="light"
                        >
                            ตรวจสอบควอเตอร์
                        </Button>
                    </Link>
                    <Button
                        color="pink"
                        buttonType="filled"
                        size="lg"
                        rounded={false}
                        block={true}
                        iconOnly={false}
                        ripple="light"
                        onClick={() => { endGame() }}
                    >
                        เสร็จสิ้นการแข่งขัน
                    </Button>
                </div>
            )
        }
    </div>
    )
}

export default BasketBallScoreTotal