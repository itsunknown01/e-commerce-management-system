import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginForm from "../../components/forms/login-form";
import AuthWrapper from "../../components/wrappers/auth -wrapper";
import { RootState } from "../../redux/store";

const LoginPage = () => {
  const navigate = useNavigate();
  
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

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
