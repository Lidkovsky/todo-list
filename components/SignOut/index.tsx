import React from "react";
import { Button } from "../ui/button";
import supabase from "@/supabase";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
function SignOut() {
  const userId = useSelector((state: RootState) => state.userId.id);
  console.log(userId);
  const handleSignOut = async () => {
    let user = userId;
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
            user_id: user,
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
