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
  let isConnected = !socket.disconnected;
  const router = useRouter();
  let isUnloaded = false;
  useEffect(() => {
    socket.on('client:welcome', data => {
      isConnected = true;
    });
    socket.on('score:create', data => {
      console.log('createion result:', data);
      if (data.code == '201' && !isUnloaded) {
        alert('Game created successfully');
        router.push('/');
      } else if(!isUnloaded){
        alert('Game creation failed: ' + data.message);
      }
    });
    const exitingFunction = () => {
      isUnloaded = true;
    };
    router.events.on('routeChangeStart', exitingFunction);
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
    <Layout title="สร้างเกมใหม่">
      <div className="text-5xl ml-4 mb-8">สร้างเกมใหม่</div>
      <form className='px-10 text-gray-600' onSubmit={createNew}>
        <div className='mt-14 text-2xl'>	• ข้อมูลเกม</div>
        <hr />
        <div className="ml-4">
          <div className="mt-3">
            <p className='pb-1'>ชื่อกิจกรรมนี้:</p>
            <input id="name" name="name" type="text" className="rounded w-full" />
          </div>
          <div className="mt-5">
            <p className='pb-1'>รูปแบบกีฬา:</p>
            <select id='gameType' name='gameType' className="form-select px-4 py-3 rounded w-full">
              <option disabled value="0">โปรดเลือก</option>
              <option value="1">บาสเกตบอล</option>
              <option value="2">ฟุตบอล</option>
            </select>
          </div>
          <div className="mt-5">
            <p className='pb-1'>วันและเวลาที่เริ่ม:</p>
            <input id='stamp' name='stamp' type="datetime-local" className="rounded w-full" />
          </div>
        </div>
        <div className='mt-12 text-2xl'>	• รายชื่อทีม ({teamList.length})</div>
        <hr />
        <div className='ml-4 text-xl mt-4'>
          {
            teamList.length > 0 ? teamList.map((name: any, index) => {
              return (
                <div key={index} className="mt-1 ml-4 grid grid-cols-10 gap-1 md:gap-2 lg:gap-1">
                  <div className='md:col-span-9 col-span-7'>{index + 1}. {name}</div>
                  <button type='button' onClick={() => deleteTeam(index)} className="font-bold md:col-span-1 col-span-3 bg-red-400 hover:bg-red-500 duration-100 rounded-md text-base text-white">Delete</button>
                </div>
              )
            }) : <p className='text-gray-600 text-center'> - ไม่มีทีมในตอนนี้ - </p>
          }
        </div>
        <div className="mt-10 ml-4 grid grid-cols-10 gap-1 md:gap-2 lg:gap-1">
          <input value={teamInput} onChange={e => { setTeamInput(e.currentTarget.value); }} type="text" className="rounded w-full md:col-span-9 col-span-7" placeholder='พิมพ์ชื่อทีมและกด "เพิ่มทีมใหม่"' />
          <button onClick={addTeam} type='button' className="font-bold md:col-span-1 col-span-3 bg-blue-500 hover:bg-blue-600 duration-100 rounded-md text-white">เพิ่มทีมใหม่</button>
        </div>
        <button type='submit' className="font-bold col-span-1 bg-green-500 hover:bg-green-600 duration-100 rounded-md text-white px-6 py-2 float-right mt-10">สร้างเกมนี้</button>
      </form>
    </Layout>
  )
}

export default IndexPage
