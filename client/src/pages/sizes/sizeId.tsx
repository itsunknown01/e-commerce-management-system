import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteSizeMutation, useFetchAllSizesQuery } from "../../services/sizes";
import toast from "react-hot-toast";
import { Page } from "../../components/ui/page";
import AlertModal from "../../components/modals/alert-modal";
import Heading from "../../components/ui/heading";
import { Button } from "../../components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import SizeForm from "../../components/forms/size-form";

export default function SizeIdPage() {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const { data: sizes } = useFetchAllSizesQuery(
    params.storeId as string
  );
  const data = useMemo(
    () =>
      sizes?.filter((size) => size.id === params.sizeId),
    [params.sizeId, sizes]
  );

  const title = data ? "Edit size" : "Create size";
  const description = data ? "Edit a size" : "Add a new size";
  const toastMessage = data ? "Size updated" : "Size created";
  const action = data ? "Save changes" : "Create";

  const [deleteSize, { isLoading }] = useDeleteSizeMutation();

  const handleDelete = async () => {
    try {
      await deleteSize({
        storeId: params.storeId as string,
        sizeId: params.sizeId as string,
      });
      toast.success("Size deleted");
      navigate(`/${params.storeId}/size`);
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
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <SizeForm
        data={data}
        storeId={params.storeId as string}
        action={action}
        toastMessage={toastMessage}
      />
    </Page>
  );
}
