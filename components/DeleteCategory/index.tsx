"use client";

import React from "react";
import { Button } from "../ui/button";
import useCategories from "@/hooks/useCategories";
import type { RootState } from "../../app/GlobalRedux/store";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { updateTab } from "../../app/GlobalRedux/Features/selectedTab/selectedTabSlice";
import { Trash } from "lucide-react";

function DeleteCategory() {
  const selectedTab = useSelector((state: RootState) => state.selectTab.value);
  const dispatch = useDispatch();
  const { deleteCategory, refetch } = useCategories();

  return (
    <Button
      variant="secondary"
      disabled={selectedTab === "My tasks"}
      onClick={(e) => {
        dispatch(updateTab("My tasks"));
        deleteCategory(e, selectedTab).then(refetch);
      }}
    >
      <Trash size={16} className="mr-1" />
      Delete Category
    </Button>
  );
}

export default DeleteCategory;
