import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

import AlertModal from "../../components/modals/alert-modal";
import { Page } from "../../components/ui/page";
import Heading from "../../components/ui/heading";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import CategoryForm from "../../components/forms/category-form";
import { useDeleteCategoryMutation } from "../../services/category";

const CategoryIdPage = () => {
  const [open, setOpen] = useState(false);
  let data;

  const title = data ? "Edit category" : "Create category";
  const description = data ? "Edit a category" : "Add a new category";
  const toastMessage = data ? "Category updated." : "Category created.";
  const action = data ? "Save changes" : "Create";

  const params = useParams();
  const navigate = useNavigate();

  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    try {
      await deleteCategory({
        categorId: params.categoryId,
        storeId: params.storeId,
      });
      navigate(`/${params.storeId}/categories`);
      toast.success(
        "Make sure you removed all the products using this category first."
      );
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
        <Button
          disabled={isLoading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
      <CategoryForm
        data={data}
        storeId={params.storeId as string}
        action={action}
        categoryId={params.categoryId as string}
        toastMessage={toastMessage}
      />
    </Page>
  );
};

export default CategoryIdPage;