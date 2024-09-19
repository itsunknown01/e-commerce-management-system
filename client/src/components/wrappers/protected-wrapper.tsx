import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useRefreshTokenMutation } from "../../services/auth";

export default function ProtectedWrapper() {
  const location = useLocation();
  const { token } = useSelector((state: RootState) => state.reducer.auth);

  const [refresh, { isLoading }] = useRefreshTokenMutation();
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
  }, [token, isAuthenticated, refresh]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
