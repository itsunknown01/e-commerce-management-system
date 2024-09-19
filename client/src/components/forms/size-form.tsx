import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { sizeSchema } from "../../schemas/store";
import {
    useCreateSizeMutation,
    useUpdateSizeMutation,
} from "../../services/sizes";
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

interface SizeFormProps {
  data: any;
  storeId: string;
  action: string;
  toastMessage: string;
  }

const SizeForm = ({
  data,
  storeId,
  action,
  toastMessage,
}: SizeFormProps) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof sizeSchema>>({
    resolver: zodResolver(sizeSchema),
    defaultValues: data || {
      name: "",
      value: "",
    },
  });

  const [createSize, { isLoading: createLoading }] = useCreateSizeMutation();

  const [updateSize, { isLoading: updateLoading }] = useUpdateSizeMutation();

  const Submit = async (values: z.infer<typeof sizeSchema>) => {
    try {
      if (data) {
        await updateSize({ storeId, values, sizeId: data.id });
      } else {
        await createSize({ storeId, values });
      }
      navigate(`/${storeId}/size`);
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
              <FormLabel>Size Name</FormLabel>
              <FormControl>
                <Input
                  disabled={createLoading || updateLoading}
                  placeholder="Size Name"
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
                <FormLabel>Size Value</FormLabel>
                <FormControl>
                <Input
                  disabled={createLoading || updateLoading}
                  placeholder="Size Value"
                  {...field}
                />
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

export default SizeForm;
