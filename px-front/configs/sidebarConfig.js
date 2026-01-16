// sidebarConfig.js
import {
  Home,
  BookOpen,
  GraduationCap,
  ClipboardList,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";

export const sidebarItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "My Courses", icon: BookOpen, path: "/dashboard/courses" },
  { label: "Lessons", icon: GraduationCap, path: "/dashboard/lessons" },
  { label: "Assignments", icon: ClipboardList, path: "/dashboard/assignments" },
  { label: "Progress", icon: BarChart, path: "/dashboard/progress" },
  { label: "Settings", icon: Settings, path: "/dashboard/settings" },
];

export const sidebarFooter = {
  label: "Logout",
  icon: LogOut,
};
