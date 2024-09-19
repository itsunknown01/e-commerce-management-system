import { useParams } from "react-router-dom";
import { Page, PageHeader } from "../../components/ui/page";
import { Separator } from "../../components/ui/separator";
import { ScrollArea } from "../../components/ui/scroll-area";
import DataTable from "../../components/ui/data-table";
import Heading from "../../components/ui/heading";
import ApiList from "../../components/api/api-list";
import { useMemo } from "react";
import { useFetchAllBillboardsQuery } from "../../services/billboard";
import { format } from "date-fns";
import { BillboardColumn, columns } from "./columns";

export default function BillboardPage() {
  const params = useParams();

  const { data: billboards = [], isLoading } = useFetchAllBillboardsQuery(
    params.storeId as string
  );

  const formattedData: BillboardColumn[] = useMemo(
    () =>
      billboards.map((billboard) => ({
        id: billboard.id,
        label: billboard.label,
        createdAt: format(billboard.createdAt, "MMMM dd, yyyy"),
      })),
    [billboards]
  );

  return (
    <Page className="h-screen">
      <PageHeader
        heading="Billboards"
        description="Manage billboards for your store"
        buttonLink={`/${params.storeId}/billboard/new`}
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
          description="API calls for Billboards"
        />
        <Separator className="my-6" />
        <ApiList entityName="billboard" entityIdName="" />
      </ScrollArea>
    </Page>
  );
}