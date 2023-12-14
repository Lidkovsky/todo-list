"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import supabase from "@/supabase";

function LogList() {
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data, error } = await supabase
          .from("log")
          .select("information");
        if (error) {
          console.log(error);
          throw error;
        }
        if (data) {
          setLogs(data.map((log) => log.information));
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
        setLogs([...logs, payload.new.information]);
      }
    )
    .subscribe();

  return (
    <ScrollArea className="h-full">
      {logs?.toReversed().map((log: string, index: number) => (
        <p key={index} className="text-slate-600 my-2">
          {log}
        </p>
      ))}
      <ScrollBar />
    </ScrollArea>
  );
}

export default LogList;
