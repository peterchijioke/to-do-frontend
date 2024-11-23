import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  NewTaskFormValues,
  newTaskSchema,
} from "../../validation/task.validation";
import useSWRMutation from "swr/mutation";
import { patchApiService, postApiService } from "../../service/api.service";
import { KeyedMutator } from "swr";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import useTaskStore from "../../providers/task.provider";

type Props = {
  closeModal: () => void;
  mutate: KeyedMutator<any>;
};

export default function NewTaskForm({ closeModal, mutate }: Props) {
  const { editableTask, setEditableTask } = useTaskStore();
  const { trigger, isMutating } = useSWRMutation(
    editableTask ? `/task/${editableTask?.uuid}` : "",
    postApiService
  );
  const { trigger: editHandler, isMutating: isEditing } = useSWRMutation(
    "/task",
    patchApiService
  );

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTaskFormValues>({
    resolver: zodResolver(newTaskSchema),
  });

  const onSubmit: SubmitHandler<NewTaskFormValues> = async (data) => {
    console.log("Form Data:", data);
    try {
      if (editableTask) {
        const response = await editHandler(data);
        if (response.status && response?.data) {
          mutate();
        } else {
          toast.error(response?.message ?? "Error: Occurred, please try again");
        }
      } else {
        const response = await trigger(data);
        if (response.status && response?.data) {
          mutate();
        } else {
          toast.error(response?.message ?? "Error: Occurred, please try again");
        }
      }
    } catch (error) {
      console.log("NewTaskFormValues error", error);
    } finally {
      setEditableTask(null);
      reset();
      closeModal();
    }
  };

  // useEffect(() => {
  //   if (editableTask) {
  //     setValue("description", editableTask?.description);
  //     setValue("dueDate", new Date(editableTask?.dueDate));
  //     setValue("title", editableTask?.title);
  //   }
  // }, []);

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
        <label htmlFor="title" className="text-sm font-black text-amber-950">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          {...register("dueDate", {
            setValueAs: (v) => (v ? new Date(v) : undefined),
          })}
          className={`w-full px-3 py-2 border ${
            errors.dueDate ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none text-amber-950 bg-white focus:ring-1 focus:ring-amber-950 focus:border-amber-950`}
        />
        {errors.dueDate && (
          <p className="mt-1 text-sm text-red-500">{errors.dueDate.message}</p>
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
          disabled={isMutating || isEditing}
          type="submit"
          className="px-4 w-full py-3 text-sm text-white bg-amber-950  hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-950"
        >
          {isMutating || isEditing ? (
            <Loader className=" animate-spin size-3 text-white" />
          ) : (
            "Save Task"
          )}
        </button>
      </div>
    </form>
  );
}
