"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import supabase from "@/supabase";
import { Button } from "../ui/button";

function SignUp({ signIn }: { signIn: () => void }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: getURL(),
        },
      });
      if (error) {
        console.log(error);
        setError(error.message);
        throw error;
      } else {
        await supabase
          .from("log")
          .insert([
            {
              event_type: "INSERT",
              information: "Registered and signed in: " + email,
              table_name: "users",
            },
          ])
          .select();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      className="max-w-[400px] w-full"
      style={error ? { border: "red solid 2px" } : undefined}
    >
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={(e) => handleSignUp(e)} className="flex flex-col gap-2">
          <Input
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="text-red-600 text-xs text-center m-0">{error}</p>
          )}
          <div className="flex flex-col gap-2 mt-7">
            <Button className="w-full" type="submit">
              Register
            </Button>
            <Button className="w-full" variant="secondary" onClick={signIn}>
              Login instead
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignUp;
