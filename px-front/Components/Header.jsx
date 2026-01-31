"use client";

import { useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { FaUserAstronaut } from "react-icons/fa";

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace("/");
  }, [user, loading, router]);

  const heading = useMemo(() => {
    if (!pathname) return "";

    if (pathname === "/dashboard") return "Welcome, back";
  }, [pathname]);

  if (loading || !user) return null;

  return (
    <header className="flex items-center justify-between px-4 py-2 h-20 text-black border-b-gray-700 bg-linear-120 from-blue-50 to-indigo-50  ">
      <h1 className="font-bold md:text-3xl text-md font-sans">{heading}</h1>

      <div className="flex items-center gap-5">
        <div className="flex items-center font-semibold text-2xl gap-2">
          <FaUserAstronaut className="text-3xl" />
          <span className="hidden sm:inline font-medium">{user.name}</span>
        </div>
      </div>
    </header>
  );
}
