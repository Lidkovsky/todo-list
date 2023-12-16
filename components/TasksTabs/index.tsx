"use client";

import React, { useEffect } from "react";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useSelector } from "react-redux";
import NewCategoryButton from "../NewCategoryButton";
import type { AppDispatch, RootState } from "../../app/GlobalRedux/store";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CategoriesTriggers from "../CategoriesTriggers";
import useTasks from "@/hooks/useTasks";
import { useDispatch } from "react-redux";
import { changeOrder, fetchTasks } from "@/app/GlobalRedux/Features/tasksSlice";
import { fetchCategories } from "@/app/GlobalRedux/Features/categoriesSlice";
import { updateTab } from "@/app/GlobalRedux/Features/selectedTabSlice";

function TasksTabs({ children }: { children: React.ReactNode }) {
  const selectedTab = useSelector((state: RootState) => state.selectTab);
  const tasks = useSelector((state: RootState) => state.tasks.data);
  const categories = useSelector((state: RootState) => state.categories.data);
  const { updateOrder } = useTasks();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchCategories()).then(() => {
      if (categories.length != 0)
        dispatch(
          updateTab({
            id: categories[0].id.toString(),
            category: categories[0].category,
          })
        );
    });
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    dispatch(
      changeOrder({
        newOrder: destination.index,
        oldOrder: source.index,
        selectedTab: selectedTab.id,
      })
    );

    updateOrder(destination.index, source.index);
  };

  return (
    <Tabs
      defaultValue="1"
      value={selectedTab.id.toString()}
      className=" w-full box-border h-[320px]"
    >
      <ScrollArea className="rounded-md pb-3 ">
        <TabsList>
          <CategoriesTriggers />
          <NewCategoryButton />
        </TabsList>

        <ScrollBar
          className="absolute top-[100% - 8px] cursor-grab"
          orientation="horizontal"
        />
      </ScrollArea>
      <ScrollArea
        style={{ height: "calc(100% - 52px)" }}
        className="rounded-md border bg-slate-100"
      >
        <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
        <ScrollBar />
      </ScrollArea>
    </Tabs>
  );
}

export default TasksTabs;
