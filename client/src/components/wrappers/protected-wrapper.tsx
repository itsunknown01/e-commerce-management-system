import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useRefreshTokenMutation } from "../../services/auth";

export default function ProtectedWrapper() {
  const { token } = useSelector((state: RootState) => state.reducer.auth);

  const [refresh, { isLoading }] =
    useRefreshTokenMutation();
  const isAuthenticated = JSON.parse(
    localStorage.getItem("authenticated") as string
  );

  useEffect(() => {
    const authenticate = async () => {
      try {
        await refresh(null);
      } catch (err) {
        console.log(err);
      }
    };

    if (!token && isAuthenticated) authenticate();
  }, []);

  return isLoading ? <p>Loading...</p> : <Outlet />;
}
