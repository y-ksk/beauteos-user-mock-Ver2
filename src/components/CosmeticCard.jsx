import React from 'react';

const phaseStyles = {
  '使用中': 'bg-green-100 text-green-800',
  '新品': 'bg-blue-100 text-blue-800',
  'もうすぐ無くなる': 'bg-red-100 text-red-800',
};

export default function CosmeticCard({ cosmetic }) {
  const getUsageText = (usage) => {
    if (usage > 95) return "新品です";
    if (usage > 20) return `残量 ${usage}%`;
    return `残量 ${usage}% (のこりわずか)`;
  };
  
  const progressBarColor = cosmetic.usage > 20 ? "bg-coral-pink" : "bg-red-500";

  return (
    <div className="bg-white rounded-2xl shadow-sm p-3 transition-transform hover:-translate-y-1">
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400 text-4xl">🧴</span>
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-start">
            <h4 className="font-semibold text-warm-gray text-sm leading-tight">{cosmetic.name}</h4>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${phaseStyles[cosmetic.phase] || ''}`}>
                {cosmetic.phase}
            </span>
        </div>
        <p className="text-xs text-warm-gray-500 mt-0.5">{cosmetic.brand}</p>
      </div>
      
      {/* 使用量トラッカー */}
      <div className="mt-3">
         <p className="text-xs text-warm-gray-500 mb-1 text-right">{getUsageText(cosmetic.usage)}</p>
        <div className="w-full bg-yellow-100 rounded-full h-1.5">
          <div className={`${progressBarColor} h-1.5 rounded-full`} style={{ width: `${cosmetic.usage}%` }}></div>
        </div>
      </div>
    </div>
  );
}

