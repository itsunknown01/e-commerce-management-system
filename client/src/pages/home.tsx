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
  const [checkedStores, setCheckedStores] = useState(false);

  const { userInfo } = useSelector((state: RootState) => state.reducer.auth);
  const {
    data: stores,
    isLoading,
    isSuccess,
  } = useFetchStoresQuery("allStores", {
    skip: !userInfo, // Skip the query if there's no userInfo
  });

  useEffect(() => {
    if (isSuccess && stores && userInfo && !checkedStores) {
      const userStores = stores.filter((store: StoreType) => store.userId === userInfo.id);
      
      if (userStores.length > 0) {
        navigate(`/${userStores[0].id}`);
      } else {
        dispatch(onOpen());
      }
      setCheckedStores(true);
    }
  }, [isSuccess, stores, userInfo, navigate, dispatch, checkedStores]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userInfo || checkedStores) {
    return null;
  }

  return <div>Checking stores...</div>;
};

export default Home;