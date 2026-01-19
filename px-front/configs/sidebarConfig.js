// sidebarConfig.js
import {
  Home,
  BookOpen,
  GraduationCap,
  ClipboardList,
  BarChart,
  Settings,
  LogOut,
  CircleFadingPlus
} from "lucide-react";

export const sidebarItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Create Course", icon: CircleFadingPlus, path: "/dashboard/create-course" },
  { label: "My Courses", icon: BookOpen, path: "/dashboard/courses" },
  { label: "Browse Course", icon: GraduationCap, path: "/dashboard/browse" },
  { label: "Assessments", icon: ClipboardList, path: "/dashboard/assesments" },
  { label: "Progress", icon: BarChart, path: "/dashboard/progress" },
  { label: "Settings", icon: Settings, path: "/dashboard/settings" },
];

export const sidebarFooter = {
  label: "Logout",
  icon: LogOut,
};
