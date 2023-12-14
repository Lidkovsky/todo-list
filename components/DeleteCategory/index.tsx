"use client";

import React from "react";
import { Button } from "../ui/button";
import useCategories from "@/hooks/useCategories";
import type { RootState } from "../../app/GlobalRedux/store";
import { useSelector } from "react-redux";

import { Trash } from "lucide-react";

function DeleteCategory() {
  const selectedTab = useSelector((state: RootState) => state.selectTab.id);
  const { deleteCategory } = useCategories();
  const categories = useSelector((state: RootState) => state.categories);
  return (
    <Button
      variant="secondary"
      disabled={categories.data.length === 0}
      onClick={() => {
        deleteCategory(selectedTab);
      }}
    >
      <Trash size={16} className="mr-1" />
      Delete Category
    </Button>
  );
}

export default DeleteCategory;
