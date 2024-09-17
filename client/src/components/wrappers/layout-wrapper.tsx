import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../layouts/header";
import Sidebar from "../layouts/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const LayoutWrapper = () => {
  const location = useLocation();

  const { token } = useSelector(
    (state: RootState) => state.reducer.auth
  );

  const isAuthenticated = JSON.parse(localStorage.getItem('authenticated') as string);

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" state={{from: location }} replace />;
  }

  return (
    <div className="w-full h-screen flex bg-[#F5F6FA] dark:bg-[#1B2431] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutWrapper;
