import { useState, useEffect } from "react";
import { PostgrestResponse } from "@supabase/supabase-js";
import supabase from "@/supabase";
import type { Task } from "@/lib/types";
import { useDispatch, useSelector } from "react-redux";
import {
  setTasks,
  selectTasks,
} from "../app/GlobalRedux/Features/tasksList/tasksSlice";

const useTasks = () => {
  //const [data, setData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response: PostgrestResponse<Task> = await supabase
        .from("tasks")
        .select("*");

      dispatch(
        setTasks(response.data?.sort((a, b) => b.order - a.order) || [])
      );

      // setData(response.data?.sort((a, b) => b.order - a.order) || []);
    } catch (error) {
      setError(error as Error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const editTask = async (editedTask: string, id: string) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .update({ task: editedTask })
        .eq("id", id)
        .select();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .select();
    } catch (error) {
      console.log(error);
    }
  };

  const insertTask = async (task: { task: string; category: string }) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert([{ task: task.task, category: task.category }])
        .select();
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (task: Task) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({ completed: !task.completed })
        .eq("id", task.id)
        .select();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return {
    tasks,
    isLoading,
    error,
    editTask,
    deleteTask,
    completeTask,
    insertTask,
    refetch,
  };
};

export default useTasks;
