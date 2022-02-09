import React, { useEffect } from 'react'
import Link from 'next/link'
import { Score } from '../utils'
import { Socket } from 'socket.io-client'
type Props = {
    id: string
    data: Score
    socket: Socket
}
//@ts-ignore
import Button from "@material-tailwind/react/Button";
const FootBallManage = ({ id, data, socket }: Props) => {
    let setScore = (teamSlot: number, newScore: number) => {
        data.teams[teamSlot].score = newScore;
        data.state = 3;
        socket.emit('team:update', { id: id, teams: data.teams });
    }
    let setTimerState = (state: number) => {
        data.timerState = state;
        data.state = 3;
        socket.emit('score:submit', { id: id, score: data });
    }
    let setRoundPart = (part: number) => {
        data.gameMeta.part = part;
        data.state = 3;
        data.timerState = 3;
        socket.emit('score:submit', { id: id, score: data });
    }
    let setEndGame = () => {
        data.state = 4;
        data.timerState = 3;
        socket.emit('score:submit', { id: id, score: data });
    }
    useEffect(() => {

    }, [])
    return (data.state != 4 ? <div>
        <div className="text-3xl sm:text-5xl mt-10 ml-4 pb-4">จัดการ</div>
        <div className='grid grid-cols-4 gap-4'>
            <Link href={'/'}>
                <Button
                    color="orange"
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
            {
                (data as any).gameMeta.part == 0 ? <Button
                    color="indigo"
                    buttonType="filled"
                    size="lg"
                    rounded={false}
                    block={true}
                    iconOnly={false}
                    ripple="light"
                    onClick={() => { setRoundPart(1) }}
                >
                    จบครึ่งแรก
                </Button> : <Button
                    color="indigo"
                    buttonType="filled"
                    size="lg"
                    rounded={false}
                    block={true}
                    iconOnly={false}
                    ripple="light"
                    onClick={() => { setEndGame() }}
                >
                    เสร็จสิ้นการแข่งขัน
                </Button>
            }
        </div>
        <div className='grid grid-cols-2 p-6 md:gap-x-0 gap-4'>
            <div>
                <button className="bg-red-500 w-1/2 hover:bg-red-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(0, data.teams[0].score - 1) }}>
                    -1
                </button>
                <button className="bg-green-500 w-1/2 hover:bg-green-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(0, data.teams[0].score + 1) }}>
                    +1
                </button>
            </div>

            <div className='w-full '>
                <button className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(1, data.teams[1].score - 1) }}>
                    -1
                </button>
                <button className="w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(1, data.teams[1].score + 1) }}>
                    +1
                </button>
            </div>
        </div>
    </div> : <div>
        <div className='flex flex-col items-center justify-center text-3xl mb-4'>การแข่งขันนี้จบลงแล้ว</div>
        <Link href={`/`}>
            <Button
                color="indigo"
                buttonType="filled"
                size="lg"
                rounded={false}
                block={true}
                iconOnly={false}
                ripple="light"
            >
                รายชื่อเกม
            </Button>
        </Link> <br /></div>);
}

export default FootBallManage
