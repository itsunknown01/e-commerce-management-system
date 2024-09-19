import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { billboardSchema } from "../../schemas/store";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  useCreateBillboardMutation,
  useUpdateBillboardMutation,
} from "../../services/billboard";
import { Input } from "../ui/input";
import ImageUpload from "../feature/image-upload";

interface BillboardFormProps {
  data: any;
  storeId: string;
  action: string;
  toastMessage: string;
}

const BillboardForm = ({
  data,
  storeId,
  action,
  toastMessage,
}: BillboardFormProps) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof billboardSchema>>({
    resolver: zodResolver(billboardSchema),
    defaultValues: {
      label: data ? data.label : "",
      imageUrl: data ? data.imageUrl : "",
    },
  });

  const [createBillboard, { isLoading: createLoading }] =
    useCreateBillboardMutation();

  const [updateBillboard, { isLoading: updateLoading }] =
    useUpdateBillboardMutation();

  const Submit = async (values: z.infer<typeof billboardSchema>) => {
    try {
      if (data) {
        await updateBillboard({ storeId, values, billboardId: data.id });
      } else {
        await createBillboard({ storeId, values });
      }
      navigate(`/${storeId}/billboard`);
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
          name="label"
          render={({ field }) => (
            <FormItem className="max-w-md">
              <FormLabel>Billboard Label</FormLabel>
              <FormControl>
                <Input
                  disabled={createLoading || updateLoading}
                  placeholder="Billboard label"
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onValueChange={field.onChange}
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

export default BillboardForm;