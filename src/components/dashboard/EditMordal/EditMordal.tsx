import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "../OrderTable/OrderTable";

type EditCategoryModalProps = {
  open: boolean;
  onClose: () => void;
  category: Category | null;
  onSave: (updatedCategory: Category) => void;
};

export default function EditCategoryModal({
  open,
  onClose,
  category,
  onSave,
}: EditCategoryModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contentCount, setContentCount] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setContentCount(String(category.contentCount));
      setStatus(category.status);
    }
  }, [category]);

  if (!open) return null;

  const handleSaveClick = () => {
    const parsedContentCount = Number(contentCount);
    if (isNaN(parsedContentCount) || name.trim() === "") {
      alert("Please enter valid name and content count");
      return;
    }
    if (!category) return;

    onSave({
      ...category,
      name,
      description,
      contentCount: parsedContentCount,
      status,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#1d2333] p-6 rounded w-[600px] h-[400px] relative z-60"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white text-lg mb-4">Edit Category</h2>

        <Input
          className="bg-[#131824] text-white mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
        />

        <Input
          className="bg-[#131824] text-white mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <Input
          className="bg-[#131824] text-white mb-4"
          value={contentCount}
          onChange={(e) => setContentCount(e.target.value)}
          placeholder="Content Count"
          type="number"
        />

        <select
          className="bg-[#131824] text-white mb-4 p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Deactive">Deactive</option>
        </select>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>

          <Button type="button" onClick={handleSaveClick}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
