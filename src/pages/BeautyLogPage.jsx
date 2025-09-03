import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// モックデータ: 日付をキーにしたコスメ使用ログ
const beautyLogData = {
  '2025-09-01': [ { id: 1, name: 'ピュアセラム', emoji: '💧' }],
  '2025-09-03': [ { id: 1, name: 'ピュアセラム', emoji: '💧' }, { id: 2, name: 'ナイトリペアクリーム', emoji: '🌙' }],
  '2025-09-04': [ { id: 3, name: 'UVプロテクター', emoji: '☀️' }],
  '2025-09-05': [ { id: 1, name: 'ピュアセラム', emoji: '💧' }, { id: 3, name: 'UVプロテクター', emoji: '☀️' } ],
};

// モックデータ: ユーザーがポーチに持っているコスメ
const userCosmetics = [
    { id: 1, name: 'ピュアセラム', emoji: '💧' },
    { id: 2, name: 'ナイトリペアクリーム', emoji: '🌙' },
    { id: 3, name: 'UVプロテクター', emoji: '☀️' },
    { id: 4, name: '集中ケアヘアマスク', emoji: '💆‍♀️' }
];

export default function BeautyLogPage() {
  // 注: このモックでは簡単のため、月をまたいだ表示は考慮していません
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // 2025年9月
  const [selectedCosmetics, setSelectedCosmetics] = useState({});
  const [toast, setToast] = useState('');

  const today = new Date();
  today.setHours(0,0,0,0);

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentDate]);

  const handleLogSubmit = () => {
    const selectedIds = Object.keys(selectedCosmetics).filter(id => selectedCosmetics[id]);
    if (selectedIds.length === 0) {
      setToast('コスメが選択されていません。');
      setTimeout(() => setToast(''), 2000);
      return;
    }
    // ここで実際にデータを保存する処理を呼び出す（今回はモックなので何もしない）
    setToast('今日の美容ログを記録しました！');
    setTimeout(() => setToast(''), 2000);
    setSelectedCosmetics({}); // チェックボックスをリセット
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-warm-gray">美容ログ</h1>
        <Link to="/" className="text-sm font-semibold text-coral-pink hover:underline">マイページに戻る</Link>
      </div>
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2 bg-white p-4 rounded-2xl shadow-sm">
            <div className="text-center font-bold text-lg text-warm-gray mb-4">
                {`${currentDate.getFullYear()}年 ${currentDate.getMonth() + 1}月`}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-warm-gray-500 mb-2">
                {['日', '月', '火', '水', '木', '金', '土'].map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {daysInMonth.map(day => {
                    const dateString = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
                    const logForDay = beautyLogData[dateString] || [];
                    const isToday = day.getTime() === today.getTime();
                    return (
                        <div key={day.toISOString()} className={`aspect-square border rounded-lg p-1 flex flex-col ${isToday ? 'border-coral-pink' : 'border-yellow-200'}`}>
                            <span className={`font-semibold ${isToday ? 'text-coral-pink' : 'text-warm-gray-500'}`}>{day.getDate()}</span>
                            {/* コスメスタンプ表示エリア */}
                            <div className="flex-grow flex flex-wrap items-start justify-start gap-1 mt-1 overflow-hidden">
                                {logForDay.map(cosmetic => (
                                    <span key={cosmetic.id} title={cosmetic.name} className="text-sm">
                                      {/* 本番ではここに商品画像<img />を表示 */}
                                      {cosmetic.emoji}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Log Input Form */}
        <div className="bg-white p-5 rounded-2xl shadow-sm self-start">
            <h2 className="font-bold text-warm-gray">今日のログを記録</h2>
            <p className="text-sm text-warm-gray-500 mt-1">今日使ったコスメをチェック！</p>
            <div className="mt-4 space-y-3 max-h-60 overflow-y-auto pr-2">
                {userCosmetics.map(cosmetic => (
                    <label key={cosmetic.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-cream-yellow">
                        <input 
                            type="checkbox" 
                            checked={!!selectedCosmetics[cosmetic.id]}
                            onChange={e => setSelectedCosmetics(p => ({...p, [cosmetic.id]: e.target.checked}))}
                            className="rounded border-yellow-200 text-coral-pink shadow-sm focus:border-coral-pink focus:ring focus:ring-offset-0 focus:ring-coral-pink focus:ring-opacity-50"
                        />
                        <span className="text-sm">{cosmetic.emoji} {cosmetic.name}</span>
                    </label>
                ))}
            </div>
            <button onClick={handleLogSubmit} className="w-full mt-4 bg-coral-pink text-white font-semibold rounded-full py-2.5 shadow hover:opacity-90 transition-opacity">
                登録する
            </button>
        </div>
      </div>
      {toast && <div className="fixed bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-warm-gray px-5 py-2 text-white shadow-lg text-sm">{toast}</div>}
    </div>
  );
}

