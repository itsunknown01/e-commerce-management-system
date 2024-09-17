import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as z from "zod";

import { useLoginMutation } from "../../services/auth";
import { LoginSchema } from "../../schemas";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const { accessToken: token, userInfo } = await login(values).unwrap();
      navigate(from, { replace: true });
      dispatch(setCredentials({ token, userInfo }));
    } catch (error) {
      console.log(error);
    }
    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(loginSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="w-full bg-[#4880FF] hover:bg-[#4880FF]"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
