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
        <div className="text-5xl mt-10">Management</div>
        <div className='grid grid-cols-3 mt-10 p-10'>
            <div>
                <button className="bg-red-500 w-1/2 hover:bg-red-700 text-white font-bold py-2 px-4 text-7xl" onClick={() => { setScore(0, data.teams[0].score - 1) }}>
                    -1
                </button>
                <button className="bg-green-500 w-1/2 hover:bg-green-700 text-white font-bold py-2 px-4 text-7xl" onClick={() => { setScore(0, data.teams[0].score + 1) }}>
                    +1
                </button>
            </div>
            <div></div>
            <div className='w-full'>
                <button className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 text-7xl" onClick={() => { setScore(1, data.teams[1].score - 1) }}>
                    -1
                </button>
                <button className="w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 text-7xl" onClick={() => { setScore(1, data.teams[1].score + 1) }}>
                    +1
                </button>
            </div>
        </div>
    </div>);
}

export default BasketBallManage
