import { z } from "zod";

export const signupSchema = z.object({
  email: z.string({
    required_error:"Email is required"
  }).email("Invalid email address"),
  password: z.string({
    required_error:"Password is required"
  }).min(6, "Password must be at least 6 characters"),
  username: z.string({
    required_error:"Username is required"
  }).min(1, "Username is required"),
});

export type SignupFormInputs = z.infer<typeof signupSchema>;
