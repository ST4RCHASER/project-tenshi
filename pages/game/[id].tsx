import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BasketBallScore from '../../components/BasketBallScore'
import BasketBallManage from '../../components/BasketBallManage'
import { addZeroToTime, GameType, getGameName, getSocket, Score } from '../../utils'
import Layout from '../../components/Layout'
let socket = getSocket();
const Game = () => {
    const router = useRouter()
    const { id } = router.query
    const [score, setScore] = useState<Score>()
    let timer: any;
    let isUnloaded = false;
    useEffect(() => {
        if (!id) return;
        timer = setInterval(() => {
            socket.emit('score:single', { id: id });
        }, 500);
        const exitingFunction = () => {
            isUnloaded = true;
            if (timer) clearInterval(timer)
        };
        router.events.on('routeChangeStart', exitingFunction);
        socket.on('score:single', (data) => {
            if (data.score.id == id && !isUnloaded) setScore(data.score);
        })
        socket.on('score:update', (data) => {
            if (data.score.id == id && !isUnloaded) setScore(data.score);
        })
        socket.on('team:update', (data) => {
            if (data.id == id && !isUnloaded) {
                let newScore: any = { ...score };
                newScore.teams = data.teams;
                setScore(newScore);
            }
        })
    }, [id])
    return (
        <Layout title="Viewer">
            {getScorebaord(id as string, score)}
            {getManagementBoard(id as string, score)}
        </Layout>
    )
}
function getScorebaord(id: string, data: Score | undefined) {
    if (!data) return (<div>Loading...</div>)
    switch (data.gameType) {
        case GameType.BASKETBALL:
            return (<BasketBallScore id={id} data={data} />);
    }
}
function getManagementBoard(id: string, data: Score | undefined) {
    if (!data) return (<div>Loading...</div>)
    switch (data.gameType) {
        case GameType.BASKETBALL:
            return (<div className='mt-10'><BasketBallManage id={id} data={data} socket={socket} /></div>);
    }
}
export default Game