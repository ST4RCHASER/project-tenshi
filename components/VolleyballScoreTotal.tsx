import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GameState, Score } from '../utils'
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
const VolleyballScoreTotal = ({ id, data, socket, isAdmin }: Props) => {
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
        //Calc score by set score more than or not
        for (const set of data.gameMeta.sets) {
            console.log(set)
            if (set.teams[0].score == set.teams[1].score || set.state == GameState.ENDED) continue;
            if (set.teams[0].score > set.teams[1].score) {
                score_a += 1;
            } else {
                score_b += 1;
            }
        }
        setTeamAScore(score_a);
        setTeamBScore(score_b);
    }, [id, data])
    return (<div>
        <div className="bg-indigo-50 w-full shadow-lg mt-6 p-5 sm:p-10 border border-blue-100 rounded">
            <div className="text-center text-3xl sm:text-5xl font-bold">Volleyball</div>
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
            <div className='grid grid-cols-6 gap-6 pl-16 pr-16'>
                <div className='p-3'></div>
                {
                    data.gameMeta.sets.map((set: any, index: number) => {
                        return (<div className='px-2 py-3 font-bold text-2xl text-center' key={index}>{index + 1}</div>)
                    })
                }
                {/* <div className='px-2 py-3 text-xl font-bold text-center'>รวม</div> */}
            </div>
            <div className='grid grid-cols-6 gap-6 pl-16 pr-16'>
                <div className='px-2 py-3 ph font-bold text-center text-2xl'>ทีม {data.teams[0].name}</div>
                {
                    data.gameMeta.sets.map((set: any, index: number) => {
                        return (<div className={`px-2 py-3 text-center border-blue-800 border-1 text-xl ${data.gameMeta.sets[index].state != GameState.ENDED ? '' : data.gameMeta.sets[index].teams[0].score > data.gameMeta.sets[index].teams[1].score ? 'bg-green-500 text-white' : ''}`} key={index}>{set.teams[0].score}</div>)
                    })
                }
                {/* <div className='px-2 py-3 text-center border-green-700 border-1 text-xl'>
                    {
                        data.gameMeta.sets.reduce((acc: number, cur: any) => {
                            return acc + cur.teams[0].score
                        }, 0)
                    }
                </div> */}
            </div>
            <div className='grid grid-cols-6 gap-6 pl-16 pr-16 mt-4 text-xl'>
                <div className='p-2 text-2xl font-bold text-center'>ทีม {data.teams[1].name}</div>
                {
                    data.gameMeta.sets.map((set: any, index: number) => {
                        return (<div className={`px-2 py-3 text-center border-blue-800 border-1 text-xl ${data.gameMeta.sets[index].state != GameState.ENDED ? '' : data.gameMeta.sets[index].teams[1].score > data.gameMeta.sets[index].teams[0].score ? 'bg-green-500 text-white' : ''}`} key={index}>{set.teams[1].score}</div>)
                    })
                }
                {/* <div className='px-2 py-3 text-center border-green-700 border-1 text-xl'>
                    {
                        data.gameMeta.sets.reduce((acc: number, cur: any) => {
                            return acc + cur.teams[1].score
                        }, 0)
                    }
                </div> */}
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
                                ตรวจสอบเซ็ต
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
                            ตรวจสอบเซ็ต
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
                    <br />
                </div>
            )
        }
    </div>
    )
}

export default VolleyballScoreTotal