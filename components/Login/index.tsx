"use client";

import { useState } from "react";
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
