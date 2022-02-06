import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BasketBallScore from '../../../components/BasketBallScore'
import BasketBallManage from '../../../components/BasketBallManage'
import { addZeroToTime, GameType, getGameName, getSocket, Score } from '../../../utils'
import Layout from '../../../components/Layout'
import FootBallScore from '../../../components/FootBallScore'
import FootBallManage from '../../../components/FootBallManage'
//@ts-ignore
import Button from "@material-tailwind/react/Button";
import Link from 'next/link'
let socket = getSocket();
const Sets = () => {
    const router = useRouter()
    const { id } = router.query
    const [meta, setMeta] = useState<any[]>()
    let timer: any;
    let isUnloaded = false;
    useEffect(() => {
        if (!id) return;
        setMeta([]);
        timer = setInterval(() => {
            socket.emit('meta:request', { id: id });
        }, 50);
        const exitingFunction = () => {
            isUnloaded = true;
            if (timer) clearInterval(timer)
        };
        router.events.on('routeChangeStart', exitingFunction);
        socket.on('meta:request', (data) => {
            if (data.id == id && !isUnloaded) setMeta(data.meta);
        })
    }, [id])
    return (
        <Layout title="กระดานคะแนน">
            <div className='text-5xl mb-4'>รายการ{typeof meta != 'undefined' && typeof (meta as any).quarters != 'undefined' ? 'ควอเตอร์ ' : 'เซ็ท '}</div>
            <div className='grid grid-cols-2 gap-3'>
                {((meta as any)?.quarters ? (meta as any)?.quarters : (meta as any)?.sets)?.map((object: any, i: number) => {
                    return (<Link href={`/game/${id}/set/${object.id}`}>
                        <Button
                            color="lightGreen"
                            buttonType="filled"
                            size="lg"
                            rounded={false}
                            block={true}
                            iconOnly={false}
                            ripple="light"
                            className='mb-3'
                        >
                            {object.gameType == 3 ? 'ควอเตอร์ ' : 'เซ็ท '} {i + 1}
                        </Button>
                    </Link>)
                })}
            </div>
            <Link href={`/game/${id}`}>
                <Button
                    color="lightBlue"
                    buttonType="filled"
                    size="lg"
                    rounded={false}
                    block={true}
                    iconOnly={false}
                    ripple="light"
                    className='mb-3'
                >
                    คะแนนรวม
                </Button>
            </Link>
        </Layout>
    )
}
export default Sets