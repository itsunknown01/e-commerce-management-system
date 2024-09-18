import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { Button } from "../../components/ui/button";
import { BannerColumn } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import AlertModal from "../../components/modals/alert-modal";
import { useDeleteBannerMutation } from "../../services/banner";

interface CellActionProps {
  data: BannerColumn;
}

export default function CellAction({ data }: CellActionProps) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const [deleteBanner, { isLoading }] = useDeleteBannerMutation();

  const handleConfirm = async () => {
    try {
      await deleteBanner({
        bannerId: data.id,
        storeId: params.storeId as string,
      }).unwrap();
      toast.success("Banner deleted");
    } catch (error) {
      toast.error(
        "Make sure you removerd all products using this banner first."
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
            onClick={() => navigate(`/${params.storeId}/banner/${data.id}`)}
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