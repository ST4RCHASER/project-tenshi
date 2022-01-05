import React, { useEffect } from 'react'
import Link from 'next/link'
import { Score } from '../utils'
type Props = {
    id: string
    data: Score
}
const FootBallScore = ({ id, data }: Props) => {
    useEffect(() => {

    }, [])
    return (<div className="bg-indigo-50 w-full shadow-lg mt-6 p-5 sm:p-10 border border-blue-100 rounded">
        <div className="text-center text-3xl sm:text-5xl font-bold">Football</div>
        <div className="text-center text-3xl sm:text-6xl mt-16">45:00</div>
        <div className="grid grid-cols-11 text-center text-3xl sm:text-5xl mt-10">
            <div className="col-span-4">{data.teams[0].name}</div>
            <div className='col-span-3'></div>
            <div className="col-span-4">{data.teams[1].name}</div>
        </div>
        <div className="grid grid-cols-11 text-center scoreNumber mt-10">
            <div className="col-span-4">{data.teams[0].score}</div>
            <div className="col-span-3">-</div>
            <div className="col-span-4">{data.teams[1].score}</div>
        </div>
        <div className="text-center text-3xl sm:text-4xl mt-10">{data.gameMeta?.part == 1 ? 'ครึ่งหลัง' : 'ครึ่งแรก'}</div>
    </div>);
}

export default FootBallScore
