import React, { useEffect } from 'react'
import Link from 'next/link'
import { Score } from '../utils'
import { Socket } from 'socket.io-client'
type Props = {
    id: string
    data: Score
    socket: Socket
}

const FootBallManage = ({ id, data, socket }: Props) => {
    let setScore = (teamSlot: number, newScore: number) => {
        data.teams[teamSlot].score = newScore;
        socket.emit('team:update', { id: id, teams: data.teams });
    }
    let setA = (a: number, b:number) => {

    }
    useEffect(() => {

    }, [])
    return (<div>
        <div className="text-3xl sm:text-5xl mt-10 ml-4 pb-4">จัดการ</div>
        <div className='grid grid-cols-3'>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 text-4xl sm:text-4xl" onClick={() => { setA(0, data.teams[0].score + 1) }}>
                เริ่มเวลาการแข่งขัน
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 text-4xl sm:text-4xl" onClick={() => { setA(0, data.teams[0].score - 1) }}>
                หยุดเวลาการแข่งขัน
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 text-4xl sm:text-4xl" onClick={() => { setA(0, data.teams[0].score - 1) }}>
                จบการแข่งขันครึ่งแรก
            </button>
        </div>
        <div className='grid grid-cols-2 p-6 md:gap-x-0 sm:grid-cols-3'>
            <div>
                <button className="bg-red-500 w-1/2 hover:bg-red-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(0, data.teams[0].score - 1) }}>
                    -1
                </button>
                <button className="bg-green-500 w-1/2 hover:bg-green-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(0, data.teams[0].score + 1) }}>
                    +1
                </button>
            </div>
            <div className='hidden sm:block'></div>
            <div className='w-full sm:mt-2'>
                <button className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(1, data.teams[1].score - 1) }}>
                    -1
                </button>
                <button className="w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(1, data.teams[1].score + 1) }}>
                    +1
                </button>
            </div>
        </div>
    </div>);
}

export default FootBallManage
