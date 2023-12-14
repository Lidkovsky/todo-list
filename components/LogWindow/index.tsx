import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import LogList from "../LogList";

function LogWindow() {
  return (
    <Card className="w-full h-56 max-w-3xl p-2 box-border">
      <p className="ml-2 mt-2 text-slate-600">Logs:</p>
      <CardContent className="bg-slate-100 mt-3 rounded-md h-40 box-border px-2 py-0">
        <LogList />
      </CardContent>
    </Card>
  );
}

export default LogWindow;
