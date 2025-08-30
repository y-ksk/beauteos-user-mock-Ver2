import React from 'react';

const formatJPY = (n) => new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(n);

const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.368-2.446a1 1 0 00-1.175 0l-3.368 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.25 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" /></svg>
    ))}
  </div>
);

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-5">
      {/* ユーザー情報 */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-coral-pink/20 rounded-full flex-shrink-0"></div>
          <div>
            <p className="font-semibold text-warm-gray">{review.user.name}</p>
            <p className="text-xs text-warm-gray-500">{review.user.age} / {review.user.skinType}</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {review.user.concerns.map(tag => (
                <span key={tag} className="text-xs bg-cream-yellow px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* 商品情報 */}
      <div className="mt-4 pl-14">
        <h4 className="font-bold text-lg text-warm-gray">{review.title}</h4>
        <div className="mt-2 p-3 bg-cream-yellow/60 rounded-lg">
          <p className="font-semibold text-sm">{review.product.name}</p>
          <p className="text-xs text-warm-gray-500">{review.product.brand} / {formatJPY(review.product.price)}</p>
        </div>
      </div>
      
      {/* Before/After 写真 */}
      <div className="mt-4 pl-14 grid grid-cols-2 gap-3">
        <div>
          <img src={review.beforeImg} alt="使用前" className="rounded-lg aspect-video object-cover"/>
          <p className="text-center text-xs mt-1 text-warm-gray-500">使用前</p>
        </div>
        <div>
          <img src={review.afterImg} alt="使用後" className="rounded-lg aspect-video object-cover"/>
          <p className="text-center text-xs mt-1 text-warm-gray-500">使用後</p>
        </div>
      </div>
      
      {/* ポーチ連携情報 */}
      <div className="mt-3 pl-14 flex items-center gap-2 text-xs font-medium">
        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">✓ ポーチ登録済み</span>
        <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">使用期間: {review.period}</span>
        {review.source === 'プレゼント' && (
          <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full">🎁 プレゼント</span>
        )}
      </div>
    </div>
  );
}

