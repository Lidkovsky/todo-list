import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { updateTab } from "../../app/GlobalRedux/Features/selectedTabSlice";
import useCategories from "@/hooks/useCategories";
import { useDispatch } from "react-redux";
import { Categories } from "@/lib/types";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";

function NewCategoryButton() {
  const [newCategory, setNewCategory] = useState<string>("");

  const { addCategory } = useCategories();
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();
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
        <DialogDescription>
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
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default NewCategoryButton;
