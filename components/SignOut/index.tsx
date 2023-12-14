import React from "react";
import { Button } from "../ui/button";
import supabase from "@/supabase";

function SignOut() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      const { error } = await supabase
        .from("log")
        .insert([
          {
            event_type: "NONE",
            information: "User signed out.",
            table_name: "users",
          },
        ])
        .select();
      if (error) console.log(error);
    }
  };
  return (
    <div className=" p-2 bg-slate-100 rounded-md flex items-center gap-2">
      <Button variant="destructive" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default SignOut;
