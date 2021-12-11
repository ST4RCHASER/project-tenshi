import React from 'react'
import Link from 'next/link'

import { User } from '../interfaces'
import { getBGStateColor, getStateName } from '../utils/tools'
import { Team } from '../utils'

type Props = {
    data: User
}

const ScoreCard = ({ data }: any) => (
    <Link key={data.index} href={`/game/${data.score.id}`}>
        <div className='bg-white border cursor-pointer rounded-2xl p-6 shadow-lg hover:scale-105 hover:z-10 z-0 duration-100 transform-gpu'>
            <h1 className="font-bold text-3xl mb-1">{data.score.name}</h1>
            <p className={"text-white inline rounded text-bold px-3 py-0.5 text-sm " + getBGStateColor(data.score.state)}>{data.score.gameName} • {getStateName(data.score.state)}</p>
            <p className="text-gray-700 mx-1 my-1 text-base"> {data.score.date} at {data.score.time}</p>
            {/* {data.score.teams.map((team: Team, index: any) => {
            return [
                (<div className="grid gap-1 grid-cols-2 text-center"><div>{team.name}</div> <div>test</div></div>),
                (<div className="grid gap-1 grid-cols-2 text-center"><div>test</div> <div>test</div></div>)
            ]
        })} */}
            <p className='mb-1 mt-3 mx-1'>Teams infomation:</p>
            <div className="grid gap-1 grid-cols-3 text-center"><div className='font-bold'>{data.score?.teams[0].name}</div> <div></div> <div className='font-bold'>{data.score?.teams[1]?.name}</div></div>
            <div className="grid gap-1 grid-cols-3 text-center"><div className='text-xl'>{data.score?.teams[0].score}</div> <div className='text-xl font-bold'>{data.score.timer}</div> <div className='text-xl'>{data.score?.teams[1]?.score}</div></div>
        </div>
    </Link>
)

export default ScoreCard
