import React, { useEffect, useState } from "react";
import NavBar from "./../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

// Layout adds background, scroll restoration, and dark mode class on root
export default function Layout() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 flex flex-col">
      <NavBar dark={dark} setDark={setDark} />
      <main className="flex-1 container animate-fadeIn">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
