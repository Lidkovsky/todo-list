"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import supabase from "@/supabase";
import { useDispatch } from "react-redux";
import { setUserId } from "@/app/GlobalRedux/Features/userSlice";

function SignIn({ signUp }: { signUp: () => void }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.log(error);
        throw error;
      } else {
        dispatch(setUserId(data.session.user.id));
        await supabase
          .from("log")
          .insert([
            {
              event_type: "NONE",
              information: "Signed in: " + email,
              table_name: "users",
            },
          ])
          .select();
      }
    } catch (error) {}
  };
  return (
    <Card className="max-w-[400px] w-full">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={(e) => handleSignIn(e)} className="flex flex-col gap-2">
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
          <div className="flex flex-col gap-2 mt-7">
            <Button className="w-full" type="submit">
              Login
            </Button>
            <Button className="w-full" variant="secondary" onClick={signUp}>
              Register instead
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignIn;
