import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { colorSchema } from "../../schemas/store";
import {
  useCreateColorMutation,
  useUpdateColorMutation,
} from "../../services/color";
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

interface ColorFormProps {
  data: any;
  storeId: string;
  action: string;
  toastMessage: string;
}

const ColorForm = ({ data, storeId, action, toastMessage }: ColorFormProps) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof colorSchema>>({
    resolver: zodResolver(colorSchema),
    defaultValues: data || {
      name: "",
      value: "",
    },
  });

  const [createColor, { isLoading: createLoading }] = useCreateColorMutation();

  const [updateColor, { isLoading: updateLoading }] = useUpdateColorMutation();

  const Submit = async (values: z.infer<typeof colorSchema>) => {
    try {
      if (data) {
        await updateColor({ storeId, values, colorId: data.id });
      } else {
        await createColor({ storeId, values });
      }
      navigate(`/${storeId}/color`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(Submit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="max-w-md">
              <FormLabel>Color Name</FormLabel>
              <FormControl>
                <Input
                  disabled={createLoading || updateLoading}
                  placeholder="Color Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:grid md:grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color Value</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-x-4">
                    <Input
                      disabled={createLoading || updateLoading}
                      placeholder="Color value"
                      {...field}
                    />
                    <div
                      className="border p-4 rounded-full"
                      style={{ backgroundColor: field.value }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={createLoading || updateLoading}
          className="ml-auto"
          type="submit"
        >
          {action}
        </Button>
      </form>
    </Form>
  );
};

export default ColorForm;
