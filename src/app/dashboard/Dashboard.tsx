"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MenuIcon from "@mui/icons-material/Menu";

export default function Dashboard({ activeTab, children }: any) {
  const [onMobile, setOnMobile] = useState(true);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setOnMobile(true);
    }
  }, []);

  return (
    <>
      <main className="flex min-h-screen sm:min-w-full">
        {/* {!onMobile && <Sidebar activeTab={activeTab} />} */}
        {toggleSidebar && (
          <Sidebar activeTab={activeTab} setToggleSidebar={setToggleSidebar} />
        )}
        <button
          onClick={() => setToggleSidebar(true)}
          className={
            `bg-gray-700 fixed w-16 h-16 left-4 top-20 z-50 rounded-full shadow text-white flex items-center justify-center` +
            ` ${toggleSidebar ? "hidden" : ""}`
          }
        >
          <MenuIcon fontSize="large" />
        </button>
        <div
          className={[
            "w-full bg-white sm:w-4/4 dashbord min-h-screen",
            `${toggleSidebar ? " sm:ml-64" : ""}`,
          ].join("")}
        >
          <div className="flex flex-col gap-6 p-2 pb-6 overflow-hidden">
            <div className={`${!toggleSidebar ? " ml-20" : ""}`}>
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
