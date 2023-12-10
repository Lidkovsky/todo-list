import supabase from "@/supabase";
import { PostgrestResponse } from "@supabase/supabase-js";

import { useEffect, useState } from "react";
import { Categories } from "@/lib/types";

import { useDispatch, useSelector } from "react-redux";

import {
  setCategories,
  selectCategories,
} from "../app/GlobalRedux/Features/categoryList/categoriesSlice";

const useCategories = () => {
  //const [categories, setCategories] = useState<Categories[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response: PostgrestResponse<Categories> = await supabase
        .from("categories")
        .select("category");
      dispatch(setCategories(response.data || []));
      // setCategories(response.data || []);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (e: React.FormEvent, category: string) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error: categoriesError } = await supabase
        .from("categories")
        .delete()
        .eq("category", category)
        .select();

      const { error: tasksError } = await supabase
        .from("tasks")
        .delete()
        .eq("category", category)
        .select();
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const addCategory = async (e: React.FormEvent, category: string) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("categories")
        .insert([{ category: category }])
        .select();
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => {
    setIsLoading(true);
    await fetchData();
    setIsLoading(false);
  };

  return { categories, isLoading, refetch, deleteCategory, addCategory };
};
export default useCategories;
