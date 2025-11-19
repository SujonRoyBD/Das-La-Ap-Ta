"use client";

import { useState, useMemo, useEffect } from "react";
import { DataTable } from "@/components/reusable/data-table";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { Delete, Edit, FilterIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EditCategoryModal from "../EditMordal/EditMordal";

export type Category = {
  id: number;
  name: string;
  description: string;
  contentCount: number;
  status: string;
};

// কলাম ডিফাইন করার ফাংশন
const getColumns = (
  setSelectedCategory: (c: Category) => void,
  setEditModalOpen: (b: boolean) => void
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
        <Delete className="cursor-pointer" />
      </span>
    ),
  },
];

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const columns = useMemo(
    () => getColumns(setSelectedCategory, setEditModalOpen),
    []
  );

  // সার্ভার থেকে ডাটা ফেচিং
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("http://localhost:5000/api/categories");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

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

  // Save edited category - API PUT কলসহ
 const handleSave = async (updated: Category) => {
  try {
    const response = await fetch(`http://localhost:5000/api/categories/${updated.id}`, {

      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    });

    if (!response.ok) {
      throw new Error("Failed to update category");
    }

    const updatedCategory = await response.json();
    console.log("Updated from server:", updatedCategory);

    setCategories((prev) =>
      prev.map((item) => (item.id === updatedCategory.id ? updatedCategory : item))
    );

    console.log("Categories after update:", categories); // এখানে স্টেট ইমিডিয়েটলি আপডেট হয় না, তাই useEffect এ লগ করা ভালো

    setEditModalOpen(false);
  } catch (error) {
    console.error("Update failed:", error);
  }
};


  return (
    <div className="w-full">
       
      <EditCategoryModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        category={selectedCategory}
        onSave={handleSave}
      />

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
    </div>
  );
}


//api integration

// "use client";

// import { DataTable } from "@/components/reusable/data-table";
// import { Input } from "@/components/ui/input";
// import { ColumnDef } from "@tanstack/react-table";
// import { Delete, Edit, FilterIcon } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import EditCategoryModal from "../EditMordal/EditMordal";

// export type Category = {
//   id: number;
//   name: string;
//   description: string;
//   contentCount: number;
//   status: string;
// };

// // columns function
// const getColumns = (
//   setSelectedCategory: (c: Category) => void,
//   setEditModalOpen: (b: boolean) => void
// ): ColumnDef<Category>[] => [
//   {
//     accessorKey: "name",
//     header: "Category Name",
//   },
//   {
//     accessorKey: "description",
//     header: "Description",
//   },
//   {
//     accessorKey: "contentCount",
//     header: "Content",
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <span
//         className={
//           row.original.status === "Active"
//             ? "text-green-500 font-semibold"
//             : "text-gray-400"
//         }
//       >
//         {row.original.status}
//       </span>
//     ),
//   },
//   {
//     accessorKey: "Action",
//     header: "Action",
//     cell: ({ row }) => (
//       <span className="flex gap-2">
//         <Edit
//           className="cursor-pointer"
//           onClick={() => {
//             setSelectedCategory(row.original);
//             setEditModalOpen(true);
//           }}
//         />
//         <Delete className="cursor-pointer" />
//       </span>
//     ),
//   },
// ];

// export default function CategoryTable() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(10);

//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");

//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<Category | null>(
//     null
//   );

//   // fetch data
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/categories");
//         const data = await res.json();
//         setCategories(data);
//       } catch (err) {
//         console.log("API error:", err);
//       }
//       setIsLoading(false);
//     };
//     loadData();
//   }, []);

//   const columns = useMemo(
//     () => getColumns(setSelectedCategory, setEditModalOpen),
//     []
//   );

//   // filter + paginate
//   const filteredData = useMemo(() => {
//     return categories
//       .filter((item) => {
//         const matchSearch = item.name
//           .toLowerCase()
//           .includes(search.toLowerCase());

//         const matchStatus =
//           filterStatus === "" ? true : item.status === filterStatus;

//         return matchSearch && matchStatus;
//       })
//       .slice((page - 1) * pageSize, page * pageSize);
//   }, [categories, search, filterStatus, page, pageSize]);

//   // Save edited category
//   const handleSave = (updated: Category) => {
//     setCategories((prev) =>
//       prev.map((item) => (item.id === updated.id ? updated : item))
//     );
//     setEditModalOpen(false);
//   };

//   if (isLoading) return <div className="text-white">Loading...</div>;

//   return (
//     <div className="w-full">
//       {/* Modal */}
//       <EditCategoryModal
//         open={editModalOpen}
//         onClose={() => setEditModalOpen(false)}
//         category={selectedCategory}
//         onSave={handleSave}
//       />

//       <DataTable
//         columns={columns}
//         data={filteredData}
//         page={page}
//         pageSize={pageSize}
//         total={categories.length}
//         onPageChange={setPage}
//       >
//         <h2 className="text-white text-lg mb-4">All Categories</h2>

//         <div className="flex gap-4 mb-4">
//           {/* Search */}
//           <Input
//             className="h-[45px] flex-1 rounded bg-[#131824] text-white"
//             placeholder="Search categories..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           {/* Filter */}
//           <Select
//             value={filterStatus}
//             onValueChange={(value) =>
//               setFilterStatus(value === "all" ? "" : value)
//             }
//           >
//             <SelectTrigger className="!h-[45px] w-[160px] bg-[#131824] text-white">
//               <SelectValue placeholder="Filter by Status" />
//             </SelectTrigger>

//             <SelectContent className="bg-[#131824]">
//               <SelectGroup>
//                 <SelectItem value="all" className="text-white">
//                   All
//                 </SelectItem>
//                 <SelectItem value="Active" className="text-white">
//                   Active
//                 </SelectItem>
//                 <SelectItem value="Deactive" className="text-white">
//                   Deactive
//                 </SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>

//           <div className="flex items-center justify-center h-[45px] w-[45px] bg-[#131824] border border-gray-700 rounded">
//             <FilterIcon className="text-white" />
//           </div>
//         </div>
//       </DataTable>
//     </div>
//   );
// }
