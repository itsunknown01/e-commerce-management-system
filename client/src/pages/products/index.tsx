import { format } from "date-fns";
import { useParams } from "react-router-dom";

import DataTable from "../../components/ui/data-table";
import Heading from "../../components/ui/heading";
import { Page, PageHeader } from "../../components/ui/page";
import { Separator } from "../../components/ui/separator";
import { columns, ProductColumn } from "./columns";
import { useFetchProductsQuery } from "../../services/product";
import { ScrollArea } from "../../components/ui/scroll-area";
import ApiList from "../../components/api/api-list";

export default function ProductsPage() {
  const params = useParams();

  const { data: products = [], isLoading } = useFetchProductsQuery(
    params.storeId as string
  );

  const formattedData: ProductColumn[] = products?.map((product) => ({
    id: product.id,
    title: product.title,
    brand: product.brand,
    category: product.categories.name,
    discountPercentage: product.discountPercentage,
    images: product.images,
    price: product.price,
    rating: product.rating,
    quantity: product.quantity,
    isFamous: product.IsFamous,
    isFeatured: product.IsFeatured,
    isSpecial: product.IsSpecial,
    createdAt: format(product.createdAt, "MMMM dd, yyyy"),
    updatedAt: format(product.updatedAt, "MMMM dd, yyyy"),
  }));

  return (
    <Page className="h-screen">
      <PageHeader
        heading="Products"
        description="Manage products for your store"
        buttonLink={`/${params.storeId}/products/new`}
      />

      <Separator className="bg-zinc-300" />
      <ScrollArea className="h-[calc(100vh-200px)]">
      <DataTable
        data={formattedData}
        columns={columns}
        searchkey="title"
        loading={isLoading}
      />
      <Heading
        className="items-start gap-y-2"
        title="APIs"
        description="API calls for Products"
      />
      <Separator className="my-6" />
      <ApiList entityName="products" entityIdName="" />
      </ScrollArea>
    </Page>
  );
}
