import { ColumnDef } from "@tanstack/react-table";
import { BannerType } from "../../schemas/store";
import CellAction from "./cell-action";

export interface BannerColumn {
  id: string;
  type: BannerType;
  productName: string;
  createdAt: string;
}

export const columns: ColumnDef<BannerColumn>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => {
      return <div className="text-left">{row.index + 1}</div>;
    },
  },
  { accessorKey: "type", header: "Banner Type" },
  { accessorKey: "productName", header: "Product Name" },
  { accessorKey: "createdAt", header: "Created At" },
  { header: "Action", cell: ({ row }) => <CellAction data={row.original} /> },
];
