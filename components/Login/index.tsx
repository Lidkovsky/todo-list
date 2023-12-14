"use client";
import supabase from "@/supabase";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  if (isSignIn) {
    return <SignIn signUp={() => setIsSignIn(!isSignIn)} />;
  }
  return <SignUp signIn={() => setIsSignIn(!isSignIn)} />;
};

export default Login;
