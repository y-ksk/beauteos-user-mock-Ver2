import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PouchCard from '../components/PouchCard.jsx';
import UserPouchCard from '../components/UserPouchCard.jsx';

const myPouches = [
  { id: 'daily', name: '日常使い', itemCount: 12, icon: '☀️' },
  { id: 'travel', name: '旅行', itemCount: 5, icon: '✈️' },
  { id: 'skincare', name: 'スキンケア', itemCount: 8, icon: '💧' },
];
const friendPouches = [
    { id: 'user-a', name: 'Aさん', update: '新しいコスメが追加されました！', icon: '😊' },
    { id: 'user-b', name: 'Bさん', update: '肌質改善に効果が出てきたようです！', icon: '😎' },
    { id: 'user-c', name: 'Cさん', update: 'お気に入りのセラムを更新しました', icon: '🥰' },
];

export default function PouchPage() {
  const [activeTab, setActiveTab] = useState('my');

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">デジタルコスメポーチ</h1>
        <Link to="/add-cosmetic" className="bg-coral-pink text-white font-semibold rounded-full px-5 py-2.5 shadow hover:opacity-90 transition-opacity">
          ＋ コスメを追加
        </Link>
      </div>

      <div className="mt-6 border-b border-yellow-200">
        <nav className="-mb-px flex space-x-6">
          <button onClick={() => setActiveTab('my')} className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'my' ? 'border-coral-pink text-coral-pink' : 'border-transparent text-warm-gray-500 hover:text-warm-gray'}`}>
            わたしのポーチ
          </button>
          <button onClick={() => setActiveTab('everyone')} className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'everyone' ? 'border-coral-pink text-coral-pink' : 'border-transparent text-warm-gray-500 hover:text-warm-gray'}`}>
            みんなのポーチ
          </button>
        </nav>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {activeTab === 'my' 
          ? myPouches.map(pouch => <PouchCard key={pouch.id} pouch={pouch} />)
          : friendPouches.map(user => <UserPouchCard key={user.id} user={user} />)
        }
      </div>
    </div>
  );
}

