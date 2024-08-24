import { CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import CardWrapper, { CardWrapperProps } from "./card-wrapper";
import Heading from "../ui/heading";
import { Link } from "react-router-dom";
// import SocialLogin from "../buttons/socialLogin";

interface AuthWrapperProps extends CardWrapperProps {
  heading: string;
  description: string;
  backButtonLink: string;
  backButtonTitle: string;
  showSocial: boolean;
}

const AuthWrapper = (props: AuthWrapperProps) => {
  return (
    <CardWrapper className={props.className}>
      <CardHeader>
        <Heading title={props.heading} description={props.description} />
      </CardHeader>
      <CardContent>{props.children}</CardContent>
      {props.showSocial && <CardFooter>{/* <SocialLogin /> */}</CardFooter>}
      <CardFooter>
        <Button variant="link" className="font-normal w-full text-[#4880FF]" size="sm" asChild>
          <Link to={props.backButtonLink}>{props.backButtonTitle}</Link>
        </Button>
      </CardFooter>
    </CardWrapper>
  );
};

export default AuthWrapper;
