"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { FaUserAstronaut, FaSearch } from "react-icons/fa";

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [searchkeyword, setSearchKeyword] = useState("");
  const [searchClick, setSearchClick] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/");
  }, [user, loading, router]);

  const heading = useMemo(() => {
    if (!pathname) return "";

    if (pathname === "/dashboard") return "Welcome, back";
  }, [pathname]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      alert(`Enter key pressed! Value: ${searchkeyword}`); // Later will be deeloped into a full search function
    }
  };

  if (loading || !user) return null;

  return (
    <header className="flex items-center justify-between px-4 py-2 h-20 text-black">
      <h1 className="font-bold md:text-3xl text-md font-sans">{heading}</h1>

      <div className="flex items-center gap-5">
        <div className="flex justify-between items-center align-middle gap-2">
          <input
            className={`${
              searchClick ? "px-4 border-2" : "w-0"
            } border-black bg-blue-50 rounded-xl h-10 transition-all duration-200`}
            type="text"
            placeholder="Search..."
            value={searchkeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <FaSearch
            className="text-2xl text-blue-300 cursor-pointer"
            size={20}
            onClick={() => setSearchClick((p) => !p)}
          />
        </div>

        <div className="flex items-center font-semibold text-2xl gap-2">
          <FaUserAstronaut className="text-3xl" />
          <span className="hidden sm:inline font-medium">{user.name}</span>
        </div>
      </div>
    </header>
  );
}
