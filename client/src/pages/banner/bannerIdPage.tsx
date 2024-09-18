import { useMemo, useState } from "react";
import AlertModal from "../../components/modals/alert-modal";
import { Page } from "../../components/ui/page";
import Heading from "../../components/ui/heading";
import { Button } from "../../components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import BannerForm from "../../components/forms/banner-form";
import { useFetchProductsQuery } from "../../services/product";
import toast from "react-hot-toast";
import { useDeleteBannerMutation, useFetchAllBannersQuery } from "../../services/banner";

export default function BannerIDPage() {
  const [open, setOpen] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const {data: banners} = useFetchAllBannersQuery(params.storeId as string)
  const data = useMemo(() => banners?.filter(banner => banner.id === params.bannerId), [banners,params.bannerId])
  
  const title = data ? "Edit banner" : "Create banner";
  const description = data ? "Edit a banner" : "Add a new banner";
  const toastMessage = data ? "Banner updated" : "Banner created"
  const action = data ? "Save changes" : "Create";

  const { data: products } = useFetchProductsQuery(params.storeId as string);

  const [deleteBanner, { isLoading }] = useDeleteBannerMutation();

  const handleDelete = async () => {
    try {
      await deleteBanner({
        storeId: params.storeId as string,
        bannerId: params.bannerId as string,
      });
      toast.success("Banner deleted")
      navigate(`/${params.storeId}/banner`)
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setOpen(false)
    }
  };

  return (
    <Page>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading
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
      <BannerForm
        data={data?.[0]}
        storeId={params.storeId as string}
        toastMessage={toastMessage}
        action={action}
        products={products}
      />
    </Page>
  );
}
