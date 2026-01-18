import React from "react";
import Header from "@/Components/Header";
import SideBar from "@/Components/SideBar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div id="main-content" className="flex-1 overflow-y-auto bg-white">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default layout;
