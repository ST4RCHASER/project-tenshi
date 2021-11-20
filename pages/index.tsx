import Link from 'next/link'
import Layout from '../components/Layout'
import { addZeroToTime, getGameName, getSocket } from '../utils'
import React, { useState, useEffect } from "react";
import { GameState, Score } from '../utils';
const IndexPage = () => {
  const [scoreList, setScoreList] = useState<Score[]>([]);
  let socket = getSocket();
  let rawScore: Score[] = [];
  useEffect(() => {
    socket.on('client:welcome', data => {
      console.log(data);
      socket.emit('score:overall');
    });
    setInterval(() => {
      if (socket) {
        socket.emit('score:overall');
      }
    }, 3000);
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
          name: score.name
        }
        );
      }
      console.log(submitScore);
      setScoreList(submitScore);
    });
  }, []);
  return (
    <Layout title="All scores list">
      <div className="text-5xl">All scores list</div>
      <div className='text-center text-2xl bg-blue-50 rounded shadow-md mt-6'>
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
      </div>
    </Layout>
  )
}

export default IndexPage
