import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { productSchema } from "../../schemas/store";
import { useFetchCategoriesQuery } from "../../services/category";
import { useCreateProductMutation, useUpdateProductMutation } from "../../services/product";
import ImageUpload from "../feature/image-upload";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface ProductFormProps {
  data: any;
  storeId: string;
  action: string;
  toastMessage: string
}

const ProductForm = ({ action, storeId, data,toastMessage }: ProductFormProps) => {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: data ? data.title : "",
      brand: data ? data.brand : "",
      description: data ? data.description : "",
      categoryId: data ? data.categoryId : "",
      discountPercentage: data ? `${data.discountPercentage}` : "0",
      images: data ? data.images : [],
      price: data ? `${data.price}` : "0",
      rating: data ? `${data.rating}` : "0",
      quantity: data ? `${data.quantity}` : "0",
      thumbnail: data ? data.thumbnail : "",
      isFamous: data ? data.IsFamous : false,
      isFeatured: data ? data.IsFeatured : false,
      isSpecial: data ? data.IsSpecial : false,
    },
  });

  const { data: categories = [] } =
    useFetchCategoriesQuery(storeId);

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [updateProduct, { isLoading: loading }] = useUpdateProductMutation();

  const Submit = async (values: z.infer<typeof productSchema>) => {
    try {
      if (data) {
        await updateProduct({ values, storeId, productId: data.id });
      } else {
        await createProduct({ values, storeId });
      }
      navigate(`/${storeId}/products`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(Submit)} className="space-y-8 mx-4">
        <div className="grid grid-cols-2 gap-10">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Product Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Product Brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Product Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </FormControl>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discountPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Discount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Product Discount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="col-span-2 justify-self-center w-full max-w-full">
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onValueChange={(urls) => {
                      field.onChange(urls);
                      if (urls.length > 0 && !form.getValues("thumbnail")) {
                        form.setValue("thumbnail", urls[0]);
                      }
                    }}
                    multiple
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Product Price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Rating</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Product Rating"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Quantity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Product Quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Thumbnail</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a thumbnail" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {form.watch("images")?.map((image, index) => (
                      <SelectItem key={index} value={image}>
                        Image {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="isFamous"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    defaultChecked={field.value}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Famous Product</FormLabel>
                  <FormDescription>
                    This product will be marked as famous if checked
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    defaultChecked={field.value}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured Product</FormLabel>
                  <FormDescription>
                    This product will be marked as featured if checked
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isSpecial"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    defaultChecked={field.value}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Special Product</FormLabel>
                  <FormDescription>
                    This product will be marked as special if checked
                  </FormDescription>
                </div>
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

export default ProductForm;
