import { useNavigate, useParams } from "react-router-dom";
import { Page } from "../../components/ui/page";
import AlertModal from "../../components/modals/alert-modal";
import Heading from "../../components/ui/heading";
import { useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import BillboardForm from "../../components/forms/billboard-form";
import {
  useDeleteBillboardMutation,
  useFetchAllBillboardsQuery,
} from "../../services/billboard";
import toast from "react-hot-toast";

export default function BillboardIdPage() {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const { data: billboards } = useFetchAllBillboardsQuery(
    params.storeId as string
  );
  const data = useMemo(
    () =>
      billboards?.filter((billboard) => billboard.id === params.billboardId),
    [params.billboardId, billboards]
  );

  const title = data ? "Edit billboard" : "Create billboard";
  const description = data ? "Edit a billboard" : "Add a new billboard";
  const toastMessage = data ? "Billboard updated" : "Billboard created";
  const action = data ? "Save changes" : "Create";

  const [deleteBillboard, { isLoading }] = useDeleteBillboardMutation();

  const handleDelete = async () => {
    try {
      await deleteBillboard({
        storeId: params.storeId as string,
        billboardId: params.billboardId as string,
      });
      toast.success("Billboard deleted");
      navigate(`/${params.storeId}/billboard`);
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
      <BillboardForm
        data={data}
        storeId={params.storeId as string}
        action={action}
        toastMessage={toastMessage}
      />
    </Page>
  );
}
