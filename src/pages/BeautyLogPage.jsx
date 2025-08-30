import React, { useState, useMemo } from 'react';

// ダミーのコスメデータ
const dummyPouch = [
  { id: 1, name: 'ピュアセラム', usagePerDay: 0.5 }, // 1日0.5%消費すると仮定
  { id: 2, name: 'ナイトリペアクリーム', usagePerDay: 0.4 },
  { id: 3, name: 'UVプロテクター', usagePerDay: 0.7 },
  { id: 4, name: 'ルミナスファンデーション', usagePerDay: 0.3 },
];

export default function BeautyLogPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [usedCosmetics, setUsedCosmetics] = useState({});

  const handleCheckboxChange = (cosmeticId) => {
    setUsedCosmetics(prev => ({
      ...prev,
      [cosmeticId]: !prev[cosmeticId]
    }));
  };
  
  const handleSaveLog = () => {
    // ここでデータを保存するロジックを実行
    // 今回はアラートで表示するモックアップ
    const usedItems = dummyPouch.filter(c => usedCosmetics[c.id]).map(c => c.name);
    alert(`${selectedDate.toLocaleDateString()}のログを保存しました！\n使用アイテム: ${usedItems.join(', ')}\n\n※この操作で各コスメの残量が自動計算されます。`);
  };

  return (
    <div className="p-4 md:p-6 grid md:grid-cols-3 gap-6">
      {/* カレンダー */}
      <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">美容ログ</h1>
        <p className="text-warm-gray-500 mt-1">{selectedDate.getFullYear()}年 {selectedDate.getMonth() + 1}月</p>
        <Calendar date={selectedDate} onDateClick={setSelectedDate} />
      </div>
      
      {/* ログ入力 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="font-semibold">{selectedDate.toLocaleDateString()} に使ったコスメ</h2>
        <p className="text-sm text-warm-gray-500">チェックを入れて記録しましょう。</p>
        <div className="mt-4 space-y-3 max-h-96 overflow-y-auto pr-2">
          {dummyPouch.map(cosmetic => (
            <label key={cosmetic.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-cream-yellow transition-colors">
              <input type="checkbox" checked={!!usedCosmetics[cosmetic.id]} onChange={() => handleCheckboxChange(cosmetic.id)} className="h-5 w-5 rounded border-yellow-300 text-coral-pink focus:ring-coral-pink" />
              <span className="font-medium text-sm">{cosmetic.name}</span>
            </label>
          ))}
        </div>
        <button onClick={handleSaveLog} className="mt-6 w-full rounded-full bg-coral-pink px-6 py-3 text-white font-semibold shadow hover:opacity-90">この内容で登録する</button>
      </div>
    </div>
  );
}

// 簡単なカレンダーコンポーネント
function Calendar({ date, onDateClick }) {
    // ... カレンダーのロジック (簡略版) ...
    const today = new Date();
    const days = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <div className="mt-4 grid grid-cols-7 gap-1 text-center">
            {['日', '月', '火', '水', '木', '金', '土'].map(d => <div key={d} className="text-xs text-warm-gray-400">{d}</div>)}
            {days.map(day => (
                <button key={day} onClick={() => onDateClick(new Date(date.getFullYear(), date.getMonth(), day))}
                    className={`p-2 rounded-full aspect-square ${day === today.getDate() ? 'bg-coral-pink text-white' : 'hover:bg-cream-yellow'}`}>
                    {day}
                </button>
            ))}
        </div>
    );
}
