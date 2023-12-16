"use client";
import TasksTabs from "@/components/TasksTabs";
import LogWindow from "@/components/LogWindow";
import Login from "@/components/Login";
import SignOut from "@/components/SignOut";
import TabsContentList from "@/components/TabsContentList";
import supabase from "@/supabase";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserId } from "./GlobalRedux/Features/userSlice";
import FunctionBar from "@/components/FunctionBar";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.log(error);
      if (data) {
        setUser(data.session?.user);
      }
    };
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        switch (event) {
          case "SIGNED_IN":
            if (session) {
              setUser(session?.user);
              localStorage.setItem("supabaseToken", session.access_token);
              dispatch(setUserId(session?.user.id));
            }

            break;
          case "SIGNED_OUT":
            setUser(null);
            dispatch(setUserId(null));
            break;
          default:
            break;
        }
      }
    );
    getSession();
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <main className="flex px-2 min-h-screen flex-col items-center justify-around  bg-slate-400">
      {!user ? (
        <Login />
      ) : (
        <div className="p-2 relative w-full box-border flex h-[420px] flex-col items-center justify-between rounded-lg max-w-3xl mx-auto bg-white">
          <TasksTabs>
            <TabsContentList />
          </TasksTabs>
          <div className="flex gap-2 items-end mt-4 justify-between w-full sm:flex-row ">
            <SignOut />
            <FunctionBar />
          </div>
        </div>
      )}

      <LogWindow />
    </main>
  );
}
