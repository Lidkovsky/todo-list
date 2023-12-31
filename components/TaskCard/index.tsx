import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Edit, Save, Trash, X } from "lucide-react";
import { Input } from "../ui/input";
import { Task } from "@/lib/types";
import useTasks from "@/hooks/useTasks";

function TaskCard({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<string>(task.task);
  const { editTask, deleteTask, completeTask } = useTasks();

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="w-full text-left cursor-pointer hover:shadow-none hover:bg-slate-50"
      >
        <Card className="">
          <CardContent className=" p-4 flex justify-between items-center">
            <p>{task.task}</p>
            <Button
              onClick={(e) => {
                e.preventDefault();
                completeTask(task);
              }}
            >
              Done
            </Button>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="pt-12">
        {isEditing ? (
          <Input
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
        ) : (
          <p>{editedTask}</p>
        )}

        <DialogFooter>
          {isEditing ? (
            <>
              <Button
                className="flex gap-2"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditedTask(task.task);
                }}
              >
                <X size={16} />
                Cancel
              </Button>
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="flex gap-2"
                  onClick={() => {
                    setIsEditing(false);
                    editTask(editedTask, task.id);
                  }}
                >
                  <Save size={16} />
                  Save
                </Button>
              </DialogClose>
            </>
          ) : (
            <>
              <Button
                className="flex gap-2"
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                <Edit size={16} />
                Edit
              </Button>
              <DialogClose asChild>
                <Button
                  className="flex gap-2"
                  variant="destructive"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash size={16} />
                  Delete
                </Button>
              </DialogClose>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TaskCard;
