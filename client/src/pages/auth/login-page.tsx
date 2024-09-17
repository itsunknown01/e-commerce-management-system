import { useEffect } from "react";
import LoginForm from "../../components/forms/login-form";
import AuthWrapper from "../../components/wrappers/auth -wrapper";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state: RootState) => state.reducer.auth);

  const isAuthenticated = Boolean(localStorage.getItem("authenticated"));
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated && token) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <div className="h-screen flex items-center justify-center bg-[#F5F6FA] dark:bg-[#1B2431]">
      <AuthWrapper
        heading="Content Management System"
        description="LOGIN"
        backButtonLink="/register"
        backButtonTitle="Don't have an account"
        showSocial
      >
        <LoginForm />
      </AuthWrapper>
    </div>
  );
};

export default LoginPage;
