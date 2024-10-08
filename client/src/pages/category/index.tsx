import { format } from "date-fns";
import { useParams } from "react-router-dom";

import ApiList from "../../components/api/api-list";
import DataTable from "../../components/ui/data-table";
import Heading from "../../components/ui/heading";
import { Page, PageHeader } from "../../components/ui/page";
import { Separator } from "../../components/ui/separator";
import { useFetchCategoriesQuery } from "../../services/category";
import { CategoryColumn, columns } from "./columns";
import { ScrollArea } from "../../components/ui/scroll-area";

export default function CategoryPage() {
  const params = useParams();

  const { data: categories = [], isLoading } = useFetchCategoriesQuery(
    params.storeId as string
  );

  const formattedData = categories.map((category) => ({
    id: category.id,
    name: category.name,
    createdAt: format(category.createdAt, "MMMM dd, yyyy"),
  }));

  return (
    <Page>
      <PageHeader
        heading="Categories"
        description="Manage categories for your store"
        buttonLink={`/${params.storeId}/category/new`}
      />
      <Separator className="bg-zinc-300" />
      <ScrollArea className="h-[calc(100vh-200px)]">
        <DataTable
          data={formattedData as CategoryColumn[]}
          columns={columns}
          searchkey="name"
          loading={isLoading}
        />
        <Heading
          className="items-start gap-y-2"
          title="APIs"
          description="API calls for Banners"
        />
        <Separator className="my-6" />
        <ApiList entityName="category" entityIdName="categoryId" />
      </ScrollArea>
    </Page>
  );
}
