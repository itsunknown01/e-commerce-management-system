import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export interface ColorColumn {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => <div className="text-left">{row.index + 1}</div>,
  },
  { accessorKey: "name", header: "Color Name" },
  {
    accessorKey: "value",
    header: "Color Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        />
      </div>
    ),
  },
  { accessorKey: "createdAt", header: "Created At" },
  { header: "Action", cell: ({ row }) => <CellAction data={row.original} /> },
];
