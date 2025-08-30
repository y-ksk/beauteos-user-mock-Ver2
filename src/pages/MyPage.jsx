import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ダミーAI応答
async function fakeAiRespond(prompt) {
  const ideas = [
    "週次のホームケアと来店のベストミックスを提案します",
    "予算配分を施術/商品/通院に最適化しました",
    "直近2週間の予定から無理のない予約候補を作成しました",
    "悩みタグに基づく商品を3つ比較して最適案を提示します",
  ];
  const pick = ideas[Math.floor(Math.random() * ideas.length)];
  return `【AIプラン提案（モック）]\n${pick}\n\n要件: ${prompt.slice(0, 60)}…`;
}

// UI Tokens
const tokens = {
  radius: "rounded-2xl",
  pad: "p-4 md:p-6",
  gap: "gap-4 md:gap-6",
};

// ヘルパー
const formatJPY = (n) =>
  new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(
    n
  );

export default function MyPage() {
  const [isPlanModalOpen, setPlanModalOpen] = useState(false);
  const [lastPlan, setLastPlan] = useState(null);
  const [isLastPlanModalOpen, setLastPlanModalOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleGeneratedPlan = (planText) => {
    setLastPlan(planText);
    setToast("新しい美容プランが生成されました！");
  };

  const showLastPlan = () => {
    if (lastPlan) {
      setLastPlanModalOpen(true);
    } else {
      setToast("まだ保存されているプランがありません。");
    }
  };

  return (
    <>
      {/* 美容ログ */}
      <div className="px-4 md:px-6 mt-4">
        <div className="p-6 bg-white rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg text-warm-gray">美容ログ</h3>
            {/* ★★★ このリンク先が正しいか確認 ★★★ */}
            <Link to="/log" className="text-sm font-semibold text-coral-pink hover:underline">
              カレンダーで見る →
            </Link>
          </div>
          <p className="text-sm text-warm-gray-500 mt-2">
            毎日のスキンケアやコスメ使用を記録して、あなたの美容サイクルを見つけましょう。
          </p>
        </div>
      </div>

      {/* ナビゲーション */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-6 mt-4">
        <Link
          to="/pouch"
          className="block p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="text-3xl">👝</div>
          <h3 className="font-semibold text-lg mt-2 text-warm-gray">
            デジタルコスメポーチ
          </h3>
          <p className="text-sm text-warm-gray-500 mt-1">
            あなたのコスメを記録・管理しましょう
          </p>
        </Link>
        <Link
          to="/reviews"
          className="block p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="text-3xl">✨</div>
          <h3 className="font-semibold text-lg mt-2 text-warm-gray">
            みんなの口コミ
          </h3>
          <p className="text-sm text-warm-gray-500 mt-1">
            リアルな使用感をチェックして発見
          </p>
        </Link>
      </div>

      <div className="px-4 md:px-6">
        <PlanSection onOpenModal={() => setPlanModalOpen(true)} onShowLastPlan={showLastPlan} />
        <TimelineSection />
        <RecommendSection />
      </div>

      <AnimatePresence>
        {isPlanModalOpen && (
          <PlanWizard
            onClose={() => setPlanModalOpen(false)}
            onGenerated={handleGeneratedPlan}
          />
        )}
        {isLastPlanModalOpen && (
            <Modal onClose={() => setLastPlanModalOpen(false)}>
                 <div className={`${tokens.pad} ${tokens.radius}`}>
                   <div className="text-lg font-semibold">前回のプラン</div>
                   <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-cream-yellow p-4 text-sm text-warm-gray-500">
                     {lastPlan}
                   </pre>
                   <div className="mt-4 flex justify-end">
                     <button
                       className="rounded-full bg-warm-gray px-4 py-2 text-white"
                       onClick={() => setLastPlanModalOpen(false)}
                     >
                       閉じる
                     </button>
                   </div>
                 </div>
            </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-warm-gray px-4 py-2 text-white shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


// --- コンポーネント ---

function PlanSection({ onOpenModal, onShowLastPlan }) {
  return (
    <section className={`mt-4 ${tokens.radius} border border-yellow-200 bg-white ${tokens.pad} shadow-sm`}>
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold tracking-tight">AIプラン作成</h3>
        <div className="flex gap-2">
          <button onClick={onOpenModal} className="rounded-full bg-coral-pink px-4 py-2 text-white font-semibold">作成</button>
          <button onClick={onShowLastPlan} className="rounded-full border border-yellow-200 bg-white px-4 py-2">前回プラン</button>
        </div>
      </div>
      <p className="mt-2 text-warm-gray-500 text-sm">目標・いまの画像（任意）と、カテゴリ・予算をもとに、最適な美容プランを生成します。</p>
    </section>
  );
}

function TimelineSection() {
  const timelineItems = [
    { id: 1, date: "2025-09-02", title: "カット & カラー", store: "表参道A店", reason: "AIがあなたの髪質と理想像の差を分析。特に色落ちを防ぐための施術を提案しました。" },
    { id: 2, date: "2025-09-16", title: "光フェイシャル", store: "新宿エステB", reason: "肌診断の結果、ターンオーバーの乱れを検知。肌サイクルを整える最適な施術です。" },
  ];
  return (
    <section className={`mt-4 ${tokens.radius} border border-yellow-200 bg-white ${tokens.pad} shadow-sm`}>
      <h3 className="text-base md:text-lg font-semibold tracking-tight">プランのタイムライン</h3>
      <div className="mt-3 grid gap-3">
        {timelineItems.map(item => (
           <Link to={`/salon/${item.id}`} key={item.id} className={`block p-4 ${tokens.radius} border border-yellow-200 hover:border-coral-pink transition-colors`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-warm-gray-500">{item.date}</div>
                  <div className="font-medium">{item.title} <span className="text-sm text-warm-gray-500">({item.store})</span></div>
                </div>
                <span className="text-coral-pink">→</span>
              </div>
              <p className="mt-2 text-xs text-warm-gray-500 bg-cream-yellow p-2 rounded-lg">
                <span className="font-bold text-coral-pink">おすすめ理由：</span>{item.reason}
              </p>
           </Link>
        ))}
      </div>
    </section>
  );
}

function RecommendSection() {
    const products = [
    {
      name: "集中ヘアマスク",
      price: 2480,
      reason: "色持ちと手触りを両立させ、サロン帰りのような質感をキープします。",
      isPersonalized: true,
      basis: "表参道A店でのカラー施術記録と「ダメージが気になる」とのカウンセリングメモより。",
    },
    {
      name: "保湿セラム（夜用）",
      price: 3980,
      reason: "低刺激処方で就寝中に集中ケア。翌朝の肌の潤いをサポートします。",
      isPersonalized: true,
      basis: "新宿エステBでの肌診断で「乾燥・刺激に弱い」との結果より。",
    },
    {
      name: "UVプロテクト",
      price: 1980,
      reason: "日中の紫外線ダメージをしっかり対策。屋外活動が多い方向けの定番アイテムです。",
      isPersonalized: false,
    },
  ];
  return (
    <section className={`mt-4 ${tokens.radius} border border-yellow-200 bg-white ${tokens.pad} shadow-sm`}>
      <h3 className="text-base md:text-lg font-semibold tracking-tight">プラン実現をサポートするおすすめ商品</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((p, idx) => (
          <article key={idx} className={`border border-yellow-200 ${tokens.radius} p-4 bg-white flex flex-col`}>
            {p.isPersonalized && <span className="rounded-full bg-warm-gray text-white text-xs px-2 py-0.5 self-start font-semibold">あなた向け</span>}
            <div className="flex-grow mt-2">
                <h4 className="font-semibold">{p.name}</h4>
                <p className="text-sm text-warm-gray-500 mt-1">{p.reason}</p>
                {p.isPersonalized && <p className="mt-2 text-xs text-warm-gray-500 bg-cream-yellow p-2 rounded-lg"><span className="font-bold text-coral-pink">根拠：</span>{p.basis}</p>}
            </div>
            <div className="mt-4 flex justify-end items-center">
                <span className="text-sm font-semibold mr-4">{formatJPY(p.price)}</span>
                <a href="#" target="_blank" rel="noopener noreferrer" className="rounded-full bg-coral-pink px-4 py-2 text-white inline-flex items-center text-sm font-semibold">購入ページ</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PlanWizard({ onClose, onGenerated }) {
  const [goal, setGoal] = useState("半年後の挙式でベストコンディション");
  const [budget, setBudget] = useState(50000);
  const [categories, setCategories] = useState({ hair: true, esthe: true });
  const [loading, setLoading] = useState(false);
  
  const fileRefGoal = useRef(null);
  const fileRefCurrent = useRef(null);
  const [goalPreview, setGoalPreview] = useState("");
  const [currentPreview, setCurrentPreview] = useState("");

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      setter(URL.createObjectURL(file));
    }
  };

  const generate = async () => {
    setLoading(true);
    const planText = await fakeAiRespond(`目標: ${goal}, 予算: ${budget}円`);
    setLoading(false);
    onGenerated(planText);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className={`${tokens.pad} ${tokens.radius} max-h-[90vh] overflow-y-auto`}>
        <h2 className="text-xl font-semibold">AIプラン作成</h2>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
                <label className="text-sm font-medium text-warm-gray-500">目標（テキスト）</label>
                <input value={goal} onChange={e => setGoal(e.target.value)} className="mt-1 w-full rounded-xl border border-yellow-200 px-3 py-2" />
            </div>
            <div>
                <label className="text-sm font-medium text-warm-gray-500">月あたり予算</label>
                <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-yellow-200 px-3 py-2" />
            </div>

            <div className="md:col-span-2">
                <label className="text-sm font-medium text-warm-gray-500">カテゴリ</label>
                <div className="mt-2 flex flex-wrap gap-3">
                    {["ヘアサロン", "ネイル・まつげサロン", "リラクサロン", "エステサロン", "美容クリニック"].map(cat => (
                        <label key={cat} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded text-coral-pink focus:ring-coral-pink/50"/>
                            <span>{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-sm font-medium text-warm-gray-500">なりたい理想像（任意）</label>
                 <div className="mt-1 flex items-center gap-3">
                    <button onClick={() => fileRefGoal.current?.click()} className="rounded-lg border border-dashed border-yellow-300 bg-white px-4 py-2 text-sm">画像を選択</button>
                    {goalPreview ? <img src={goalPreview} className="h-12 w-12 rounded-lg object-cover" /> : <span className="text-sm text-warm-gray-500">未選択</span>}
                    <input ref={fileRefGoal} type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, setGoalPreview)} />
                </div>
            </div>

            <div>
                <label className="text-sm font-medium text-warm-gray-500">いまの私（任意）</label>
                <div className="mt-1 flex items-center gap-3">
                    <button onClick={() => fileRefCurrent.current?.click()} className="rounded-lg border border-dashed border-yellow-300 bg-white px-4 py-2 text-sm">画像を選択</button>
                    {currentPreview ? <img src={currentPreview} className="h-12 w-12 rounded-lg object-cover" /> : <span className="text-sm text-warm-gray-500">未選択</span>}
                    <input ref={fileRefCurrent} type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, setCurrentPreview)} />
                </div>
            </div>
        </div>

        <div className="mt-6 space-y-3 text-sm">
             <details className="rounded-xl border border-yellow-200 p-3 bg-cream-yellow/50">
               <summary className="cursor-pointer font-medium">撮影のコツ</summary>
               <ul className="mt-2 list-disc pl-5 text-warm-gray-500 space-y-1">
                 <li>明るい場所で正面から。可能なら自然光</li>
                 <li>メイク/ヘアセットは控えめ（状態が分かるように）</li>
               </ul>
             </details>
             <details className="rounded-xl border border-yellow-200 p-3 bg-cream-yellow/50">
               <summary className="cursor-pointer font-medium">プライバシーとデータの扱い</summary>
               <p className="mt-2 text-warm-gray-500">画像はプラン生成にのみ利用され、サーバーには保存されません。</p>
             </details>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-full border border-yellow-200 bg-white px-4 py-2">キャンセル</button>
          <button onClick={generate} disabled={loading} className="rounded-full bg-warm-gray px-4 py-2 text-white w-24">
            {loading ? "生成中…" : "生成"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Modal({ children, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="w-full max-w-2xl bg-cream-yellow rounded-2xl shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

