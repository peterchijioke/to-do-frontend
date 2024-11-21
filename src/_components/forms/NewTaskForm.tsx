import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  NewTaskFormValues,
  newTaskSchema,
} from "../../validation/task.validation";

type Props = {
  closeModal: () => void;
};

export default function NewTaskForm({ closeModal }: Props) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTaskFormValues>({
    resolver: zodResolver(newTaskSchema),
  });

  const onSubmit: SubmitHandler<NewTaskFormValues> = (data) => {
    console.log("Form Data:", data);
    closeModal();
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-2">
        <label htmlFor="title" className="text-sm font-black text-amber-950">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          placeholder="Task Title"
          className={`w-full px-3 py-2 border ${
            errors.title ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none text-amber-950 bg-white focus:ring-1 focus:ring-amber-950 focus:border-amber-950`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="description"
          className="text-sm font-black text-amber-950"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          placeholder="Task Description"
          className={`w-full px-3 py-2 border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } rounded-md text-amber-950 focus:outline-none bg-white focus:ring-1 focus:ring-amber-950 focus:border-amber-950`}
          rows={4}
        ></textarea>
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="flex justify-end space-x-4 pt-8">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-3 w-full text-sm text-gray-700 border-amber-950 border bg-gray-100  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 w-full py-3 text-sm text-white bg-amber-950  hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-950"
        >
          Save Task
        </button>
      </div>
    </form>
  );
}
