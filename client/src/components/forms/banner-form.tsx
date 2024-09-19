import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { bannerSchema, BannerType } from "../../schemas/store";
import { ProductType } from "../../types/store";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate } from "react-router-dom";
import {
  useCreateBannerMutation,
  useUpdateBannerMutation,
} from "../../services/banner";
import toast from "react-hot-toast";

interface BannerFormProps {
  data: any;
  storeId: string;
  action: string;
  toastMessage: string;
  products: ProductType[] | undefined;
}

const BannerForm = ({
  data,
  storeId,
  action,
  products,
  toastMessage,
}: BannerFormProps) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof bannerSchema>>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      productId: data ? data.productId : "",
      type: data ? data.type : BannerType.SMALL,
    },
  });

  const [createBanner, { isLoading: createLoading }] =
    useCreateBannerMutation();

  const [updateBanner, { isLoading: updateLoading }] =
    useUpdateBannerMutation();

  const Submit = async (values: z.infer<typeof bannerSchema>) => {
    try {
      if (data) {
        await updateBanner({ storeId, values, bannerId: data.id });
      } else {
        await createBanner({ storeId, values });
      }
      navigate(`/${storeId}/banner`);
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
          name="productId"
          render={({ field }) => (
            <FormItem className="max-w-md">
              <FormLabel>Banner Product</FormLabel>
              <Select
                disabled={createLoading || updateLoading}
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select banner product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products?.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </FormControl>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:grid md:grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner Type</FormLabel>
                <Select
                  disabled={createLoading || updateLoading}
                  value={field.value}
                  onValueChange={(e) => field.onChange(e)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Banner Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(BannerType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </FormControl>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          // disabled={loading}
          className="ml-auto"
          type="submit"
        >
          {action}
        </Button>
      </form>
    </Form>
  );
};

export default BannerForm;