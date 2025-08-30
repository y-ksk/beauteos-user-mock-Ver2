import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const tokens = { radius: "rounded-2xl", pad: "p-4 md:p-6", gap: "gap-4 md:gap-6" };
const formatJPY = (n) => new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(n);

// MyPageコンポーネント
export default function MyPage() {
  const [planWizardOpen, setPlanWizardOpen] = useState(false);
  const [previousPlanOpen, setPreviousPlanOpen] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const handlePlanGenerated = (planText) => {
    setGeneratedPlan(planText);
    setPlanWizardOpen(false);
    setPreviousPlanOpen(true);
    setToast("新しい美容プランが生成されました！");
  };

  return (
    <>
      <BeautyLogSection />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-6 mb-4">
        <Link to="/pouch" className="block p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-3xl">👝</div>
          <h3 className="font-semibold text-lg mt-2 text-warm-gray">デジタルコスメポーチ</h3>
          <p className="text-sm text-warm-gray-500 mt-1">あなたのコスメを記録・管理しましょう</p>
        </Link>
        <Link to="/reviews" className="block p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-3xl">✨</div>
          <h3 className="font-semibold text-lg mt-2 text-warm-gray">みんなの口コミ</h3>
          <p className="text-sm text-warm-gray-500 mt-1">リアルな使用感をチェックして発見</p>
        </Link>
      </div>
      <div className="pb-28 md:pb-10">
        <PlanSection onOpenWizard={() => setPlanWizardOpen(true)} onOpenPrevious={() => setPreviousPlanOpen(true)} />
        <TimelineSection onToast={setToast} />
        <RecommendSection />
      </div>
      <AnimatePresence>
        {planWizardOpen && <PlanWizardModal onClose={() => setPlanWizardOpen(false)} onGenerated={handlePlanGenerated} />}
      </AnimatePresence>
      <AnimatePresence>
        {previousPlanOpen && (
          <Modal onClose={() => setPreviousPlanOpen(false)}>
            <div className={`${tokens.pad}`}>
              <h3 className="text-lg font-semibold">AIプラン（最新）</h3>
              <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-cream-yellow p-4 text-sm text-warm-gray-500">
                {generatedPlan || "まだプランがありません。「作成」ボタンから新しいプランを生成してください。"}
              </pre>
              <div className="mt-4 flex justify-end">
                <button onClick={() => setPreviousPlanOpen(false)} className="rounded-full bg-warm-gray px-4 py-2 text-white font-semibold">閉じる</button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 rounded-full bg-warm-gray px-4 py-2 text-white shadow-lg">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// 各セクションのコンポーネント
function BeautyLogSection() {
  return (
    <div className={`${tokens.pad} -mx-3 md:mx-0`}>
      <div className="border border-dashed border-coral-pink/50 bg-coral-pink/10 rounded-2xl p-6 text-center">
        <h2 className="font-bold text-xl text-coral-pink">今日の美容ログをつけよう</h2>
        <p className="text-warm-gray-500 mt-1">毎日の記録が、未来の美しさにつながります。</p>
        <Link to="/beauty-log" className="mt-4 inline-block bg-coral-pink text-white font-semibold rounded-full px-8 py-3 shadow hover:opacity-90 transition-opacity">
          美容ログを登録する
        </Link>
      </div>
    </div>
  );
}

function PlanSection({ onOpenWizard, onOpenPrevious }) {
  return (
    <section className={`mt-4 ${tokens.radius} border border-yellow-200 bg-white ${tokens.pad} shadow-sm`}>
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold tracking-tight">AIプラン作成</h3>
        <div className="flex gap-2">
          <button onClick={onOpenWizard} className="rounded-full bg-coral-pink px-4 py-2 text-white font-semibold">作成</button>
          <button onClick={onOpenPrevious} className="rounded-full border border-yellow-200 bg-white px-4 py-2">前回プラン</button>
        </div>
      </div>
    </section>
  );
}

function TimelineSection({ onToast }) {
  const timelineItems = [
    { id: 1, salonId: 'omotesando-a', date: "2025-09-02", title: "カット&カラー (表参道A店)", duration: "90分", reason: "あなたの髪質データに基づき、色持ちが良くダメージを抑える施術をAIが選定しました。" },
    { id: 2, salonId: 'shinjuku-b', date: "2025-09-16", title: "フェイシャル (新宿エステB)", duration: "60分", reason: "季節の変わり目の肌ゆらぎ対策として、保湿と鎮静に特化したコースをおすすめします。" },
  ];
  return (
    <section className={`mt-4 ${tokens.radius} border border-yellow-200 bg-white ${tokens.pad} shadow-sm`}>
      <h3 className="text-base md:text-lg font-semibold tracking-tight">プランのタイムライン</h3>
      <div className="mt-3 grid gap-3">
        {timelineItems.map((it) => (
          <Link to={`/salon/${it.salonId}`} key={it.id} className="block p-4 border border-yellow-200 rounded-2xl hover:bg-cream-yellow transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-warm-gray-500">{it.date} ・ {it.duration}</div>
                <div className="font-medium mt-0.5">{it.title}</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-warm-gray-400" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
            </div>
            <p className="mt-2 text-sm text-warm-gray-500 bg-cream-yellow/60 p-2 rounded-lg">おすすめ理由：{it.reason}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RecommendSection() {
  const products = [
    { name: "集中ヘアマスク", price: 2480, personalized: true, reason: "カラーの色持ちを良くし、手触りを改善します。", basis: "表参道A店の施術記録とカウンセリングメモ（サロン提供データ）に基づき選定。" },
    { name: "保湿セラム（夜用）", price: 3980, personalized: true, reason: "低刺激処方で、乾燥しやすい肌を就寝中に集中ケア。", basis: "新宿エステBでの肌診断結果（サロン提供データ）を反映。" },
    { name: "UVプロテクター", price: 1980, personalized: false, reason: "日中の紫外線ダメージを防ぎ、肌の老化を予防する定番アイテムです。", basis: null },
  ];
  return (
    <section className={`mt-4 ${tokens.radius} border border-yellow-200 bg-white ${tokens.pad} shadow-sm`}>
      <h3 className="text-base md:text-lg font-semibold tracking-tight">プラン実現をサポートするおすすめ商品</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((p, idx) => (
          <article key={idx} className={`border border-yellow-200 ${tokens.radius} p-4 bg-white flex flex-col`}>
            <div className="flex-grow">
              <div className="flex items-center gap-2 font-medium">
                {p.name}
                {p.personalized && <span className="rounded-full bg-coral-pink text-white text-xs px-2 py-0.5">あなた向け</span>}
              </div>
              <div className="text-sm text-warm-gray-500 mt-1">{formatJPY(p.price)}</div>
              <p className="text-sm text-warm-gray-500 mt-2">おすすめ理由：{p.reason}</p>
              {p.basis && <p className="text-xs text-warm-gray-400 mt-1">根拠：{p.basis}</p>}
            </div>
            <div className="mt-3 flex justify-end">
              <a href="#" className="rounded-full bg-coral-pink px-4 py-2 text-white inline-flex items-center text-sm font-semibold">購入ページ</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Modal({ children, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: -10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: -10 }}
        className={`bg-white ${tokens.radius} shadow-xl w-full max-w-3xl`} onClick={(e) => e.stopPropagation()}>
        {children}
      </motion.div>
    </motion.div>
  );
}

// ▼▼▼▼▼ ここからが今回修正したメインの部分です ▼▼▼▼▼
function PlanWizardModal({ onClose, onGenerated }) {
  const [goal, setGoal] = useState("半年後の挙式でベストコンディション");
  const [budget, setBudget] = useState(50000);
  const [categories, setCategories] = useState({ hair: true, nail: false, relax: false, esthe: true, clinic: false });
  
  const [goalImage, setGoalImage] = useState(null);
  const [goalPreview, setGoalPreview] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [currentPreview, setCurrentPreview] = useState("");

  const fileRefGoal = useRef(null);
  const fileRefCurrent = useRef(null);
  
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    if (type === 'goal') {
      setGoalImage(file);
      setGoalPreview(previewUrl);
    } else {
      setCurrentImage(file);
      setCurrentPreview(previewUrl);
    }
  };

  const generatePlan = () => {
    setLoading(true);
    setTimeout(() => {
      const selectedCategories = Object.entries(categories).filter(([, val]) => val).map(([key]) => key).join(', ');
      const planText = `目標: ${goal}\n予算: ${formatJPY(budget)}/月\nカテゴリ: ${selectedCategories}\n\n理想像画像: ${goalImage ? 'あり' : 'なし'}\n現在画像: ${currentImage ? 'あり' : 'なし'}\n\n上記に基づき、最適な8週間プランを生成しました。...`;
      onGenerated(planText);
      setLoading(false);
    }, 1500);
  };

  const categoryOptions = [
    { id: "hair", label: "ヘアサロン" },
    { id: "nail", label: "ネイル・まつげサロン" },
    { id: "relax", label: "リラクサロン" },
    { id: "esthe", label: "エステサロン" },
    { id: "clinic", label: "美容クリニック" },
  ];

  return (
    <Modal onClose={onClose}>
      <div className={`${tokens.pad} max-h-[90vh] overflow-y-auto`}>
        <h3 className="text-xl font-semibold text-warm-gray">プラン作成</h3>
        
        <div className="mt-6 grid md:grid-cols-2 gap-x-8 gap-y-6">
          {/* 左カラム */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-warm-gray-500">目標（テキスト）</label>
              <input type="text" value={goal} onChange={e => setGoal(e.target.value)} className="mt-1 w-full rounded-lg border-yellow-200 p-2"/>
            </div>
            <div>
              <label className="text-sm font-medium text-warm-gray-500">カテゴリ</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {categoryOptions.map(cat => (
                  <label key={cat.id} className="flex items-center gap-2 rounded-full border border-yellow-200 px-3 py-1.5 cursor-pointer hover:bg-cream-yellow">
                    <input type="checkbox" checked={categories[cat.id]} onChange={e => setCategories(prev => ({...prev, [cat.id]: e.target.checked}))} className="h-4 w-4 rounded border-yellow-300 text-coral-pink focus:ring-coral-pink"/>
                    <span className="text-sm">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 右カラム */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-warm-gray-500">月あたり予算</label>
              <input type="number" value={budget} onChange={e => setBudget(e.target.value)} className="mt-1 w-full rounded-lg border-yellow-200 p-2"/>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-warm-gray-500">なりたい理想像 (参考イメージ・任意)</label>
                <div className="mt-2 flex items-center gap-4">
                  <button onClick={() => fileRefGoal.current.click()} className="rounded-lg border border-yellow-200 px-4 py-2 text-sm font-semibold hover:bg-cream-yellow">画像を選択</button>
                  <input ref={fileRefGoal} type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, 'goal')}/>
                  {goalPreview ? <img src={goalPreview} className="h-12 w-12 rounded-lg object-cover" /> : <span className="text-sm text-warm-gray-400">未選択</span>}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-warm-gray-500">いまの私 (現在の状態の写真・任意)</label>
                 <div className="mt-2 flex items-center gap-4">
                  <button onClick={() => fileRefCurrent.current.click()} className="rounded-lg border border-yellow-200 px-4 py-2 text-sm font-semibold hover:bg-cream-yellow">画像を選択</button>
                  <input ref={fileRefCurrent} type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, 'current')}/>
                  {currentPreview ? <img src={currentPreview} className="h-12 w-12 rounded-lg object-cover" /> : <span className="text-sm text-warm-gray-400">未選択</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* トグルセクション */}
        <div className="mt-6 space-y-2">
            <details className="p-3 border border-yellow-200 rounded-lg">
                <summary className="font-medium text-sm cursor-pointer text-warm-gray-500">撮影のコツ</summary>
                <ul className="mt-2 list-disc pl-5 text-sm text-warm-gray-500 space-y-1">
                    <li>明るい場所で正面から。可能なら自然光</li>
                    <li>メイク/ヘアセットは控えめ（状態が分かるように）</li>
                    <li>髪は顔が隠れないようにまとめる</li>
                </ul>
            </details>
            <details className="p-3 border border-yellow-200 rounded-lg">
                <summary className="font-medium text-sm cursor-pointer text-warm-gray-500">プライバシーとデータの扱い</summary>
                <p className="mt-2 text-sm text-warm-gray-500">画像の選択は任意です。このモックでは画像はブラウザ内でのみプレビューされ、サーバに保存されません。</p>
            </details>
        </div>
        
        <div className="mt-6 flex justify-end items-center gap-2">
            <button onClick={onClose} className="rounded-full border border-yellow-200 bg-white px-4 py-2 text-sm font-semibold">キャンセル</button>
            <button onClick={generatePlan} disabled={loading} className="rounded-full bg-warm-gray px-4 py-2 text-white font-semibold text-sm disabled:opacity-50">
              {loading ? "生成中..." : "生成"}
            </button>
        </div>
      </div>
    </Modal>
  );
}

