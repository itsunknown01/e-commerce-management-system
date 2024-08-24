import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/sidebar";
import Header from "../layouts/header";

const LayoutWrapper = () => {
  return (
    <div className="w-full h-screen flex bg-[#F5F6FA] dark:bg-[#1B2431]">
      <Sidebar />
      <div className=" flex flex-col w-full">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutWrapper;
