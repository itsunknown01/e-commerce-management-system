import { useParams } from "react-router-dom";

import { format } from "date-fns";
import ApiList from "../../components/api/api-list";
import DataTable from "../../components/ui/data-table";
import Heading from "../../components/ui/heading";
import { Page, PageHeader } from "../../components/ui/page";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import { useFetchAllBannersQuery } from "../../services/banner";
import { BannerColumn, columns } from "./columns";
import { useMemo } from "react";

export default function BannerPage() {
  const params = useParams();

  const { data: banners = [], isLoading } = useFetchAllBannersQuery(
    params.storeId as string
  );

  const formattedData: BannerColumn[] = useMemo(
    () =>
      banners.map((banner) => ({
        id: banner.id,
        type: banner.type,
        productName: banner.product.title,
        createdAt: format(banner.createdAt, "MMMM dd, yyyy"),
      })),
    [banners]
  );

  return (
    <Page className="h-screen">
      <PageHeader
        heading="Banners"
        description="Manage banners for your store"
        buttonLink={`/${params.storeId}/banner/new`}
      />

      <Separator className="bg-zinc-300" />
      <ScrollArea className="h-[calc(100vh-200px)]">
        <DataTable
          data={formattedData}
          columns={columns}
          searchkey="productName"
          loading={isLoading}
        />
        <Heading
          className="items-start gap-y-2"
          title="APIs"
          description="API calls for Banners"
        />
        <Separator className="my-6" />
        <ApiList entityName="banner" entityIdName="" />
      </ScrollArea>
    </Page>
  );
}