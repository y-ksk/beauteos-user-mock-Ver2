import React from 'react';
import { Link } from 'react-router-dom';

export default function PouchCard({ pouch }) {
  return (
    <Link to={`/pouch/${pouch.id}`} className="block p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <div className="text-4xl">{pouch.icon}</div>
      <h3 className="font-semibold text-lg mt-3 text-warm-gray">{pouch.name}</h3>
      <p className="text-sm text-warm-gray-500 mt-1">{pouch.itemCount}個のアイテム</p>
    </Link>
  );
}

