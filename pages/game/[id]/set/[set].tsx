import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BasketBallScore from '../../../../components/BasketBallScore'
import BasketBallManage from '../../../../components/BasketBallManage'
import { addZeroToTime, GameType, getGameName, getSocket, Score } from '../../../../utils'
import Layout from '../../../../components/Layout'
import FootBallScore from '../../../../components/FootBallScore'
import FootBallManage from '../../../../components/FootBallManage'
let socket = getSocket();
const Game = () => {
    const router = useRouter()
    const { id, set } = router.query
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
            if (data.score.id == id && !isUnloaded) setScore(data.score);
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
            {getManagementBoard(id as string, score, parseInt(set as string))}
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
        case GameType.LOADING:
            return (<div>กำลังโหลด...</div>)
        default: return (<div><b>Load viewer failed</b>: Unknown gameType ID: {score.gameType || '#UNKNOWN#'}, please try update tenshi web to latest version</div>)
    }
}
function getManagementBoard(id: string, score: Score, set: number) {
    if (!score) return (<div>กำลังโหลด...</div>)
    switch (score.gameType) {
        case GameType.BASKETBALL:
            return (<div className='mt-10'><BasketBallManage id={id} data={score} set={set} socket={socket} /></div>);
        case GameType.FOOTBALL:
            return (<div className='mt-10'><FootBallManage id={id} data={score} socket={socket} /></div>);
        case GameType.LOADING:
            return (<div>กำลังโหลด...</div>)
        default: return (<div><b>Load controller failed</b>: Unknown gameType ID: {score.gameType || '#UNKNOWN#'}, please try update tenshi web to latest version</div>)
    }
}
export default Game