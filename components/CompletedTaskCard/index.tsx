import { Task } from "@/lib/types";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import useTasks from "@/hooks/useTasks";

function CompletedTaskCard({ task }: { task: Task }) {
  const { completeTask } = useTasks();
  return (
    <Card className="shadow-none">
      <CardContent className="flex justify-between items-center bg-slate-50 cursor-not-allowed p-4">
        <p className="line-through text-slate-400">
          {task.task} {task.task_order}
        </p>
        <Button
          onClick={() => {
            completeTask(task);
          }}
        >
          unComplete
        </Button>
      </CardContent>
    </Card>
  );
}

export default CompletedTaskCard;
