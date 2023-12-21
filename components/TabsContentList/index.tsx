"use client";
import React from "react";
import { TabsContent } from "../ui/tabs";
import TasksList from "../TasksList";
import { Categories } from "@/lib/types";
import { Droppable } from "react-beautiful-dnd";
import CompletedTasksList from "../CompletedTasksList";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import LoadingIcon from "../ui/loadingIcon";

function TabsContentList() {
  const categories = useSelector((state: RootState) => state.categories);
  const tasks = useSelector((state: RootState) => state.tasks);
  if (tasks.loading) {
    return (
      <div className="f-full flex justify-center items-center p-9">
        <LoadingIcon />
      </div>
    );
  }
  if (categories.data.length === 0) {
    return (
      <div className="w-full flex justify-center pt-4">
        Please add new category.
      </div>
    );
  }

  return (
    <>
      {categories.data.map((category: Categories, index: number) => {
        return (
          <TabsContent
            key={index}
            value={category.id.toString()}
            className="mt-0"
          >
            <Droppable
              droppableId={"draggableId" + category.id}
              type="TASK"
              direction="vertical"
            >
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <TasksList category_id={category.id} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </TabsContent>
        );
      })}
      <CompletedTasksList />
    </>
  );
}

export default TabsContentList;
