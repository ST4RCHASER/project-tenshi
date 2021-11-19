import Link from 'next/link'
import Layout from '../components/Layout'
import { addZeroToTime, getGameName } from '../utils/tools'
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { GameState, Score } from '../utils';
const ENDPOINT = "http://localhost:8081";
const socket = socketIOClient(ENDPOINT);
const IndexPage = () => {
  const [scoreList, setScoreList] = useState([]);
  let rawScore: Score[] = [];
  useEffect(() => {
    socket.on('client:welcome', data => {
      console.log(data);
      socket.emit('score:overall');
    });
    socket.on('score:overall', data => {
      console.log(data)
      rawScore = data.scores
      let submitScore = [];
      for (const score of rawScore) {
        let content: string = "";
        let date = new Date(score.stamp);
        for(const team of score.teams) {
          content += `${team.name} ${team.score}`;
        }
        submitScore.push({
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
            {scoreList.map((score, index) => {
              let borderColor = `border-blue-200`;
              let backgroundColor = `bg-blue-50`;
              switch(score.state) {
                case GameState.NOT_START:
                  borderColor = `border-yellow-200`;
                  backgroundColor = `bg-yellow-50`;
                  break;
                case GameState.INGAME:
                  borderColor = `border-green-200`;
                  backgroundColor = `bg-green-50`;
                  break;
                case GameState.ENDED:
                  borderColor = `border-red-200`;
                  backgroundColor = `bg-red-50`;
              }
              return (
                <tr key="{index}">
                  <td className={`border h-16 ${borderColor} ${backgroundColor}`}>{index + 1}</td>
                  <td className={`border ${borderColor} ${backgroundColor}`}>{score.name}</td>
                  <td className={`border ${borderColor} ${backgroundColor}`}>{score.date}</td>
                  <td className={`border ${borderColor} ${backgroundColor}`}>{score.time}</td>
                  <td className={`border ${borderColor} ${backgroundColor}`}>{score.gameName}</td>
                  <td className={`border ${borderColor} ${backgroundColor}`}>{score.content}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default IndexPage
