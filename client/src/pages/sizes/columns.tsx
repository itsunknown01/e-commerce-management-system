import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export interface SizeColumn {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => <div className="text-left">{row.index + 1}</div>,
  },
  { accessorKey: "name", header: "Size Name" },
  { accessorKey: "value", header: "Size Value" },
  { accessorKey: "createdAt", header: "Created At" },
  { header: "Action", cell: ({ row }) => <CellAction data={row.original} /> },
];
