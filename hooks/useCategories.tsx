import supabase from "@/supabase";

import { Categories } from "@/lib/types";

import { useDispatch, useSelector } from "react-redux";

import { updateTab } from "@/app/GlobalRedux/Features/selectedTabSlice";
import { RootState } from "@/app/GlobalRedux/store";

import {
  deleteCategory as deleteCategoryDispatch,
  addCategory as addCategoryDispatch,
} from "@/app/GlobalRedux/Features/categoriesSlice";

const useCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.data);
  const userId = useSelector((state: RootState) => state.userId.id);
  const deleteCategory = async (id: string) => {
    try {
      let categoryIndex = categories.findIndex((c: Categories) => c.id == id);
      switch (categoryIndex) {
        case -1:
          throw "Id not found.";

        case 0:
          if (categories.length === 1) {
            dispatch(
              updateTab({
                id: -1,
                category: null,
              })
            );
          } else {
            dispatch(
              updateTab({
                id: categories[1].id,
                category: categories[1].category,
              })
            );
          }

          break;
        default:
          dispatch(
            updateTab({
              id: categories[categoryIndex - 1].id,
              category: categories[categoryIndex - 1].category,
            })
          );
          break;
      }

      const { data, error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.log(error);
        throw error;
      } else {
        dispatch(deleteCategoryDispatch(id));
        await supabase
          .from("log")
          .insert([
            {
              event_type: "DELETE",
              information: "Category deleted: " + data.category,
              table_name: "categories",
            },
          ])
          .select();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async (category: string) => {
    console.log(userId);
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert([{ category: category, user_id: userId }])
        .select("*")
        .single();

      if (error) {
        console.log(error);
        throw error;
      } else {
        dispatch(
          updateTab({
            id: data.id.toString(),
            category: data.category,
            user_id: userId,
          })
        );
        dispatch(addCategoryDispatch(data));
        await supabase
          .from("log")
          .insert([
            {
              event_type: "INSERT",
              information: "New category created: " + data.category,
              table_name: "categories",
            },
          ])
          .select();
      }
      return data;
    } catch (error) {
      return error;
    }
  };

  return {
    deleteCategory,
    addCategory,
  };
};
export default useCategories;
