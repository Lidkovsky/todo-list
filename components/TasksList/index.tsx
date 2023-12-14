"use client";
import React from "react";

import TaskCard from "../TaskCard";
import { Task } from "@/lib/types";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";

function TasksList({ category_id }: { category_id: string }) {
  const tasks = useSelector((state: RootState) => state.tasks);

  if (!tasks.loading && tasks.error) {
    return <div>Error: {tasks.error}</div>;
  }

  return (
    <div>
      {!tasks.loading && tasks.data.length ? (
        <div className="flex flex-col h-full gap-2 p-2 rounded-md">
          {tasks.data
            .filter(
              (task: Task) =>
                task.category_id === category_id && !task.completed
            )

            .map((task: Task, index: number) => (
              <Draggable
                index={index}
                key={index + " " + task.id}
                draggableId={index.toString()}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
        </div>
      ) : null}
    </div>
  );
}

export default TasksList;
