import React, { useEffect } from 'react'
import Link from 'next/link'
import { GameType, Score } from '../utils'
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
import { toHHMMSS } from '../utils/tools'

type Props = {
    id: string
    data: Score
    set: number
}
const BasketBallScore = ({ id, data, set }: Props) => {
    useEffect(() => {
    }, [])
    return (<div className="bg-indigo-50 w-full shadow-lg mt-6 p-5 sm:p-10 border border-blue-100 rounded">
        <div className="text-center text-3xl sm:text-5xl font-bold">Basketball</div>
        <div className="grid grid-cols-11 text-center text-3xl sm:text-5xl mt-10">
            <div className="col-span-4">{data.gameMeta.quarters[set - 1].teams[0].name}</div>
            <div className='col-span-3'></div>
            <div className="col-span-4">{data.gameMeta.quarters[set - 1].teams[1].name}</div>
        </div>
        <div className="text-center text-4xl">{toHHMMSS(data.gameMeta.quarters[set - 1].timer)}</div>
        <div className="grid grid-cols-11 text-center scoreNumber mt-15">
            <div className="col-span-4">{data.gameMeta.quarters[set - 1].teams[0].score}</div>
            <div className="col-span-3">-</div>
            <div className="col-span-4">{data.gameMeta.quarters[set - 1].teams[1].score}</div>
        </div>
        <div className="text-center text-3xl sm:text-4xl mt-10">ควอเตอร์: {data.gameMeta.quarters[set - 1].id || 0}</div>
    </div>);
}

export default BasketBallScore
