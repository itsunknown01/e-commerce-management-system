import { useParams } from "react-router-dom";
import { useFetchAllColorsQuery } from "../../services/color";
import { useMemo } from "react";
import { ColorColumn, columns } from "./columns";
import { format } from "date-fns";
import { Page, PageHeader } from "../../components/ui/page";
import { Separator } from "../../components/ui/separator";
import { ScrollArea } from "../../components/ui/scroll-area";
import DataTable from "../../components/ui/data-table";
import Heading from "../../components/ui/heading";
import ApiList from "../../components/api/api-list";

export default function ColorPage() {
    const params = useParams();

  const { data: colors = [], isLoading } = useFetchAllColorsQuery(
    params.storeId as string
  );

  const formattedData: ColorColumn[] = useMemo(
    () =>
      colors.map((color) => ({
        id: color.id,
        name: color.name,
        value: color.value,
        createdAt: format(color.createdAt, "MMMM dd, yyyy"),
      })),
    [colors]
  );

  return (
    <Page className="h-screen">
      <PageHeader
        heading="Colors"
        description="Manage colors for your store"
        buttonLink={`/${params.storeId}/colors/new`}
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
          description="API calls for Colors"
        />
        <Separator className="my-6" />
        <ApiList entityName="colors" entityIdName="" />
      </ScrollArea>
    </Page>
  );
};
