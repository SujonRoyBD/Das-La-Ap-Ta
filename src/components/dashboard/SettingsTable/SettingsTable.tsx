"use client";

import { useState, useMemo } from "react";
import { DataTable } from "@/components/reusable/data-table";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, FilterIcon, ShowerHead } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EditCategoryModal from "../EditMordal/EditMordal";
import Userfrom from "@/app/(dashboard)/tabs/userform/page";

export type Category = {
  id: number;
  name: string;
  description: string;
  contentCount: number;
  status: string;
};

const initialCategories: Category[] = [
  { id: 1, name: "Action", description: "Movies with a lot of action and stunts", contentCount: 248, status: "Deactive" },
  { id: 2, name: "Comedy", description: "Funny movies to make you laugh", contentCount: 176, status: "Deactive" },
  { id: 3, name: "Drama", description: "Emotional and story-driven movies", contentCount: 215, status: "Active" },
  { id: 4, name: "Horror", description: "Scary movies with suspense", contentCount: 120, status: "Active" },
  { id: 5, name: "Sci-Fi", description: "Futuristic and science-based movies", contentCount: 189, status: "Deactive" },
  { id: 6, name: "Romance", description: "Love and relationship based movies", contentCount: 98, status: "Active" },
];

export default function SettingsTable() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // এখানে showUserForm state যোগ করলাম
  const [showUserForm, setShowUserForm] = useState(false);

  // getColumns এখন showUserForm এবং setShowUserForm নেয়
  const getColumns = (
    setSelectedCategory: (c: Category) => void,
    setEditModalOpen: (b: boolean) => void,
    showUserForm: boolean,
    setShowUserForm: (b: boolean) => void
  ): ColumnDef<Category>[] => [
    {
      accessorKey: "name",
      header: "Category Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "contentCount",
      header: "Content",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={
            row.original.status === "Active"
              ? "text-green-500 font-semibold"
              : "text-gray-400"
          }
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "Action",
      header: "Action",
      cell: ({ row }) => (
        <span className="flex gap-2">
          <Edit
            className="cursor-pointer"
            onClick={() => {
              setSelectedCategory(row.original);
              setEditModalOpen(true);
            }}
          />
          <ShowerHead
            className="cursor-pointer"
            onClick={() => setShowUserForm(true)}
          />
        </span>
      ),
    },
  ];

  const columns = useMemo(
    () => getColumns(setSelectedCategory, setEditModalOpen, showUserForm, setShowUserForm),
    [showUserForm]
  );

  // Filter এবং pagination প্রয়োগ
  const filteredData = useMemo(() => {
    return categories
      .filter((item) => {
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "" ? true : item.status === filterStatus;
        return matchSearch && matchStatus;
      })
      .slice((page - 1) * pageSize, page * pageSize);
  }, [categories, search, filterStatus, page, pageSize]);

  // Save edited category - লোকাল স্টেটে আপডেট
  const handleSave = (updated: Category) => {
    setCategories((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setEditModalOpen(false);
  };

  return (
    <div className="w-full">
      <EditCategoryModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        category={selectedCategory}
        onSave={handleSave}
      />

      {!showUserForm && (
        <>
          <DataTable
            columns={columns}
            data={filteredData}
            page={page}
            pageSize={pageSize}
            total={categories.length}
            onPageChange={setPage}
          >
            <h2 className="text-white text-lg mb-4">All Categories</h2>

            <div className="flex gap-4 mb-4">
              <Input
                className="h-[45px] flex-1 rounded bg-[#131824] text-white"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Select
                value={filterStatus}
                onValueChange={(value) => setFilterStatus(value === "all" ? "" : value)}
              >
                <SelectTrigger className="!h-[45px] w-[160px] bg-[#131824] text-white">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>

                <SelectContent className="bg-[#131824]">
                  <SelectGroup>
                    <SelectItem value="all" className="text-white">All</SelectItem>
                    <SelectItem value="Active" className="text-white">Active</SelectItem>
                    <SelectItem value="Deactive" className="text-white">Deactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="flex items-center justify-center h-[45px] w-[45px] bg-[#131824] border border-gray-700 rounded">
                <FilterIcon className="text-white" />
              </div>
            </div>
          </DataTable>
        </>
      )}

      {showUserForm && (
        <div>

          <Userfrom />
        </div>
      )}
    </div>
  );
}
