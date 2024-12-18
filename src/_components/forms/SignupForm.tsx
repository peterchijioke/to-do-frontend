import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import {
  SignupFormInputs,
  signupSchema,
} from "../../validation/signup.validation";
import useSWRMutation from "swr/mutation";
import { postApiService } from "../../service/api.service";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

export default function SignupForm() {
  const { trigger, isMutating } = useSWRMutation(
    "/auth/register",
    postApiService
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const navigation = useNavigate();

  const onSubmit = useCallback(async (data: SignupFormInputs) => {
    console.log("Form Data: ", data);
    try {
      const response = await trigger({ ...data });
      if (response.data && response.status) {
        toast.success(response.message, { position: "top-right" });
        navigation("/");
        return;
      }

      if (!response.status) {
        toast.error(response.message, { position: "top-right" });
      }
    } catch (error) {
      console.log("SignupForm", error);
    }
  }, []);

  return (
    <div className="md:w-[40rem] w-full h-fit bg-white mt-12 items-center flex flex-col p-8 rounded-xl">
      <div className="flex flex-col items-center">
        <span className="font-semibold text-2xl text-amber-950">Register</span>
        <span className="font-semibold text-xs text-amber-950">
          Register to list and manage your todos
        </span>
      </div>
      <form
        className="w-full py-12 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Email Field */}
        <div className=" grid gap-5">
          <div className="grid gap-2 w-full">
            <label
              className="text-sm font-semibold text-amber-950"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full h-12 bg-white border border-amber-950 outline-none focus-visible:ring-0 text-amber-950 p-2 rounded-lg"
              type="text"
              id="username"
              placeholder="Enter username"
              {...register("username")}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="grid gap-2 w-full">
            <label
              className="text-sm font-semibold text-amber-950"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="w-full h-12 bg-white border border-amber-950 outline-none focus-visible:ring-0 text-amber-950 p-2 rounded-lg"
              type="text"
              id="email"
              placeholder="Enter email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="grid gap-2 w-full">
            <label
              className="text-sm font-semibold text-amber-950"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full h-12 bg-white border border-amber-950 outline-none focus-visible:ring-0 text-amber-950 p-2 rounded-lg"
              type="password"
              id="password"
              placeholder="Enter password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="  text-sm flex justify-end text-black gap-1">
            Already have an account?{" "}
            <Link to={"/"} className="text-amber-950">
              Login
            </Link>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full pt-9">
          <button
            disabled={isMutating}
            type="submit"
            className="w-full bg-amber-950 text-white h-12 hover:bg-amber-800"
          >
            {isMutating ? (
              <Loader className=" size-3 text-white animate-spin" />
            ) : (
              "Done"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
