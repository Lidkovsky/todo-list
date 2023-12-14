"use client";
import React from "react";
import DeleteCategory from "../DeleteCategory";
import NewTaskButton from "../NewTaskButton";

function Footer() {
  return (
    <div className="p-2 bg-slate-100 rounded-md flex flex-col-reverse items-center gap-2 sm:flex-row">
      <DeleteCategory />
      <NewTaskButton />
    </div>
  );
}

export default Footer;
