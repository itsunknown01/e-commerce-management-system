import { ColumnDef } from "@tanstack/react-table";

export interface CategoryColumn {
  id: string;
  name: string;
  createdAt: string;
}

export const columns: ColumnDef<CategoryColumn>[] = [
  { accessorKey: "name", header: "Category" },
  { accessorKey: "createdAt", header: "Date" },
];
