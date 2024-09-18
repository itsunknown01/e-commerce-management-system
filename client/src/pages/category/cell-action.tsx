import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "../../components/ui/button";
import { CategoryColumn } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useNavigate, useParams } from "react-router-dom";
import AlertModal from "../../components/modals/alert-modal";
import { useState } from "react";
import { useDeleteCategoryMutation } from "../../services/category";
import toast from "react-hot-toast";

interface CellActionProps {
  data: CategoryColumn;
}

export default function CellAction({ data }: CellActionProps) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleConfirm = async () => {
    try {
      await deleteCategory({
        categoryId: data.id,
        storeId: params.storeId as string,
      }).unwrap();
      toast.success("Category deleted");
    } catch (error) {
      toast.error(
        "Make sure you removerd all products using this category first."
      );
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        loading={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate(`/${params.storeId}/category/${data.id}`)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
