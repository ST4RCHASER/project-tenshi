import React, { useEffect } from 'react'
import Link from 'next/link'
import { Score } from '../utils'
type Props = {
    id: string
    data: Score
}
const BasketBallScore = ({ id, data }: Props) => {
    useEffect(() => {
        
    }, [])
    return (<div className="bg-indigo-50 w-full shadow-lg mt-6 p-10 border border-blue-100 rounded">
        <div className="text-center text-5xl font-bold">Basketball</div>
        <div className="grid grid-cols-11 text-center text-5xl mt-10">
            <div className="col-span-4">{data.teams[0].name}</div>
            <div className='col-span-3'></div>
            <div className="col-span-4">{data.teams[1].name}</div>
        </div>
        <div className="grid grid-cols-11 text-center scoreNumber mt-10">
            <div className="col-span-4">{data.teams[0].score}</div>
            <div className="col-span-3">-</div>
            <div className="col-span-4">{data.teams[1].score}</div>
        </div>
        <div className="text-center text-4xl mt-10">Quarters: {data.gameMeta?.quarter || 0}</div>
    </div>);
}

export default BasketBallScore
