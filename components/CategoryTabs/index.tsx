"use client";

import React, { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { updateTab } from "../../app/GlobalRedux/Features/selectedTab/selectedTabSlice";
import NewCategoryButton from "../NewCategoryButton";
import { Categories } from "@/lib/types";
import useCategories from "@/hooks/useCategories";
import type { RootState } from "../../app/GlobalRedux/store";

function CategoryTabs({ children }: { children: React.ReactNode }) {
  const selectedTab = useSelector((state: RootState) => state.selectTab.value);
  const dispatch = useDispatch();

  const { categories } = useCategories();

  return (
    <Tabs
      defaultValue="My tasks"
      value={selectedTab}
      className="p-2 w-full h-full max-h-[500px] flex  flex-col gap-2 "
      onChange={(e) => console.log(e)}
    >
      <ScrollArea className="rounded-md pb-3 h-[60px]">
        <TabsList className="box-border">
          <TabsTrigger
            value={"My tasks"}
            onClick={() => dispatch(updateTab("My tasks"))}
          >
            My Tasks
          </TabsTrigger>
          {categories?.map(({ category }: Categories) => {
            return (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => dispatch(updateTab(category))}
              >
                {category}
              </TabsTrigger>
            );
          })}
          <NewCategoryButton />
        </TabsList>

        <ScrollBar
          className="absolute top-[100% - 8px] cursor-grab"
          orientation="horizontal"
        />
      </ScrollArea>

      {children}
    </Tabs>
  );
}

export default CategoryTabs;
