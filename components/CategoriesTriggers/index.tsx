import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { Categories } from "@/lib/types";
import { TabsTrigger } from "../ui/tabs";
import { updateTab } from "@/app/GlobalRedux/Features/selectedTabSlice";
import LoadingIcon from "../ui/loadingIcon";

function CategoriesTriggers() {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);

  if (categories.loading) {
    return <LoadingIcon />;
  }

  if (!categories.loading && categories.error) {
    return <div>Error: {categories.error}</div>;
  }

  return (
    <>
      {!categories.loading && categories.data.length
        ? categories.data.map((category: Categories) => (
            <TabsTrigger
              key={category.id + category.category}
              value={category.id.toString()}
              onClick={() => {
                dispatch(
                  updateTab({
                    id: category.id.toString(),
                    category: category.category,
                  })
                );
              }}
            >
              {category.category}
            </TabsTrigger>
          ))
        : null}
    </>
  );
}

export default CategoriesTriggers;
