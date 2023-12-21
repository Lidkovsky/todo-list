import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import useCategories from "@/hooks/useCategories";

function NewCategoryButton() {
  const [newCategory, setNewCategory] = useState<string>("");
  const { addCategory } = useCategories();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Plus size={16} className="mr-1" /> New Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="">New category</DialogTitle>
          <p className="text-slate-600 text-sm">{newCategory.length}/15</p>
        </DialogHeader>

        <form
          className="flex w-full flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addCategory(newCategory);
            setNewCategory("");
          }}
        >
          <Input
            className="w-full"
            value={newCategory}
            maxLength={15}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <DialogFooter className="mt-4 gap-2 sm:gap-0">
            <DialogClose>
              <Button
                variant="secondary"
                type="button"
                onClick={() => setNewCategory("")}
                className="w-full"
              >
                Cancel
              </Button>
            </DialogClose>
            <DialogClose>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NewCategoryButton;
