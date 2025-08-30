import React from 'react';
import { useParams, Link } from 'react-router-dom';

// ダミーデータ
const salonData = {
  'omotesando-a': {
    name: '表参道A店',
    address: '東京都渋谷区神宮前...',
    treatment: 'ダメージ補修カット&カラー',
    price: '16,500円',
    details: '最新のAI診断でお客様一人ひとりの髪質と骨格に合わせた最高のスタイルを提案。独自の配合で行うカラーは、ダメージを最小限に抑えつつ、驚くほどの透明感とツヤを実現します。'
  },
  'shinjuku-b': {
    name: '新宿エステB',
    address: '東京都新宿区西新宿...',
    treatment: '肌ゆらぎ対策・高保湿フェイシャル',
    price: '12,800円',
    details: '季節の変わり目やストレスで敏感になったお肌を優しくケア。高濃度の保湿成分を肌の奥深くまで届け、内側から輝くような潤いとハリを取り戻します。'
  }
};

export default function SalonPage() {
  const { salonId } = useParams();
  const data = salonData[salonId] || { name: '店舗が見つかりません', details: '' };

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="h-48 bg-cream-yellow rounded-t-2xl"></div>
        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{data.name}</h1>
          <p className="text-sm text-warm-gray-500 mt-1">{data.address}</p>

          <div className="mt-6 border-t border-yellow-200 pt-6">
            <h2 className="font-semibold text-lg">【AI】{data.treatment}</h2>
            <p className="text-2xl font-bold text-coral-pink mt-2">{data.price}</p>
            <p className="mt-4 text-warm-gray-500 leading-relaxed">{data.details}</p>
          </div>
          
          <div className="mt-6 flex gap-4">
            <button className="flex-1 rounded-full bg-coral-pink px-6 py-3 text-white font-semibold shadow hover:opacity-90">この内容で予約する</button>
            <Link to="/" className="rounded-full border border-yellow-200 px-6 py-3 font-semibold">プランに戻る</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
