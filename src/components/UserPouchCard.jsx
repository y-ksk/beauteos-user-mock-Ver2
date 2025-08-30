import React from 'react';
import { Link } from 'react-router-dom';

export default function UserPouchCard({ user }) {
  return (
    <Link to={`/pouch/${user.id}`} className="block p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="text-4xl flex-shrink-0">{user.icon}</div>
        <div>
          <h3 className="font-semibold text-lg text-warm-gray">{user.name}</h3>
          <p className="text-sm text-coral-pink mt-1 font-medium">{user.update}</p>
        </div>
      </div>
    </Link>
  );
}

