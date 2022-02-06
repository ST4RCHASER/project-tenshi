import Link from 'next/link'
import Layout from '../components/Layout'
import { addZeroToTime, getGameName, getSocket } from '../utils'
import React, { useState, useEffect } from "react";
import { GameState, Score } from '../utils';
import ScoreCard from '../components/ScoreCard';
import { useRouter } from 'next/router';
const IndexPage = () => {
  const router = useRouter()
  const [scoreList, setScoreList] = useState<Score[]>([]);
  let socket = getSocket();
  let rawScore: Score[] = [];
  let timer: any;
  useEffect(() => {
    socket.on('client:welcome', data => {
      console.log(data);
      socket.emit('score:overall');
    });
    socket.emit('score:overall');
    timer = setInterval(() => {
      if (socket) {
        socket.emit('score:overall');
      }
    }, 50);
    const exitingFunction = () => {
      if (timer) clearInterval(timer)
    };
    router.events.on('routeChangeStart', exitingFunction);
    socket.on('score:overall', data => {
      console.log(data)
      rawScore = data.scores
      let submitScore: any[] = [];
      for (const score of rawScore) {
        let content: string = "";
        let date = new Date(score.stamp);
        for (const team of score.teams) {
          content += `${team.name} ${team.score}`;
        }
        submitScore.push({
          id: score.id,
          date: `${addZeroToTime(date.getDate())}/${addZeroToTime(date.getMonth())}/${addZeroToTime(date.getFullYear())}`,
          time: `${addZeroToTime(date.getHours())}:${addZeroToTime(date.getMinutes())}`,
          gameName: getGameName(score.gameType),
          state: score.state,
          timer: score.timer,
          content: content,
          name: score.name,
          teams: score.teams
        }
        );
      }
      console.log(submitScore);
      setScoreList(submitScore);
    });
  }, []);
  return (
    <Layout title="รายชื่อคะแนนทั้งหมด">
      <div className="text-5xl ml-4 mb-8">รายชื่อคะแนนทั้งหมด</div>
      <div className="mb-8 mt-16">
        {/* <div className="inline-block">
          <div className="rounded-xl h-3 w-3 bg-blue-400 ml-4 inline-block"></div>
          <div className="inline-block ml-2">ไม่ทราบ</div>
        </div> */}
        <div className="inline-block">
          <div className="rounded-xl h-3 w-3 bg-yellow-400 ml-4 inline-block"></div>
          <div className="inline-block ml-2">ยังไม่เริ่ม</div>
        </div>
        <div className="inline-block">
          <div className="rounded-xl h-3 w-3 bg-green-400 ml-4 inline-block"></div>
          <div className="inline-block ml-2">กำลังเล่น</div>
        </div>
        <div className="inline-block">
          <div className="rounded-xl h-3 w-3 bg-red-400 ml-4 inline-block"></div>
          <div className="inline-block ml-2">จบแล้ว</div>
        </div>
        <Link href={'/new'}>
          <button className='float-right bg-green-500 text-white px-3 py-2 text-xl rounded-lg -mt-2.5 hover:bg-green-800 font-bold duration-100'>เพิ่มเกมใหม่</button>
        </Link>
      </div>
      <div className="lg:grid-cols-2 xl:grid-cols-3 grid grid-cols-1 gap-2 ">
        {scoreList.map((score: any, index) => {
          return (
            <ScoreCard data={{ score: score, index: index }} />
          )
        })}
      </div>

      {/* <div className='text-center text-2xl bg-blue-50 rounded shadow-md mt-6'>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className='w-20 h-16 border border-blue-200'>No.</th>
              <th className='w-40 border border-blue-200'>Name</th>
              <th className='w-40 border border-blue-200'>Date</th>
              <th className='w-40 border border-blue-200'>Time</th>
              <th className='w-40 border border-blue-200'>Type</th>
              <th className='border border-blue-200'>Score</th>
            </tr>
          </thead>
          <tbody>
            {scoreList.map((score: any, index) => {
              let borderColor = `border-blue-200`;
              let backgroundColor = `bg-blue-50 hover:bg-blue-200 transition duration-150`;
              switch (score.state) {
                case GameState.NOT_START:
                  borderColor = `border-yellow-200`;
                  backgroundColor = `bg-yellow-50 hover:bg-yellow-200 transition duration-150`;
                  break;
                case GameState.INGAME:
                  borderColor = `border-green-200`;
                  backgroundColor = `bg-green-50 hover:bg-green-200 transition duration-150`;
                  break;
                case GameState.ENDED:
                  borderColor = `border-red-200`;
                  backgroundColor = `bg-red-50 hover:bg-red-200 transition duration-150`;
              }
              return (
                <Link key="{index}" href={`/game/${score.id}`}>
                  <tr className={`border ${borderColor} ${backgroundColor} cursor-pointer`}>
                    <td className={`border h-16`}>{index + 1}</td>
                    <td className={`border ${borderColor}`}>{score.name}</td>
                    <td className={`border ${borderColor}`}>{score.date}</td>
                    <td className={`border ${borderColor}`}>{score.time}</td>
                    <td className={`border ${borderColor}`}>{score.gameName}</td>
                    <td className={`border ${borderColor}`}>{score.content}</td>
                  </tr>
                </Link>
              )
            })}
          </tbody>
        </table>
      </div> */}
    </Layout>
  )
}

export default IndexPage
