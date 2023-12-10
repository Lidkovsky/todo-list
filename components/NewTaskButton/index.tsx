"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

import { useSelector } from "react-redux";
import type { RootState } from "../../app/GlobalRedux/store";
import useTasks from "@/hooks/useTasks";

function NewTaskButton() {
  const selectedTab = useSelector((state: RootState) => state.selectTab.value);

  const [newTask, setNewTask] = useState<string>("");

  const { insertTask, refetch } = useTasks();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus size={16} className="mr-1" /> New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter task</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form
            className=" w-full  items-center"
            onSubmit={(e) => {
              e.preventDefault();
              insertTask({ task: newTask, category: selectedTab }).then(
                refetch
              );
              setNewTask("");
            }}
          >
            <Input
              className="w-full"
              value={newTask}
              required
              onChange={(e) => setNewTask(e.target.value)}
            />
            <DialogFooter className="mt-4 gap-2 sm:gap-0">
              <DialogClose>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setNewTask("")}
                  className="w-full"
                >
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose>
                <Button type="submit" className="w-full">
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default NewTaskButton;
