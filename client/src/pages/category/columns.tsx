import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export interface CategoryColumn {
  id: string;
  name: string;
  createdAt: string;
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => {
      return <div className="text-left">{row.index + 1}</div>;
    },
  },
  { accessorKey: "name", header: "Category" },
  { accessorKey: "createdAt", header: "Date" },
  { header: "Action", cell: ({ row }) => <CellAction data={row.original} /> },
];
