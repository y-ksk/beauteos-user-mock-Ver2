import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CosmeticCard from '../components/CosmeticCard.jsx';

const allCosmetics = [
  { id: 1, pouchId: 'daily', name: 'ピュアセラム', brand: 'BeauteBrand', phase: '使用中', usage: 75 },
  { id: 2, pouchId: 'daily', name: 'ナイトリペアクリーム', brand: 'Organic Co.', phase: '使用中', usage: 40 },
  { id: 3, pouchId: 'daily', name: 'UVプロテクター', brand: 'SunCare', phase: '新品', usage: 100 },
  { id: 4, pouchId: 'skincare', name: 'モイストローション', brand: 'AquaLife', phase: 'もうすぐ無くなる', usage: 15 },
];
const pouchNames = { daily: '日常使い', travel: '旅行', skincare: 'スキンケア' };

export default function CosmeticListPage() {
  const { pouchId } = useParams();
  const [filter, setFilter] = useState('all');

  const filteredCosmetics = allCosmetics.filter(c => c.pouchId === pouchId && (filter === 'all' || c.phase === filter));
  const pouchName = pouchNames[pouchId] || 'コスメ一覧';

  return (
    <div className="p-4 md:p-6">
      <Link to="/pouch" className="text-sm text-warm-gray-500 hover:underline">← ポーチ一覧に戻る</Link>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-2">{pouchName}</h1>
      
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        <button onClick={() => setFilter('all')} className={`rounded-full px-4 py-1.5 text-sm whitespace-nowrap ${filter === 'all' ? 'bg-coral-pink text-white' : 'bg-white border border-yellow-200'}`}>すべて</button>
        <button onClick={() => setFilter('使用中')} className={`rounded-full px-4 py-1.5 text-sm whitespace-nowrap ${filter === '使用中' ? 'bg-coral-pink text-white' : 'bg-white border border-yellow-200'}`}>使用中</button>
        <button onClick={() => setFilter('もうすぐ無くなる')} className={`rounded-full px-4 py-1.5 text-sm whitespace-nowrap ${filter === 'もうすぐ無くなる' ? 'bg-coral-pink text-white' : 'bg-white border border-yellow-200'}`}>もうすぐ無くなる</button>
        <button onClick={() => setFilter('新品')} className={`rounded-full px-4 py-1.5 text-sm whitespace-nowrap ${filter === '新品' ? 'bg-coral-pink text-white' : 'bg-white border border-yellow-200'}`}>新品</button>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredCosmetics.map(item => <CosmeticCard key={item.id} cosmetic={item} />)}
      </div>
    </div>
  );
}

