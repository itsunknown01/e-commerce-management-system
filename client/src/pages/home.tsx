import { useNavigate } from "react-router-dom";
import { useFetchStoresQuery } from "../services/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { onOpen } from "../redux/slices/modal";
import { StoreType } from "../types/store";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const { userInfo } = useSelector((state: RootState) => state.reducer.auth);
  const { isOpen } = useSelector((state: RootState) => state.reducer.modal);
  const isAuthenticated: boolean = JSON.parse(
    localStorage.getItem("authenticated") as string
  );
  const { data: stores, isLoading,isSuccess } = useFetchStoresQuery("allStores");

  const userId = userInfo?.id;
  const store = stores?.find((store: StoreType) => store.userId === userId);

  useEffect(() => {
    const checkStore = () => {
      if (isLoading) return;

      if (!userId && !isAuthenticated) {
        navigate("/login");
        return;
      }

      if (store) {
        navigate(`/${store?.id}`);
        return;
      } else if (!isOpen && isSuccess) {
        dispatch(onOpen());
      } else {
        setLoading(false);
      }
    };

    checkStore();
  }, [
    stores,
    isLoading,
    navigate,
    dispatch,
    store,
    isOpen,
    userId,
    isAuthenticated,
    isSuccess
  ]);

  let content;

  if (loading || isLoading) {
    content = <div>Loading...</div>;
  } else {
    content = null;
  }

  return content;
};

export default Home;
