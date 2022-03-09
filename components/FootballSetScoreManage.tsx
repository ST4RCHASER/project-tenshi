import React, { useEffect } from 'react'
import Link from 'next/link'
import { Score } from '../utils'
import { Socket } from 'socket.io-client'
//@ts-ignore
import Button from "@material-tailwind/react/Button";
type Props = {
    id: string
    data: Score
    socket: Socket
    set: number
}

const FootballSetScoreManage = ({ id, data, socket, set }: Props) => {
    let setScore = (teamSlot: number, newScore: number) => {
        data.gameMeta.sets[set - 1].teams[teamSlot].score = newScore;
        data.state = 3;
        socket.emit('score:submit', { id: id, score: data });
    }
    let setTimerState = (state: number) => {
        data.gameMeta.sets[set - 1].timerState = state;
        data.state = 3;
        socket.emit('score:submit', { id: id, score: data });
    }
    let endSet = () => {
        data.gameMeta.sets[set - 1].timerState = 3;
        data.gameMeta.sets[set - 1].state = 4;
        socket.emit('score:submit', { id: id, score: data });
    }
    useEffect(() => {

    }, [])
    return (data.gameMeta.sets[set - 1].state != 4 && data.state != 4 ? <div>
        <div className="text-3xl sm:text-5xl mt-10 ml-4">จัดการ</div>
        <div className='grid grid-cols-4 gap-4 mt-4'>
            <Button
                color="lightGreen"
                buttonType="filled"
                size="lg"
                rounded={false}
                block={true}
                iconOnly={false}
                ripple="light"
                onClick={() => { setTimerState(1) }}
            >
                เริ่มเวลาการแข่งขัน
            </Button>
            <Button
                color="pink"
                buttonType="filled"
                size="lg"
                rounded={false}
                block={true}
                iconOnly={false}
                ripple="light"
                onClick={() => { setTimerState(3) }}
            >
                หยุดเวลาการแข่งขัน
            </Button>
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
                    รอบแข่งขัน
                </Button>
            </Link>
            <Button
                color="deepOrange"
                buttonType="filled"
                size="lg"
                rounded={false}
                block={true}
                iconOnly={false}
                ripple="light"
                onClick={() => { endSet() }}
            >
                จบ{data.gameMeta.sets[set - 1].name}
            </Button>
        </div>
        <div className='grid grid-cols-2 p-6 md:gap-x-0 gap-4'>
            <div>
                <button className="bg-red-500 w-1/2 hover:bg-red-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(0, data.gameMeta.sets[set - 1].teams[0].score - 1) }}>
                    -1
                </button>
                <button className="bg-green-500 w-1/2 hover:bg-green-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(0, data.gameMeta.sets[set - 1].teams[0].score + 1) }}>
                    +1
                </button>
            </div>
            <div className='w-full '>
                <button className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(1, data.gameMeta.sets[set - 1].teams[1].score - 1) }}>
                    -1
                </button>
                <button className="w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(1, data.gameMeta.sets[set - 1].teams[1].score + 1) }}>
                    +1
                </button>
            </div>
        </div>
    </div> : <div>
        <div className='flex flex-col items-center justify-center text-3xl mb-4'>การแข่งรอบนี้จบลงแล้ว</div>
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
                รอบแข่งขัน
            </Button>
        </Link></div>);
}

export default FootballSetScoreManage
