"use client";
import useTasks from "@/hooks/useTasks";
import React from "react";
import { TabsContent } from "../ui/tabs";
import TaskCard from "../TaskCard";
import { Task } from "@/lib/types";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

function TasksList() {
  const { tasks, error } = useTasks();
  if (error) {
    return (
      <div>
        <p>Something went wrong...</p>
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <ScrollArea className="p-2 box-border rounded-md bg-slate-100 h-full scroll-mb-[1px]">
      {tasks
        ?.filter((task: Task) => !task.completed)
        .map((task: Task) => {
          return (
            <TabsContent key={task.id} value={task.category}>
              <TaskCard task={task} />
            </TabsContent>
          );
        })}

      {tasks
        ?.filter((task: Task) => task.completed)
        .map((task: Task) => {
          return (
            <TabsContent key={task.id} value={task.category}>
              <TaskCard task={task} />
            </TabsContent>
          );
        })}
      <ScrollBar />
    </ScrollArea>
  );
}

export default TasksList;
