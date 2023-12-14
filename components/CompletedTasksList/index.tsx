"use client";
import React from "react";

import { Task } from "@/lib/types";

import CompletedTaskCard from "../CompletedTaskCard";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";

function CompletedTasksList() {
  const tasks = useSelector((state: RootState) => state.tasks);
  const selectedTab = useSelector((state: RootState) => state.selectTab.id);
  return (
    <div className="flex flex-col h-full gap-2 p-2 rounded-md">
      {tasks.data
        .filter(
          (task: Task) =>
            task.completed === true && task.category_id == selectedTab
        )
        .map((task: Task, index: number) => (
          <CompletedTaskCard key={task.id + " " + index} task={task} />
        ))}
    </div>
  );
}

export default CompletedTasksList;
