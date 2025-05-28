"use client";

import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenubarOpen, setIsMenuBarOpen] = useState<boolean>(false);
  const dashboardLayoutStyles = {
    open: {
      menu: "flex-1/30",
      dashboard: "flex-29/30",
    },
    close: {
      menu: "flex-2/30",
      dashboard: "flex-26/30",
    },
  };

  const MenuButtonStyles =
    "transition-width duration-600 ease-in-out hover:bg-[#ececec] hover:text-black hover:w-full";

  function handleButtonView() {
    setIsMenuBarOpen((prev) => {
      console.log(prev);
      return prev;
    });
  }

  return (
    <div className="flex flex-row h-screen w-screen bg-black">
      <div
        className={`${
          isMenubarOpen
            ? dashboardLayoutStyles.open.menu
            : dashboardLayoutStyles.close.menu
        } py-10 px-1 transition-width ease-in-out flex flex-col items-center gap-10`}
      >
        <button className={MenuButtonStyles} onMouseEnter={handleButtonView}>
          {!isMenubarOpen ? "Menu" : "M"}
        </button>
        <button className={MenuButtonStyles} onMouseEnter={handleButtonView}>
          {!isMenubarOpen ? "History" : "H"}
        </button>
        <button className={MenuButtonStyles} onMouseEnter={handleButtonView}>
          {!isMenubarOpen ? "Setting" : "S"}
        </button>
        <button className={MenuButtonStyles} onMouseEnter={handleButtonView}>
          {!isMenubarOpen ? "Profile" : "P"}
        </button>

        <button
          onClick={() => setIsMenuBarOpen((prev) => !prev)}
          className="cursor-pointer "
        >
          Menu
        </button>
      </div>
      <div
        className={`${
          isMenubarOpen
            ? dashboardLayoutStyles.open.dashboard
            : dashboardLayoutStyles.close.dashboard
        } bg-red-200 m-5 rounded-2xl transition-width duration-500 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
}
