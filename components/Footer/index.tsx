"use client";
import React from "react";
import DeleteCategory from "../DeleteCategory";
import NewTaskButton from "../NewTaskButton";

function Footer() {
  return (
    <div className="p-2 bg-slate-100 rounded-md flex items-center gap-2">
      <DeleteCategory />
      <NewTaskButton />
    </div>
  );
}

export default Footer;
