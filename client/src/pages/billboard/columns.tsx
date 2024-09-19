import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export interface BillboardColumn {
  id: string;
  label: string;
  createdAt: string;
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => {
      return <div className="text-left">{row.index + 1}</div>;
    },
  },
  { accessorKey: "label", header: "Billboard" },
  { accessorKey: "createdAt", header: "Created At" },
  { header: "Action", cell: ({ row }) => <CellAction data={row.original} /> },
];
