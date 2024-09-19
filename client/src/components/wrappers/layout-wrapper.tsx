import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";

import { RootState } from "../../redux/store";
import Header from "../layouts/header";
import Sidebar from "../layouts/sidebar";
import { useLazyFetchStoresQuery } from "../../services/store";

const LayoutWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { storeId } = useParams();

  const [storeExists, setStoreExists] = useState<boolean | null>(null);

  const { token } = useSelector((state: RootState) => state.reducer.auth);
  const [getStores] = useLazyFetchStoresQuery();

  const isAuthenticated = JSON.parse(
    localStorage.getItem("authenticated") as string
  );

  useEffect(() => {
    const checkStore = async () => {
      if (storeId) {
        try {
          const { data: stores } = await getStores("");
          const store = stores?.find((item) => item.id === storeId);
          setStoreExists(!!store);
        } catch (error) {
          console.error("Error fetching store:", error);
          setStoreExists(false);
        }
      } else {
        setStoreExists(true); // Assume store exists if no storeId is provided
      }
    };

    checkStore();
  }, [storeId, getStores]);

  useEffect(() => {
    if (storeExists === false) {
      navigate("/");
    }
  }, [storeExists, navigate]);

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (storeExists === null) {
    return <div>Loading...</div>; // Or a proper loading component
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
