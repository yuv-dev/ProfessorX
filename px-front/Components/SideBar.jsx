"use client";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { sidebarItems, sidebarFooter } from "@/configs/sidebarConfig";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";

export default function Sidebar() {
  const { logout } = useAuth();
  const [isMinimised, setisMinimised] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => pathname === path;

  const logoutClick = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      {/* Sidebar */}
      <aside
        className={` h-screen
          ${isMinimised ? "w-22" : "w-22 md:w-64"} bg-white border-r
          transform transition-all duration-300
         
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b h-20">
          {/* Logo */}
          <Link href={"/dashboard"}>
            <span
              className={`text-sm md:text-4xl font-bold text-black ${isMinimised ? "md:text-sm" : ""}`}
            >
              Learner
              <span
                className={`text-md md:text-5xl text-blue-600 ${isMinimised ? "md:text-sm" : ""}`}
              >
                X
              </span>
            </span>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex flex-col p-3 gap-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                router.push(item.path);
              }}
              className={`
                flex items-center gap-3 px-4 py-2 rounded-lg
                transition cursor-pointer
                ${
                  isActive(item.path)
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              <item.icon size={20} />
              <span
                className={`text-sm hidden md:block font-medium ${isMinimised ? "md:hidden" : ""}`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 p-3 border-t">
          <button
            className={`
                flex items-center gap-3 px-4 py-2 rounded-lg
                transition cursor-pointer
                     text-blue-600
                    hover:bg-blue-100 
              `}
            onClick={() => setisMinimised(!isMinimised)}
          >
            <FaAngleRight />
            <span
              className={`text-sm hidden md:block font-medium ${isMinimised ? "md:hidden" : ""}`}
            >
              Minimise
            </span>
          </button>
          <button
            className={`
                flex items-center gap-3 px-4 py-2 rounded-lg
                transition cursor-pointer
                     text-red-600
                    hover:bg-red-100 
              `}
            onClick={sidebarFooter.label === "Logout" && logoutClick}
          >
            <sidebarFooter.icon size={20} />
            <span
              className={`text-sm hidden md:block font-medium ${isMinimised ? "md:hidden" : ""}`}
            >
              {sidebarFooter.label}
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
}
