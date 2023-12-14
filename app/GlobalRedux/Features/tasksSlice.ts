import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Categories, Task } from "@/lib/types";
import supabase from "@/supabase";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { escape } from "querystring";

interface TasksState {
  loading: boolean;
  data: Task[];
  error: string;
}

const initialState: TasksState = {
  loading: false,
  data: [],
  error: "",
};

export const fetchTasks = createAsyncThunk<Task[], void>(
  "tasks/fetchTasks",
  async () => {
    try {
      const response = await supabase
        .from("tasks")
        .select("*")
        .order("task_order", { ascending: true });

      return response.data || [];
    } catch (error) {
      throw error;
    }
  }
);

// export const deleteTask = createAsyncThunk<string, string>(
//   "tasks/deleteTask",
//   async (taskId: string) => {
//     try {
//       await supabase.from("tasks").delete().eq("id", taskId);
//       return taskId;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// export const editTask = createAsyncThunk<
//   { editedTask: string; taskId: string },
//   { editedTask: string; taskId: string }
// >("tasks/editTask", async ({ editedTask, taskId }) => {
//   try {
//     await supabase
//       .from("tasks")
//       .update({ task: editedTask })
//       .eq("id", taskId)
//       .select();
//     return { editedTask, taskId };
//   } catch (error) {
//     throw error;
//   }
// });

// export const insertTask = createAsyncThunk<
//   Task,
//   { newTask: string; selectedTab: Categories }
// >("tasks/insertTask", async ({ newTask, selectedTab }) => {
//   try {
//     await supabase
//       .from("tasks")
//       .insert([
//         {
//           task: newTask,
//           category_id: selectedTab.id,
//           category: selectedTab.category,
//         },
//       ])
//       .select();

//     const response = await supabase
//       .from("tasks")
//       .select("*")
//       .eq("task", newTask)
//       .single();

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// });

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    deleteTask: (state, action) => {
      state.data = state.data.filter((c) => c.id != action.payload);
    },
    insertTask: (state, action) => {
      state.data.push(action.payload);
    },
    editTask: (state, action) => {
      state.data = state.data.map((task) =>
        task.id == action.payload.id ? action.payload : task
      );
    },
    changeOrder: (state, action) => {
      const { newOrder, oldOrder, selectedTab } = action.payload;
      state.data = state.data
        .map((task: Task) => {
          if (task.category_id == selectedTab && task.task_order != null) {
            if (task.task_order == oldOrder) {
              return { ...task, task_order: newOrder };
            } else if (
              newOrder < oldOrder &&
              task.task_order >= newOrder &&
              task.task_order < oldOrder
            ) {
              return { ...task, task_order: task.task_order + 1 };
            } else if (
              newOrder > oldOrder &&
              task.task_order <= newOrder &&
              task.task_order > oldOrder
            ) {
              return { ...task, task_order: task.task_order - 1 };
            }
          }
          return task;
        })
        .sort((a, b) => {
          if (a.task_order != null && b.task_order != null) {
            return a.task_order - b.task_order;
          }
          return 0;
        });
    },

    completeTask: (state, action) => {
      // let i = -1;
      // state.data = state.data.map((task) => {
      //   if (task.id == action.payload.id) {
      //     return { ...task, completed: true, task_order: null };
      //   } else if (
      //     task.category_id == action.payload.category_id &&
      //     !task.completed
      //   ) {
      //     i++;
      //     return { ...task, task_order: i };
      //   } else {
      //     return task;
      //   }
      // });
      // console.log(state.data);
    },
    unCompleteTask: (state, action) => {
      // state.data = state.data.map((task) =>
      //   task.id == action.payload.id
      //     ? {
      //         ...task,
      //         completed: false,
      //         task_order:
      //           state.data.findLastIndex(
      //             (c) => c.category_id == action.payload.category_id
      //           ) + 1,
      //       }
      //     : task
      // );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch tasks.";
      });

    // builder
    //   .addCase(deleteTask.pending, (state) => {
    //     // TODO: add loading state
    //   })
    //   .addCase(deleteTask.fulfilled, (state, action) => {
    //     state.loading = false;
    //     // Remove the deleted task from the data array
    //     state.data = state.data.filter((task) => task.id !== action.payload);
    //     state.error = "";
    //   })
    //   .addCase(deleteTask.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message ?? "Failed to delete the task.";
    //   });

    // builder
    //   .addCase(editTask.pending, (state) => {
    //     // TODO: add loading state
    //   })
    //   .addCase(editTask.fulfilled, (state, action) => {
    //     state.loading = false;
    //     // Replace the task with the updated task in the data array
    // state.data = state.data.map((task) =>
    //   task.id === action.payload.taskId
    //     ? { ...task, task: action.payload.editedTask }
    //     : task
    // );
    //     state.error = "";
    //   })
    //   .addCase(editTask.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message ?? "Failed to edit the task.";
    //   })
    //   .addCase(insertTask.pending, (state) => {
    //     //TODO: add loading state
    //   })
    //   .addCase(insertTask.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.data.push(action.payload);
    //     state.error = "";
    //   })
    //   .addCase(insertTask.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message ?? "Failed to insert task.";
    //   });
  },
});
export const {
  deleteTask,
  insertTask,
  editTask,
  changeOrder,
  completeTask,
  unCompleteTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
