import { useParams } from "react-router-dom";
import { Page, PageHeader } from "../../components/ui/page";
import { Separator } from "../../components/ui/separator";
import { ScrollArea } from "../../components/ui/scroll-area";
import DataTable from "../../components/ui/data-table";
import Heading from "../../components/ui/heading";
import ApiList from "../../components/api/api-list";
import { columns, SizeColumn } from "./columns";
import { useMemo } from "react";
import { format } from "date-fns";
import { useFetchAllSizesQuery } from "../../services/sizes";

export default function SizePage () {
    const params = useParams();

  const { data: sizes = [], isLoading } = useFetchAllSizesQuery(
    params.storeId as string
  );

  const formattedData: SizeColumn[] = useMemo(
    () =>
      sizes.map((size) => ({
        id: size.id,
        name: size.name,
        value: size.value,
        createdAt: format(size.createdAt, "MMMM dd, yyyy"),
      })),
    [sizes]
  );

  return (
    <Page className="h-screen">
      <PageHeader
        heading="Sizes"
        description="Manage sizes for your store"
        buttonLink={`/${params.storeId}/sizes/new`}
      />

      <Separator className="bg-zinc-300" />
      <ScrollArea className="h-[calc(100vh-200px)]">
        <DataTable
          data={formattedData}
          columns={columns}
          searchkey="name"
          loading={isLoading}
        />
        <Heading
          className="items-start gap-y-2"
          title="APIs"
          description="API calls for Sizes"
        />
        <Separator className="my-6" />
        <ApiList entityName="sizes" entityIdName="" />
      </ScrollArea>
    </Page>
  );
}