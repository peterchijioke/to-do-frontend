import { z } from "zod";

export const newTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must not exceed 500 characters"),
});

export type NewTaskFormValues = z.infer<typeof newTaskSchema>;