"use client";

import { DataTable } from "@/components/reusable/data-table";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { FilterIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Category = {
  id: string | number;
  status: number;
  categoryName: string;
  description: string;
  content: number;
};

const fakeCategories: Category[] = [
  {
    id: 1,
    categoryName: "Action",
    description: "Movies with a lot of action and stunts",
    content: 248,
    status: 0,
  },
  {
    id: 2,
    categoryName: "Comedy",
    description: "Funny movies to make you laugh",
    content: 176,
    status: 0,
  },
  {
    id: 3,
    categoryName: "Drama",
    description: "Movies with a lot of action and stunts",
    content: 215,
    status: 1,
  },
    {
    id: 1,
    categoryName: "Action",
    description: "Movies with a lot of action and stunts",
    content: 248,
    status: 0,
  },
  {
    id: 2,
    categoryName: "Comedy",
    description: "Funny movies to make you laugh",
    content: 176,
    status: 0,
  },
  {
    id: 3,
    categoryName: "Drama",
    description: "Movies with a lot of action and stunts",
    content: 215,
    status: 1,
  },
    {
    id: 1,
    categoryName: "Action",
    description: "Movies with a lot of action and stunts",
    content: 248,
    status: 0,
  },
  {
    id: 2,
    categoryName: "Comedy",
    description: "Funny movies to make you laugh",
    content: 176,
    status: 0,
  },
  {
    id: 3,
    categoryName: "Drama",
    description: "Movies with a lot of action and stunts",
    content: 215,
    status: 1,
  },
    {
    id: 1,
    categoryName: "Action",
    description: "Movies with a lot of action and stunts",
    content: 248,
    status: 0,
  },
  {
    id: 2,
    categoryName: "Comedy",
    description: "Funny movies to make you laugh",
    content: 176,
    status: 0,
  },
  {
    id: 3,
    categoryName: "Drama",
    description: "Movies with a lot of action and stunts",
    content: 215,
    status: 1,
  },
  
];

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "categoryName", // <-- এখানে "categoryName" ঠিক আছে
    header: "Category Name",
    cell: ({ row }) => <span>{row.original.categoryName}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <span>{row.original.description}</span>,
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => <span>{row.original.content}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={
          row.original.status === 1
            ? "text-green-500 font-semibold"
            : "text-gray-400"
        }
      >
        {row.original.status === 1 ? "Active" : "Deactive"}
      </span>
    ),
  },
  // যদি future এ Action যুক্ত করতে চাও তাহলে এখানে সেটাপ করো
  {
    accessorKey: "action",
    header: "Action",
    cell: () => <></>, // খালি রাখা হয়েছে
  },
];

export default function CategoriesTable() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<number | string | "">("");

  const total = fakeCategories.length;

  // Filter + pagination applied data
  const filteredData = useMemo(() => {
    return fakeCategories
      .filter((item) => {
        const matchesSearch = item.categoryName
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesStatus =
          filterStatus === "" ? true : item.status === filterStatus;
        return matchesSearch && matchesStatus;
      })
      .slice((page - 1) * pageSize, page * pageSize);
  }, [search, filterStatus, page, pageSize]);

  const isLoading = false;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-white mb-4">Categories</h2>
      </div>

      {/* Table with filters */}
      <DataTable
        columns={columns}
        data={filteredData}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
      >
        <div>
          <h2 className="text-white text-lg font-medium mb-4">All Categories</h2>

          <div className="flex gap-4">
            <Input
              className="h-[45px] flex-1 rounded border border-gray-700 bg-[#131824] px-4 py-2.5 text-white placeholder:text-white focus-visible:ring-0 focus-visible:border-primary-color"
              placeholder="Search categories..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select
              value={filterStatus === "all" ? "" : String(filterStatus)}
              onValueChange={(value) =>
                setFilterStatus(value === "all" ? "" : Number(value))
              }
            >
              <SelectTrigger className="!h-[45px] w-[180px] rounded border border-gray-700 bg-[#131824] px-4 py-2.5 text-white cursor-pointer focus-visible:ring-0 focus-visible:border-primary-color">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent className="border border-gray-700 bg-[#131824] rounded">
                <SelectGroup className="space-y-2">
                  <SelectItem value="all" className="text-white hover:bg-primary-color">
                    All
                  </SelectItem>
                  <SelectItem value="1" className="text-white hover:bg-primary-color">
                    Active
                  </SelectItem>
                  <SelectItem value="0" className="text-white hover:bg-primary-color">
                    Deactive
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="flex items-center justify-center h-[45px] w-[45px] rounded border border-gray-700 bg-[#131824] cursor-pointer">
              <FilterIcon className="text-white" />
            </div>
          </div>
        </div>
      </DataTable>
    </div>
  );
}
