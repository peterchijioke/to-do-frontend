import React from "react";
import SignupForm from "../../_components/forms/SignupForm";

type Props = {};

export default function SignupPage({}: Props) {
  return (
    <div className=" flex self-center w-full container h-screen md:px-0 px-6 justify-center pt-24">
      <SignupForm />
    </div>
  );
}
