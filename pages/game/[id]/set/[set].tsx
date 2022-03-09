import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BasketBallScore from '../../../../components/BasketBallScore'
import BasketBallManage from '../../../../components/BasketBallManage'
import { addZeroToTime, GameType, getGameName, getSocket, Score } from '../../../../utils'
import Layout from '../../../../components/Layout'
import FootBallScore from '../../../../components/FootBallScore'
import FootBallManage from '../../../../components/FootBallManage'
import VolleyballScore from '../../../../components/VolleyballScore'
import VolleyballScoreManage from '../../../../components/VolleyballScoreManage'
import BadmintonScore from '../../../../components/BadmintonScore'
import MuzzleScore from '../../../../components/MuzzleScore'
import BadmintonScoreManage from '../../../../components/BadmintonScoreManage'
import MuzzleScoreManage from '../../../../components/MuzzleScoreManage'
//@ts-ignore
import Button from "@material-tailwind/react/Button";
import Link from 'next/link'
import FootballSetScore from '../../../../components/FootballSetScore'
import FootballSetScoreManage from '../../../../components/FootballSetScoreManage'
let socket = getSocket();
const Game = () => {
    const router = useRouter()
    const { id, set } = router.query
    const [isAdmin, setIsAdmin] = useState(false)
    const [score, setScore] = useState<Score>({
        id: '',
        gameType: GameType.LOADING,
        teams: [{
            score: 0,
            name: '',
        }, {
            score: 0,
            name: '',
        }],
        stamp: 0,
        name: '',
        state: 0,
        timer: 0,
        timerState: 3,
    })
    let timer: any;
    let isUnloaded = false;
    useEffect(() => {
        if (!id) return;
        timer = setInterval(() => {
            socket.emit('score:single', { id: id });
        }, 50);
        socket.on('score:single', (data) => {
            if (data.score.id == id && !isUnloaded) {
                setScore(data.score);
                setIsAdmin(!!data.admin);
            }
        })
        const exitingFunction = () => {
            isUnloaded = true;
            if (timer) clearInterval(timer)
        };
        router.events.on('routeChangeStart', exitingFunction);
    }, [id, set])
    return (
        <Layout title="กระดานคะแนน">
            {getScorebaord(id as string, score, set as any)}
            {getManagementBoard(id as string, score, parseInt(set as string), isAdmin)}
        </Layout>
    )
}
function getScorebaord(id: string, score: Score, set: number) {
    if (!score) return (<div>กำลังโหลด...</div>)
    switch (score.gameType) {
        case GameType.BASKETBALL:
            return (<BasketBallScore id={id} data={score} set={set} />);
        case GameType.FOOTBALL:
            return (<FootBallScore id={id} data={score} />);
        case GameType.FOOTBALL_SET:
            return (<FootballSetScore id={id} data={score} set={set} />);
        case GameType.VOLLEYBALL:
            return (<VolleyballScore id={id} data={score} set={set} />)
        case GameType.BADMINTON:
            return (<BadmintonScore id={id} data={score} set={set} />)
        case GameType.MUZZLE:
            return (<MuzzleScore id={id} data={score} set={set} />)
        case GameType.LOADING:
            return (<div>กำลังโหลด...</div>)
        default: return (<div><b>Load viewer failed</b>: Unknown gameType ID: {score.gameType || '#UNKNOWN#'}, please try update tenshi web to latest version</div>)
    }
}
function getManagementBoard(id: string, score: Score, set: number, isAdmin: boolean = false) {
    if (!score) return (<div>กำลังโหลด...</div>)
    if (!isAdmin) return (<div>
        {
            score.state == 4 ? score.gameType == GameType.BASKETBALL ? <div className='flex flex-col items-center justify-center text-3xl mb-4 mt-4'>การแข่งควอเตอร์นี้จบลงแล้ว</div> : <div className='flex flex-col items-center justify-center text-3xl mb-4 mt-4'>การแข่งเซ็ตนี้จบลงแล้ว</div> : ''
        }
        <Link href={`/game/${id}/sets`}>
            <Button
                color="indigo"
                buttonType="filled"
                size="lg"
                rounded={false}
                block={true}
                iconOnly={false}
                ripple="light"
                className="mt-4"
            >
                {score.gameType == GameType.FOOTBALL_SET ? 'รอบแข่งขัน' : score.gameType == GameType.BASKETBALL ? 'ตรวจสอบควอเตอร์' : 'เลือกเซ็ต'}
            </Button>
        </Link>
    </div>);
    switch (score.gameType) {
        case GameType.BASKETBALL:
            return (<div className='mt-10'><BasketBallManage id={id} data={score} set={set} socket={socket} /></div>);
        case GameType.FOOTBALL:
            return (<div className='mt-10'><FootBallManage id={id} data={score} socket={socket} /></div>);
        case GameType.FOOTBALL_SET:
            return (<div className='mt-10'><FootballSetScoreManage id={id} data={score} set={set} socket={socket} /></div>);
        case GameType.VOLLEYBALL:
            return (<div className='mt-10'><VolleyballScoreManage id={id} data={score} socket={socket} set={set} /></div>);
        case GameType.BADMINTON:
            return (<div className='mt-10'><BadmintonScoreManage id={id} data={score} socket={socket} set={set} /></div>);
        case GameType.MUZZLE:
            return (<div className='mt-10'><MuzzleScoreManage id={id} data={score} socket={socket} set={set} /></div>);
        case GameType.LOADING:
            return (<div>กำลังโหลด...</div>)
        default: return (<div><b>Load controller failed</b>: Unknown gameType ID: {score.gameType || '#UNKNOWN#'}, please try update tenshi web to latest version</div>)
    }
}
export default Game