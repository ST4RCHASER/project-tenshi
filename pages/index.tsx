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
  let [isAdmin, setIsAdmin] = useState(false);
  let isUnloaded = false;
  let submitPassword = (password: string) => {
    if (!isUnloaded) socket.emit('admin:submit', { password: password });
  };
  useEffect(() => {
    socket.on('admin:submit', data => {
      if (!isUnloaded) alert(data.message);
    });
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
      isUnloaded = true;
      if (timer) clearInterval(timer)
    };
    router.events.on('routeChangeStart', exitingFunction);
    socket.on('score:overall', data => {
      console.log(data)
      setIsAdmin(!!data.admin);
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
    <Layout title="?????????????????????????????????????????????????????????">
      <div className="text-5xl ml-4 mb-8 mt-5"><img src="https://lolis.love/djufn.png" className="inline-block" alt="" style={{ height: '100px', marginTop: '-40px' }} /> <div className="h-full inline-block pl-3">?????????????????????????????????????????????????????????</div></div>
      <div className="mb-8 mt-16">
        {/* <div className="inline-block">
          <div className="rounded-xl h-3 w-3 bg-blue-400 ml-4 inline-block"></div>
          <div className="inline-block ml-2">?????????????????????</div>
        </div> */}
        <div className="inline-block">
          <div className="rounded-xl h-3 w-3 bg-yellow-400 ml-4 inline-block"></div>
          <div className="inline-block ml-2">?????????????????????????????????</div>
        </div>
        <div className="inline-block">
          <div className="rounded-xl h-3 w-3 bg-green-400 ml-4 inline-block"></div>
          <div className="inline-block ml-2">????????????????????????????????????</div>
        </div>
        <div className="inline-block">
          <div className="rounded-xl h-3 w-3 bg-red-400 ml-4 inline-block"></div>
          <div className="inline-block ml-2">??????????????????</div>
        </div>
        {
          isAdmin ? <Link href={'/new'}>
            <button className='float-right bg-green-500 text-white px-3 py-2 text-xl rounded-lg -mt-2.5 hover:bg-green-800 font-bold duration-100'>????????????????????????????????????</button>
          </Link> : <div>
            <button className='float-right bg-blue-500 text-white px-3 py-2 text-xl rounded-lg -mt-2.5 hover:bg-blue-800 font-bold duration-100' onClick={
              () => {
                let pwd = prompt('?????????????????????????????????????????????');
                if (pwd && pwd.length > 0) {
                  submitPassword(pwd);
                }
              }
            }>??????????????????????????????</button>
          </div>
        }
      </div>
      <div className='text-4xl'>?????????????????????????????????????????????????????????</div>
      <hr />
      <br />
      <div className="lg:grid-cols-2 xl:grid-cols-3 grid grid-cols-1 gap-2 ">
        {scoreList.filter(s => s.state == GameState.INGAME).map((score: any, index) => {
          return (
            <ScoreCard data={{ score: score, admin: isAdmin, index: index }} />
          )
        })}
      </div>
      <div className='text-4xl mt-8 pt-8'>??????????????????????????????????????????????????????</div>
      <hr />
      <br />
      <div className="lg:grid-cols-2 xl:grid-cols-3 grid grid-cols-1 gap-2 ">
        {scoreList.filter(s => s.state == GameState.NOT_START).map((score: any, index) => {
          return (
            <ScoreCard data={{ score: score, admin: isAdmin, index: index }} />
          )
        })}
      </div>
      <div className='text-4xl mt-8 pt-8'>???????????????????????????????????????</div>
      <hr />
      <br />
      <div className="lg:grid-cols-2 xl:grid-cols-3 grid grid-cols-1 gap-2 ">
        {scoreList.filter(s => s.state == GameState.ENDED).map((score: any, index) => {
          return (
            <ScoreCard data={{ score: score, admin: isAdmin, index: index }} />
          )
        })}
      </div>
        <br />
        <br />
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
