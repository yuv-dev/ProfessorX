"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { FaUserAstronaut, FaSearch } from "react-icons/fa";

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchkeyword, setSearchKeyword] = useState("");
  const [searchClick, setSearchClick] = useState(false);
  const pathname = usePathname();
  const heading = pathname==="/dashboard" ? "Welcome, back" : pathname.slice(10).toUpperCase();

  const handleKeyDown = (event) => {
    // Check if the pressed key is "Enter"
    if (event.key === "Enter") {
      console.log(searchkeyword);
      alert(`Enter key pressed! Value:", ${searchkeyword}`);
      // handleSubmissionFunction(searchkeyword);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-blue-50 h-20 shadow-md text-black">
      {/* Top Row */}
      <h1 className="font-bold text-3xl font-sans">
        {heading}
      </h1>
      <div className="flex items-center gap-5">
        <div className="flex justify-between items-center align-middle gap-2">
          <input
            className={`${
              searchClick ? " px-4" : "w-0"
            } bg-white rounded-2xl  h-10`}
            type="text"
            placeholder={searchkeyword}
            value={searchkeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <FaSearch
            className="text-2xl text-blue-300"
            size={20}
            onClick={() => setSearchClick((p) => !p)}
          />
        </div>

        {/* User Info & Logout */}
        {user ? (
          <div className="flex items-center font-semibold text-2xl gap-2">
            <FaUserAstronaut className="text-3xl" />

            <span className="hidden sm:inline font-medium">{user.name}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="font-bold hidden sm:block">Guest</span>
            <button
              onClick={() => router.push("/")}
              className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
