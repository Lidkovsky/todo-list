"use client";
import Tabs from "@/components/CategoryTabs";
import Footer from "@/components/Footer";
import LogWindow from "@/components/LogWindow";
import Login from "@/components/Login";
import SignOut from "@/components/SignOut";
import TabsContentList from "@/components/TabsContentList";
import supabase from "@/supabase";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserId } from "./GlobalRedux/Features/userSlice";

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
            setUser(session?.user);
            dispatch(setUserId(session?.user.id));
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
          <Tabs>
            <TabsContentList />
          </Tabs>
          <div className="flex mt-4 justify-between w-full">
            <SignOut />
            <Footer />
          </div>
        </div>
      )}

      <LogWindow />
    </main>
  );
}
