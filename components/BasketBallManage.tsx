import React, { useEffect } from 'react'
import Link from 'next/link'
import { Score } from '../utils'
import { Socket } from 'socket.io-client'
type Props = {
    id: string
    data: Score
    socket: Socket
}

const BasketBallManage = ({ id, data, socket }: Props) => {
    let setScore = (teamSlot: number, newScore: number) => {
        data.teams[teamSlot].score = newScore;
        socket.emit('team:update', { id: id, teams: data.teams });
    }
    useEffect(() => {

    }, [])
    return (<div>
        <div className="text-3xl sm:text-5xl mt-10 ml-4">Management</div>
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
            <div>
                <button className="bg-red-500 w-1/2 hover:bg-red-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(0, data.teams[0].score - 2) }}>
                    -2
                </button>
                <button className="bg-green-500 w-1/2 hover:bg-green-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(0, data.teams[0].score + 2) }}>
                    +2
                </button>
            </div>
            <div className='hidden sm:block'></div>
            <div className='w-full sm:mt-2'>
                <button className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(1, data.teams[1].score - 2) }}>
                    -2
                </button>
                <button className="w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(1, data.teams[1].score + 2) }}>
                    +2
                </button>
            </div>
            <div>
                <button className="bg-red-500 w-1/2 hover:bg-red-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(0, data.teams[0].score - 3) }}>
                    -3
                </button>
                <button className="bg-green-500 w-1/2 hover:bg-green-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(0, data.teams[0].score + 3) }}>
                    +3
                </button>
            </div>
            <div className='hidden sm:block'></div>
            <div className='w-full sm:mt-2'>
                <button className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(1, data.teams[1].score - 3) }}>
                    -3
                </button>
                <button className="w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 text-4xl sm:text-6xl" onClick={() => { setScore(1, data.teams[1].score + 3) }}>
                    +3
                </button>
            </div>
        </div>
    </div>);
}

export default BasketBallManage
