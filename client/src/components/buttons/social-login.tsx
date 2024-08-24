import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const SocialLogin = () => {
  const handleClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full"
        size="lg"
        variant="outline"
        onClick={() => handleClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        className="w-full"
        size="lg"
        variant="outline"
        onClick={() => handleClick("github")}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SocialLogin;
