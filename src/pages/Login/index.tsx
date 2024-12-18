import React from "react";
import LoginForm from "../../_components/forms/LoginForm";

type Props = {};

export default function LoginPage({}: Props) {
  return (
    <div className=" flex self-center w-full container h-screen md:px-0 px-6 justify-center pt-24">
      <LoginForm />
    </div>
  );
}
