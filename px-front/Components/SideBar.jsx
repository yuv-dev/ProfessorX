"use client";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { X } from "lucide-react";
import { sidebarItems, sidebarFooter } from "@/configs/sidebarConfig";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
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
          fixed md:static top-0 left-0 z-50
          w-fit bg-white border-r
          transform transition-transform duration-300
         
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {/* Logo */}
          <Link href={"/dashboard"}>
            <span className="text-sm md:text-4xl font-bold text-black">
              Learner
              <span className="text-md md:text-5xl text-blue-600">X</span>
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
                setOpen(false);
              }}
              className={`
                flex items-center gap-3 px-4 py-2 rounded-lg
                transition
                ${
                  isActive(item.path)
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              <item.icon size={20} />
              <span className="text-sm hidden md:block font-medium">
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
                transition
                     text-red-600
                    hover:bg-red-100 
              `}
            onClick={sidebarFooter.label === "Logout" && logoutClick}
          >
            <sidebarFooter.icon size={20} />
            <span className="text-sm font-medium hidden md:block">
              {sidebarFooter.label}
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
}
