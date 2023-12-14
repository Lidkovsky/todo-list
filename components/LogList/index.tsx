"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import supabase from "@/supabase";

function LogList() {
  const [logs, setLogs] = useState<{ information: string; user_id: string }[]>(
    []
  );
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data, error } = await supabase
          .from("log")
          .select("information, user_id");
        if (error) {
          console.log(error);
          throw error;
        }
        if (data) {
          setLogs([...logs, ...data]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLogs();
  }, []);

  const realtime = supabase
    .channel("logs")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "log" },
      (payload) => {
        const { information, user_id } = payload.new;

        setLogs([...logs, { information: information, user_id: user_id }]);
      }
    )
    .subscribe();

  return (
    <ScrollArea className="h-full">
      {logs?.toReversed().map((log, index: number) => (
        <div className="my-2" key={index}>
          <p className="text-slate-600">{log.information}</p>
          <p className="text-xs text-slate-400">By: {log.user_id}</p>
        </div>
      ))}
      <ScrollBar />
    </ScrollArea>
  );
}

export default LogList;
