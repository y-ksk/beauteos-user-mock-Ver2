import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ダミーAI応答
async function fakeAiRespond(prompt) {
  const ideas = [
    "週次のホームケアと来店のベストミックスを提案します",
    "予算配分を施術/商品/通院に最適化しました",
    "直近2週間の予定から無理のない予約候補を作成しました",
  ];
  const pick = ideas[Math.floor(Math.random() * ideas.length)];
  return `【AIプラン提案（モック）]\n${pick}\n\n要件: ${prompt.slice(0, 60)}…`;
}

const tokens = { radius: "rounded-2xl", pad: "p-4 md:p-6", gap: "gap-4 md:gap-6" };
const formatJPY = (n) => new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(n);

export default function MyPage() {
  const [isPlanWizardOpen, setPlanWizardOpen] = useState(false);
  const [lastPlan, setLastPlan] = useState(null);
  const [isLastPlanOpen, setLastPlanOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const handlePlanGenerated = (planText) => {
    setLastPlan(planText);
    setPlanWizardOpen(false);
    setToast("新しい美容プランが生成されました！");
    setTimeout(() => setLastPlanOpen(true), 300);
  };

  return (
    <>
      <BeautyLogSection />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-6 mt-4">
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

      <div className="px-4 md:px-6">
        <PlanSection 
          onOpenWizard={() => setPlanWizardOpen(true)}
          onOpenLastPlan={() => {
            if (lastPlan) {
              setLastPlanOpen(true);
            } else {
              setToast("まだプランがありません。");
            }
          }}
        />
        <TimelineSection onToast={setToast} />
        <RecommendSection />
      </div>

      <AnimatePresence>
        {isPlanWizardOpen && <PlanWizard onClose={() => setPlanWizardOpen(false)} onGenerated={handlePlanGenerated} />}
      </AnimatePresence>
      
      <AnimatePresence>
        {isLastPlanOpen && (
          <Modal onClose={() => setLastPlanOpen(false)}>
            <div className={`${tokens.pad} ${tokens.radius}`}>
              <div className="text-lg font-semibold">AIプラン（最新）</div>
              <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-neutral-50 p-3 text-sm font-sans leading-relaxed">
                {lastPlan || "まだプランがありません。"}
              </pre>
              <div className="mt-4 flex justify-end">
                <button className="rounded-full bg-warm-gray px-4 py-2 text-white" onClick={() => setLastPlanOpen(false)}>
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
            className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 rounded-full bg-warm-gray px-5 py-2 text-white shadow-lg text-sm"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BeautyLogSection() {
  return (
    <div className="px-4 md:px-6">
      <div className="rounded-2xl border-2 border-coral-pink/50 bg-white p-5 text-center shadow-sm">
        <h2 className="text-lg font-bold text-warm-gray tracking-tight">今日の美容ログをつけよう</h2>
        <p className="text-sm text-warm-gray-500 mt-1">日々の記録が、未来のあなたを美しくする</p>
        <Link to="/log" className="mt-4 inline-block bg-coral-pink text-white font-semibold rounded-full px-8 py-2.5 shadow hover:opacity-90 transition-opacity">
          美容ログを記録する
        </Link>
      </div>
    </div>
  );
}

function PlanSection({ onOpenWizard, onOpenLastPlan }) {
  return (
    <section className={`mt-4 ${tokens.radius} border border-yellow-200 bg-white ${tokens.pad} shadow-sm`}>
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold tracking-tight">AIプラン作成</h3>
        <div className="flex gap-2">
          <button onClick={onOpenWizard} className="rounded-full bg-coral-pink px-4 py-2 text-white font-semibold">作成</button>
          <button onClick={onOpenLastPlan} className="rounded-full border border-yellow-200 bg-white px-4 py-2">前回プラン</button>
        </div>
      </div>
      <p className="mt-2 text-sm text-warm-gray-500">あなたの目標や画像（任意）をもとに、最適な美容プランをAIが生成します。</p>
    </section>
  );
}

function PlanWizard({ onClose, onGenerated }) {
  const [goal, setGoal] = useState("半年後の挙式でベストコンディション");
  const [budget, setBudget] = useState(50000);
  const [categories, setCategories] = useState({ hair: true, esthe: true });
  const [goalImage, setGoalImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [goalPreview, setGoalPreview] = useState("");
  const [currentPreview, setCurrentPreview] = useState("");
  const fileRefGoal = useRef(null);
  const fileRefCurrent = useRef(null);
  const [loading, setLoading] = useState(false);

  const onFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'goal') {
        setGoalImage(file);
        setGoalPreview(reader.result);
      } else {
        setCurrentImage(file);
        setCurrentPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const generate = async () => {
    setLoading(true);
    const text = await fakeAiRespond(`目標: ${goal}, 予算: ${budget}円`);
    setLoading(false);
    onGenerated(text);
  };

  return (
    <Modal onClose={onClose}>
      <div className={`${tokens.pad} ${tokens.radius} max-h-[90vh] overflow-y-auto`}>
        <h2 className="text-lg font-semibold text-warm-gray">AIプラン作成</h2>
        <div className="mt-6 grid gap-y-6 gap-x-4 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <label className="block">
              <span className="text-sm font-medium text-warm-gray-500">目標（テキスト）</span>
              <input type="text" value={goal} onChange={e => setGoal(e.target.value)} className="mt-1 block w-full rounded-lg border-yellow-200 shadow-sm focus:border-coral-pink focus:ring focus:ring-coral-pink focus:ring-opacity-50" />
            </label>
            <div>
              <span className="text-sm font-medium text-warm-gray-500">カテゴリ</span>
              <div className="mt-2 flex flex-wrap gap-3">
                {["ヘアサロン", "ネイル・まつげサロン", "リラクサロン", "エステサロン", "美容クリニック"].map(cat => (
                  <label key={cat} className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" onChange={e => setCategories(p => ({ ...p, [cat]: e.target.checked }))} className="rounded border-yellow-200 text-coral-pink shadow-sm focus:border-coral-pink focus:ring focus:ring-offset-0 focus:ring-coral-pink focus:ring-opacity-50" />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-6">
            <label className="block">
              <span className="text-sm font-medium text-warm-gray-500">月あたり予算</span>
              <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} className="mt-1 block w-full rounded-lg border-yellow-200 shadow-sm focus:border-coral-pink focus:ring focus:ring-coral-pink focus:ring-opacity-50" />
            </label>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-warm-gray-500">なりたい理想像（任意）</span>
              {goalPreview ? <img src={goalPreview} alt="Preview" className="w-10 h-10 rounded-lg object-cover" /> : <span className="text-sm text-warm-gray-500">未選択</span>}
              <button onClick={() => fileRefGoal.current.click()} className="text-sm font-semibold text-coral-pink hover:underline">画像を選択</button>
              <input type="file" ref={fileRefGoal} onChange={e => onFileChange(e, 'goal')} className="hidden" accept="image/*" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-warm-gray-500">いまの私（任意）</span>
              {currentPreview ? <img src={currentPreview} alt="Preview" className="w-10 h-10 rounded-lg object-cover" /> : <span className="text-sm text-warm-gray-500">未選択</span>}
              <button onClick={() => fileRefCurrent.current.click()} className="text-sm font-semibold text-coral-pink hover:underline">画像を選択</button>
              <input type="file" ref={fileRefCurrent} onChange={e => onFileChange(e, 'current')} className="hidden" accept="image/*" />
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
            <Disclosure>
              <Disclosure.Button className="w-full text-left text-sm font-medium text-warm-gray-500">▼ 撮影のコツ</Disclosure.Button>
              <Disclosure.Panel className="mt-2 text-sm text-warm-gray-500 bg-cream-yellow p-3 rounded-lg">
                <ul className="list-disc list-inside space-y-1">
                  <li>明るい場所で正面から。可能なら自然光で</li>
                  <li>メイクやヘアセットは控えめに（状態が分かるように）</li>
                  <li>髪は顔が隠れないようにまとめるのがおすすめです</li>
                </ul>
              </Disclosure.Panel>
            </Disclosure>
            <Disclosure>
                <Disclosure.Button className="w-full text-left text-sm font-medium text-warm-gray-500">▼ プライバシーとデータの扱い</Disclosure.Button>
                <Disclosure.Panel className="mt-2 text-sm text-warm-gray-500 bg-cream-yellow p-3 rounded-lg">
                    画像の選択は任意です。アップロードされた画像はプラン生成にのみ利用され、サーバーには保存されません。
                </Disclosure.Panel>
            </Disclosure>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-full border border-yellow-200 bg-white px-4 py-2 text-sm">キャンセル</button>
          <button onClick={generate} disabled={loading} className="rounded-full bg-warm-gray px-4 py-2 text-white font-semibold text-sm disabled:bg-gray-300">
            {loading ? "生成中…" : "この内容でプランを生成"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
// Disclosure component helper to avoid external libraries for this mockup
const Disclosure = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const content = React.Children.toArray(children);
    const button = content.find(child => child.type === Disclosure.Button);
    const panel = content.find(child => child.type === Disclosure.Panel);
    return (
        <div>
            {React.cloneElement(button, { onClick: () => setIsOpen(!isOpen) })}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        {panel}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
Disclosure.Button = ({ children, onClick }) => <button onClick={onClick}>{children}</button>;
Disclosure.Panel = ({ children }) => <div>{children}</div>;


function TimelineSection({ onToast }) {
  const timelineItems = [
    { id: 1, date: "2025-09-10", title: "カット & 透明感カラー", store: "表参道 A-Salon", reason: "あなたの髪質と「半年後の挙式」という目標から、色持ちとツヤ感を重視した施術を提案します。" },
    { id: 2, date: "2025-09-24", title: "肌質改善フェイシャル", store: "新宿 Esthe-B", reason: "現在の肌状態から、挙式に向けて肌の基礎体力を上げるための集中ケアです。" },
  ];
  return (
    <section className={`mt-4 ${tokens.radius} border border-yellow-200 bg-white ${tokens.pad} shadow-sm`}>
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold tracking-tight">プランのタイムライン</h3>
        <button onClick={() => onToast("一括予約（モック）が完了しました")} className="rounded-full bg-coral-pink px-4 py-2 text-white font-semibold text-sm">一括予約</button>
      </div>
      <div className="mt-4 space-y-3">
        {timelineItems.map(item => (
          <Link to={`/salon/${item.id}`} key={item.id} className="block bg-white p-4 rounded-lg border border-yellow-200 hover:border-coral-pink transition-colors">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm font-semibold text-coral-pink">{item.date}</p>
                    <h4 className="font-bold text-warm-gray mt-1">{item.title}</h4>
                    <p className="text-xs text-warm-gray-500">{item.store}</p>
                </div>
                <span className="text-warm-gray-500">›</span>
            </div>
            <p className="text-xs text-warm-gray-500 mt-2 pt-2 border-t border-dashed border-yellow-200">{item.reason}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RecommendSection() {
  const products = [
    { id: 1, name: "集中ケアヘアマスク", price: 2480, personalized: true, reason: "カラーの色持ちを良くし、ツヤを維持します。", basis: "表参道 A-Salonでの「透明感カラー」施術記録より" },
    { id: 2, name: "高保湿ナイトセラム", price: 3980, personalized: true, reason: "日中のダメージをケアし、肌のバリア機能を高めます。", basis: "新宿 Esthe-Bでの肌質カウンセリングより" },
    { id: 3, name: "デイリーUVプロテクター", price: 1980, personalized: false, reason: "紫外線から肌と髪を守る、プラン共通のおすすめです。", basis: "" },
  ];
  return (
    <section className={`mt-4 ${tokens.radius} border border-yellow-200 bg-white ${tokens.pad} shadow-sm`}>
      <h3 className="text-base md:text-lg font-semibold tracking-tight">プラン実現をサポートするおすすめ商品</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(p => (
          <article key={p.id} className={`border ${p.personalized ? 'border-coral-pink/50' : 'border-yellow-200'} ${tokens.radius} p-4 bg-white flex flex-col`}>
            {p.personalized && <span className="rounded-full bg-coral-pink text-white text-xs px-2 py-0.5 self-start font-semibold">あなた向け</span>}
            <h4 className="font-bold mt-2 text-warm-gray">{p.name}</h4>
            <p className="text-sm text-warm-gray-500">{formatJPY(p.price)}</p>
            <p className="text-xs text-warm-gray-500 mt-2 flex-grow">
                {p.reason}
                {p.personalized && <span className="block mt-1 text-coral-pink/80">{p.basis}</span>}
            </p>
            <div className="mt-3 flex justify-end">
              <a href="#" onClick={e => e.preventDefault()} className="rounded-full bg-warm-gray px-4 py-2 text-white inline-flex items-center text-sm font-semibold">購入ページ</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Modal({ children, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

