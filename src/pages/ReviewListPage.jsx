import React from 'react';
import ReviewCard from '../components/ReviewCard.jsx'; // 拡張子を .jsx に

// モックデータを修正・拡充
const reviews = [
  { 
    id: 1, 
    user: { name: 'Aoi', age: '30代', skinType: '乾燥肌', concerns: ['#ハリ不足', '#くすみ'] }, 
    product: { name: 'ピュアセラム', brand: 'BeauteBrand', price: 3500 }, 
    rating: 5, 
    title: 'これなしでは生きられない！', 
    period: '6ヶ月', 
    source: '自分で選んだ', // 購入経路を追加
    beforeImg: 'https://placehold.co/300x200/FFFBEB/57534E?text=Before',
    afterImg: 'https://placehold.co/300x200/FFFBEB/57534E?text=After'
  },
  { 
    id: 2, 
    user: { name: 'Rina', age: '20代', skinType: '混合肌', concerns: ['#毛穴', '#ニキビ跡'] }, 
    product: { name: 'ナイトリペアクリーム', brand: 'Organic Co.', price: 4800 }, 
    rating: 4, 
    title: 'ベタつかないのに高保湿', 
    period: '2ヶ月',
    source: 'プレゼント', // 購入経路を追加
    beforeImg: 'https://placehold.co/300x200/FFFBEB/57534E?text=Before',
    afterImg: 'https://placehold.co/300x200/FFFBEB/57534E?text=After'
  },
];

export default function ReviewListPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">みんなの口コミ</h1>
      <p className="mt-2 text-warm-gray-500">ポーチ連携で、信頼できるリアルな声が見つかります。</p>

      <div className="mt-8 space-y-4">
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

