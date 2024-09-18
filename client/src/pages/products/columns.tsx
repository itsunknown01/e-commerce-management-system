import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export interface ProductColumn {
  id: string;
  title: string;
  brand: string;
  category: string;
  discountPercentage: number;
  price: number;
  rating: number;
  quantity: number;
  isFamous: boolean,
  isFeatured: boolean,
  isSpecial: boolean,
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => {
      return <div className="text-left">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Title"
  },
  {
    accessorKey: "brand",
    header: "Brand"
  },
  {
    accessorKey: "category",
    header: "Category"
  },
  {
    accessorKey: "discountPercentage",
    header: "Discount %"
  },
  {
    accessorKey: "price",
    header: "Price"
  },
  {
    accessorKey: "rating",
    header: "Rating"
  },
  {
    accessorKey: "quantity",
    header: "Quantity"
  },
  {
    accessorKey: "isFamous",
    header: "Famous"
  },
  {
    accessorKey: "isFeatured",
    header: "Featured"
  },
  {
    accessorKey: "isSpecial",
    header: "Special"
  },
  {
    accessorKey: "createdAt",
    header: "Created At"
  },
  {
    header: "Action",
    cell: ({row}) => <CellAction data={row.original} />
  }
];