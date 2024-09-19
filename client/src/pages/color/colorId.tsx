import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteColorMutation, useFetchAllColorsQuery } from "../../services/color";
import toast from "react-hot-toast";
import { Page } from "../../components/ui/page";
import AlertModal from "../../components/modals/alert-modal";
import Heading from "../../components/ui/heading";
import { Button } from "../../components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import ColorForm from "../../components/forms/color-form";

export default function ColorIdPage() {
    const [open, setOpen] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
  
    const { data: colors } = useFetchAllColorsQuery(
      params.storeId as string
    );
    const data = useMemo(
      () =>
        colors?.filter((color) => color.id === params.colorId),
      [params.colorId, colors]
    );
  
    const title = data ? "Edit color" : "Create color";
    const description = data ? "Edit a color" : "Add a new color";
    const toastMessage = data ? "Color updated" : "Color created";
    const action = data ? "Save changes" : "Create";
  
    const [deleteColor, { isLoading }] = useDeleteColorMutation();
  
    const handleDelete = async () => {
      try {
        await deleteColor({
          storeId: params.storeId as string,
          colorId: params.colorId as string,
        });
        toast.success("Color deleted");
        navigate(`/${params.storeId}/color`);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setOpen(false);
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
              disabled={isLoading}
              variant="destructive"
              color="sm"
              onClick={() => setOpen(true)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          )}
        </div>
        <Separator />
        <ColorForm
          data={data}
          storeId={params.storeId as string}
          action={action}
          toastMessage={toastMessage}
        />
      </Page>
    );
};
