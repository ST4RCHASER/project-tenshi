import Link from 'next/link'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { addZeroToTime, getGameName, getSocket } from '../utils'
import React, { useState, useEffect, BaseSyntheticEvent } from "react";
import { GameState, Score } from '../utils';
import ScoreCard from '../components/ScoreCard';
const IndexPage = () => {
  const [teamList, setTeamList] = useState<String[]>([]);
  const [teamInput, setTeamInput] = useState('');
  let socket = getSocket();
  let rawScore: Score[] = [];
  let isConnected = !socket.disconnected;
  const router = useRouter();
  useEffect(() => {
    socket.on('client:welcome', data => {
      isConnected = true;
    });
    socket.on('score:create', data => {
      console.log('createion result:', data);
      if (data.code == '201') {
        alert('Game created successfully');
        router.push({
          pathname: '/',
        })
      } else {
        alert('Game creation failed: ' + data.message);
      }
    });
  }, []);
  const createNew = async (event: BaseSyntheticEvent) => {
    event.preventDefault();
    if (teamList.length > 1 && event.target.gameType && event.target.gameType.value != 0 && event.target.name.value && event.target.stamp.value) {
      // alert('created' + event.target.stamp.value)
      let teams = teamList.map(team => {
        return {
          name: team,
          score: 0
        }
      });
      socket.emit('score:create', {
        gameType: event.target.gameType.value,
        name: event.target.name.value,
        stamp: event.target.stamp.value,
        teams: teams
      });
    }
    //event.target.name.value
  };
  const addTeam = () => {
    if (teamInput.length > 0 && teamInput != ' ') {
      setTeamList([...teamList, teamInput]);
      setTeamInput('');
    }
  };
  const deleteTeam = (index: number) => {
    let newList = [...teamList];
    newList.splice(index, 1);
    setTeamList(newList);
  };
  return (
    <Layout title="Create new game">
      <div className="text-5xl ml-4 mb-8">Create new game</div>
      <form className='px-10 text-gray-600' onSubmit={createNew}>
        <div className='mt-14 text-2xl'>	• Game Infomation</div>
        <hr />
        <div className="ml-4">
          <div className="mt-3">
            <p className='pb-1'>Event Name:</p>
            <input id="name" name="name" type="text" className="rounded w-full" />
          </div>
          <div className="mt-5">
            <p className='pb-1'>Game Type:</p>
            <select id='gameType' name='gameType' className="form-select px-4 py-3 rounded w-full">
              <option disabled value="0">Select game type</option>
              <option value="1">Basketball</option>
            </select>
          </div>
          <div className="mt-5">
            <p className='pb-1'>Start Date&Time:</p>
            <input id='stamp' name='stamp' type="datetime-local" className="rounded w-full" />
          </div>
        </div>
        <div className='mt-12 text-2xl'>	• Team Lists ({teamList.length})</div>
        <hr />
        <div className='ml-4 text-xl mt-4'>
          {
            teamList.length > 0 ? teamList.map((name: any, index) => {
              return (
                <div key={index} className="mt-1 ml-4 grid grid-cols-10 gap-1 md:gap-2 lg:gap-1">
                  <div className='md:col-span-9 col-span-7'>{index + 1}. {name}</div>
                  <button type='button' onClick={() => deleteTeam(index)} className="md:col-span-1 col-span-3 bg-red-400 hover:bg-red-500 duration-100 rounded-md text-base text-white">Delete</button>
                </div>
              )
            }) : <p className='text-gray-600 text-center'> - No team added yet - </p>
          }
        </div>
        <div className="mt-10 ml-4 grid grid-cols-10 gap-1 md:gap-2 lg:gap-1">
          <input value={teamInput} onChange={e => { setTeamInput(e.currentTarget.value); }} type="text" className="rounded w-full md:col-span-9 col-span-7" placeholder='Type team name here then click add' />
          <button onClick={addTeam} type='button' className="md:col-span-1 col-span-3 bg-blue-500 hover:bg-blue-600 duration-100 rounded-md text-white">Add new</button>
        </div>
        <button type='submit' className="col-span-1 bg-green-500 hover:bg-green-600 duration-100 rounded-md text-white px-6 py-2 float-right mt-10">Create this event now</button>
      </form>
    </Layout>
  )
}

export default IndexPage
