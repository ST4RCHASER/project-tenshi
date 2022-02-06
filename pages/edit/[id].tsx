import Link from 'next/link'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { addZeroToTime, getGameName, getSocket } from '../../utils'
import React, { useState, useEffect, BaseSyntheticEvent } from "react";
import { GameState, Score } from '../../utils';
import ScoreCard from '../../components/ScoreCard';
const IndexPage = () => {
  const [teamList, setTeamList] = useState<String[]>([]);
  let socket = getSocket();
  let isConnected = !socket.disconnected;
  const router = useRouter();
  const { id } = router.query
  const [formName, setFormName] = useState<string>('');
  const [formDate, setFormDate] = useState<any>(new Date().getTime());
  const [formType, setFormType] = useState<any>(0);
  let isUnloaded = false;
  useEffect(() => {
    console.log(id)
    if (!id) return;
    socket.on('client:welcome', data => {
      isConnected = true;
      if (!isUnloaded) {
        socket.emit('score:single', { id: id });
      }
    });
    socket.on('score:delete', data => {
      if (!isUnloaded) {
        alert('Game deleted');
        router.push('/');
      }
    });
    socket.on('score:edit', data => {
      if (!isUnloaded) {
        alert('Game saved');
        router.push('/');
      }
    });
    socket.on('score:single', data => {
      if (data.code == '201' && !isUnloaded) {
        isConnected = true;
        if (data.score.id == id) {
          setFormName(data.score.name);
          setFormType(data.score.gameType);
          setFormDate(new Date(data.score.stamp).toISOString().split('.')[0]);
          for (const team of data.score.teams) {
            setTeamList(teamList => [...teamList, team.name]);
          }
        }
      }
    });
    const exitingFunction = () => {
      isUnloaded = true;
    };
    router.events.on('routeChangeStart', exitingFunction);
    socket.emit('score:single', { id: id });
  }, []);
  const deleteScore = (e: BaseSyntheticEvent) => {
    //Confirm and delete
    e.preventDefault();
    if (confirm('Are you sure you want to delete this?')) {
      socket.emit('score:delete', { id: id });
    }
  };
  const saveFrom = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    if (!event.target.name.value || !event.target.name.value || event.target.name.value.length < 1 || event.target.name.value.length < 1) {
      alert('Please fill in all fields');
      return;
    } else {
      socket.emit('score:edit', { id: id, name: event.target.name.value, stamp: event.target.stamp.value });
    }
  };
  return (
    <Layout title="แก้ไขเกม">
      <div className="text-5xl ml-4 mb-8">แก้ไขเกม</div>
      <form className='px-10 text-gray-600' onSubmit={saveFrom}>
        <div className="inline float-right">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={deleteScore}>
            ลบเกมนี้
          </button>
        </div>
        <div className='mt-14 text-2xl'>	• ข้อมูลเกม</div>
        <hr />
        <div className="ml-4">
          <div className="mt-3">
            <p className='pb-1'>ชื่อกิจกรรมนี้:</p>
            <input id="name" name="name" value={formName} onChange={e => setFormName(e.target.value)} type="text" className="rounded w-full" />
          </div>
          <div className="mt-5">
            <p className='pb-1'>รูปแบบกีฬา:</p>
            <select disabled id='gameType' name='gameType' value={formType} className="form-select px-4 py-3 rounded w-full">
              <option disabled value="0">โปรดเลือก</option>
              <option value="1">บาสเกตบอล</option>
              <option value="2">ฟุตบอล</option>
              <option value="4">วอลเลย์บอล</option>
              <option value="6">เปตอง</option>
              <option value="7">ตะกร้อ</option>
              <option value="9">แบดมินตัน</option>
            </select>
          </div>
          <div className="mt-5">
            <p className='pb-1'>วันและเวลาที่เริ่ม:</p>
            <input id='stamp' name='stamp' type="datetime-local" onChange={e => setFormDate(e.target.value)} value={formDate as any} className="rounded w-full" />
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
                </div>
              )
            }) : <p className='text-gray-600 text-center'> - ไม่มีทีมในตอนนี้ - </p>
          }
        </div>
        <button type='submit' className="col-span-1 bg-green-500 hover:bg-green-600 duration-100 rounded-md font-bold text-white px-6 py-2 float-right mt-10">บันทึก</button>
      </form>
    </Layout>
  )
}

export default IndexPage
