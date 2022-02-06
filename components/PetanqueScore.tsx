import React, { useEffect } from 'react'
import Link from 'next/link'
import { Score } from '../utils'
import { toHHMMSS } from '../utils/tools'
type Props = {
    id: string
    data: Score
}
const PetanqueScore = ({ id, data }: Props) => {
    useEffect(() => {

    }, [])
    return (<div className="bg-indigo-50 w-full shadow-lg mt-6 p-5 sm:p-10 border border-blue-100 rounded">
        <div className="text-center text-3xl sm:text-5xl font-bold">Petanque</div>
        <div className="text-center text-3xl sm:text-6xl mt-16">{toHHMMSS(data.timer)}</div>
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
        <div className="text-center text-3xl sm:text-4xl mt-10">รอบที่ {data.teams[0].score + data.teams[1].score}</div>
    </div>);
}

export default PetanqueScore
