import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import RegisterForm from "../../components/forms/register-form";
import AuthWrapper from "../../components/wrappers/auth -wrapper";
import { RootState } from "../../redux/store";

const RegisterPage = () => {
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
        description="REGISTER"
        backButtonLink="/login"
        backButtonTitle="Already have an account"
        showSocial
      >
        <RegisterForm />
      </AuthWrapper>
    </div>
  );
};

export default RegisterPage;