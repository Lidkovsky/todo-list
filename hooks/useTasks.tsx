import supabase from "@/supabase";
import { Task } from "@/lib/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import {
  insertTask as insertTaskDispatch,
  deleteTask as deleteTaskDispatch,
  editTask as editTaskDispatch,
  completeTask as completeTaskDispatch,
  unCompleteTask as unCompleteTaskDispatch,
  fetchTasks,
} from "@/app/GlobalRedux/Features/tasksSlice";
const useTasks = () => {
  const dispatch = useDispatch();

  const selectedTab = useSelector((state: RootState) => state.selectTab);
  const userId = useSelector((state: RootState) => state.userId.id);
  const editTask = async (editedTask: string, id: string) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({ task: editedTask })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.log(error);
        throw error;
      } else {
        dispatch(editTaskDispatch(data));
        await supabase
          .from("log")
          .insert([
            {
              event_type: "EDIT",
              information: "Task with id " + id + " edited to: " + editedTask,
              table_name: "tasks",
              user_id: userId,
            },
          ])
          .select();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);
      if (error) {
        console.log(error);
        throw error;
      } else {
        //TODO: add delete task logic
        //dispatch(deleteTaskDispatch(taskId));
        dispatch(fetchTasks() as any);
        await supabase
          .from("log")
          .insert([
            {
              event_type: "DELETE",
              information: "Deleted task ID: " + taskId,
              table_name: "tasks",
              user_id: userId,
            },
          ])
          .select();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const insertTask = async (task: string) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert([
          {
            task: task,
            category: selectedTab.category,
            category_id: selectedTab.id,
          },
        ])
        .select()
        .single();

      if (error) {
        console.log(error);
        throw error;
      } else {
        dispatch(insertTaskDispatch(data));
        await supabase
          .from("log")
          .insert([
            {
              event_type: "INSERT",
              information: "New task: " + task,
              table_name: "tasks",
              user_id: userId,
            },
          ])
          .select();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (task: Task) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .update({ completed: !task.completed })
        .eq("id", task.id)
        .select();
      if (error) {
        console.log(error.message);
        throw error;
      } else {
        dispatch(fetchTasks() as any);
        await supabase
          .from("log")
          .insert([
            {
              event_type: "EDIT",
              information: task.completed
                ? "Task unCompleted: " + task.task
                : "Task completed: " + task.task,
              table_name: "tasks",
              user_id: userId,
            },
          ])
          .select();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateOrder = async (newOrder: number, oldOrder: number) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({ task_order: newOrder })
        .eq("task_order", oldOrder)
        .eq("category_id", selectedTab.id)
        .select()
        .single();

      if (error) {
        console.log(error);
        throw error;
      } else {
        await supabase
          .from("log")
          .insert([
            {
              event_type: "EDIT",
              information: "Changed order for task: " + data.task,
              table_name: "tasks",
              user_id: userId,
            },
          ])
          .select();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    editTask,
    completeTask,
    deleteTask,
    insertTask,
    updateOrder,
  };
};

export default useTasks;
