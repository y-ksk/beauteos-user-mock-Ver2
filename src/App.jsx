import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Pages
import MyPage from "./pages/MyPage.jsx";
import PouchPage from "./pages/PouchPage.jsx";
import CosmeticListPage from "./pages/CosmeticListPage.jsx";
import AddCosmeticPage from "./pages/AddCosmeticPage.jsx";
import ReviewListPage from "./pages/ReviewListPage.jsx";
import SalonPage from "./pages/SalonPage.jsx";
import BeautyLogPage from "./pages/BeautyLogPage.jsx";

function Layout() {
  return (
    <div className="min-h-screen bg-cream-yellow text-warm-gray">
      <Header />
      <main className="mx-auto max-w-[1400px] px-3 md:px-6 pb-28 md:pb-10">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MyPage />} />
          <Route path="pouch" element={<PouchPage />} />
          <Route path="pouch/:pouchId" element={<CosmeticListPage />} />
          <Route path="add-cosmetic" element={<AddCosmeticPage />} />
          <Route path="reviews" element={<ReviewListPage />} />
          <Route path="salon/:salonId" element={<SalonPage />} />
          <Route path="beauty-log" element={<BeautyLogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-yellow-200 bg-cream-yellow/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-3 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warm-gray text-white font-bold">B</div>
          <a href="/" className="text-lg font-semibold tracking-tight text-warm-gray">BeauteOS</a>
        </div>
      </div>
    </header>
  );
}

