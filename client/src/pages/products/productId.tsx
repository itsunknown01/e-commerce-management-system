import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash } from "lucide-react";

import ProductForm from "../../components/forms/product-form";
import AlertModal from "../../components/modals/alert-modal";
import { Page } from "../../components/ui/page";
import Heading from "../../components/ui/heading";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { ScrollArea } from "../../components/ui/scroll-area"; // Add this import
import {
  useDeleteProductMutation,
  useFetchProductsQuery,
} from "../../services/product";
import toast from "react-hot-toast";

export default function productIdPage() {
  const [open, setOpen] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { data: products } = useFetchProductsQuery(params.storeId as string);
  const data = useMemo(
    () => products?.filter((product) => product.id === params.productId),
    [products]
  );

  const title = data ? "Edit product" : "Create product";
  const description = data ? "Edit a product" : "Add a new product";
  const toastMessage = data ? "Product updated." : "Product created.";
  const action = data ? "Save changes" : "Create";

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const handleDelete = async () => {
    try {
      await deleteProduct({
        storeId: params.storeId as string,
        productId: params.productId as string,
      }).unwrap();
      navigate(`/${params.storeId}/products`)
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Page>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={isLoading}
      />
      <div className="flex items-center justify-between">
        <Heading
          className="!gap-y-2 items-start"
          title={title}
          description={description}
        />
        {data && (
          <Button
            //   disabled
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <div className="max-w-7xl mx-auto !mt-6">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <ProductForm
            data={data?.[0]}
            storeId={params.storeId as string}
            action={action}
            toastMessage={toastMessage}
          />
        </ScrollArea>
      </div>
    </Page>
  );
}
