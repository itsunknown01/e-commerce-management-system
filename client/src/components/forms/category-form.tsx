import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";

import { categorySchema } from "../../schemas/store";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../services/category";
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
import { useNavigate } from "react-router-dom";
import ImageUpload from "../feature/image-upload";

interface CategoryFormProps {
  data: any;
  storeId: string;
  action: string;
  categoryId: string;
  toastMessage: string;
}

const CategoryForm = ({
  data,
  storeId,
  action,
  categoryId,
  toastMessage,
}: CategoryFormProps) => {
  console.log(data);
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: data ? data?.name : "",
      imageUrl: data ? data?.image : "",
    },
  });

  const navigate = useNavigate();

  const [createCategory, { isLoading: createLoading }] =
    useCreateCategoryMutation();

  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();

  const isLoading = data ? updateLoading : createLoading;

  const Submit = async (values: z.infer<typeof categorySchema>) => {
    console.log(values);
    try {
      if (data) {
        await updateCategory({ category: values, storeId, categoryId });
      } else {
        await createCategory({ category: values, storeId });
      }
      navigate(`/${storeId}/category`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(Submit)} className="space-y-8 w-full">
        <div className="md:grid md:grid-row-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="max-w-md"
                    disabled={isLoading}
                    placeholder="Category label"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
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
        <Button disabled={isLoading} className="ml-auto" type="submit">
          {action}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
