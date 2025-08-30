import React from 'react';

export default function AddCosmeticPage() {
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">コスメを追加</h1>
      <p className="mt-2 text-warm-gray-500">レシート撮影や写真から、かんたんにポーチへ登録できます。</p>

      {/* 簡単登録 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="p-8 border-2 border-dashed border-yellow-300 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white transition-colors">
          <span className="text-4xl">📷</span>
          <span className="font-semibold mt-2">レシートを撮影</span>
          <span className="text-sm text-warm-gray-500">購入品をまとめて登録</span>
        </button>
        <button className="p-8 border-2 border-dashed border-yellow-300 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white transition-colors">
          <span className="text-4xl">📦</span>
          <span className="font-semibold mt-2">商品の写真を撮る</span>
          <span className="text-sm text-warm-gray-500">パッケージから自動認識</span>
        </button>
      </div>

      {/* 手動入力 */}
      <div className="mt-8">
        <h2 className="font-semibold">手動で入力</h2>
        <div className="mt-4 p-6 bg-white rounded-2xl shadow-sm space-y-4">
          <div>
            <label className="text-sm font-medium text-warm-gray-500">ブランド名</label>
            <input type="text" placeholder="例: BeauteBrand" className="mt-1 w-full rounded-lg border-yellow-200 p-2"/>
          </div>
          <div>
            <label className="text-sm font-medium text-warm-gray-500">商品名</label>
            <input type="text" placeholder="例: ピュアセラム" className="mt-1 w-full rounded-lg border-yellow-200 p-2"/>
          </div>
          {/* ↓↓ ここからが追加項目 ↓↓ */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-warm-gray-500">購入日</label>
              <input type="date" className="mt-1 w-full rounded-lg border-yellow-200 p-2"/>
            </div>
            <div>
              <label className="text-sm font-medium text-warm-gray-500">金額（円）</label>
              <input type="number" placeholder="例: 3500" className="mt-1 w-full rounded-lg border-yellow-200 p-2"/>
            </div>
          </div>
          <div>
             <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-cream-yellow transition-colors">
              <input type="checkbox" className="h-5 w-5 rounded border-yellow-300 text-coral-pink focus:ring-coral-pink" />
              <span className="font-medium text-sm">プレゼントで貰ったもの</span>
            </label>
          </div>
          {/* ↑↑ ここまでが追加項目 ↑↑ */}
          <button className="w-full mt-4 rounded-full bg-coral-pink px-6 py-3 text-white font-semibold shadow hover:opacity-90">この内容で登録</button>
        </div>
      </div>
    </div>
  );
}

