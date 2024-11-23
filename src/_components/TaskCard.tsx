import React, { useState } from "react";
import { Task, TaskStatus } from "../types/task.type";
import { deleteApiService } from "../service/api.service";
import toast from "react-hot-toast";
import { KeyedMutator } from "swr";
import { Loader } from "lucide-react";

type TaskCardProps = {
  task: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  mutate: KeyedMutator<any>;
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onView,
  onEdit,
  mutate,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const onDelete = async (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setDeleteLoading(true);
      try {
        const response = await deleteApiService(`/task/${taskId}`);
        if (response?.status) {
          toast.success(response.message ?? "Task deleted successfully", {
            position: "top-right",
          });
          mutate();
        } else {
          toast.error(response.message ?? "Error occurred", {
            position: "top-right",
          });
        }
      } catch (error) {
      } finally {
        setDeleteLoading(false);
      }
    }
  };
  return (
    <div className="border h-full bg-white border-gray-300 rounded-lg shadow-sm p-4 space-y-2">
      <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
      <p className="text-sm text-gray-600 truncate max-w-xl">
        {task.description}
        recently with desktop
      </p>
      <p
        className={`text-sm font-medium ${
          task.status === TaskStatus.Completed
            ? "text-green-600"
            : task.status === TaskStatus.InProgress
            ? "text-blue-600"
            : "text-yellow-600"
        }`}
      >
        Status: {task.status}
      </p>
      <div className="text-sm text-gray-500">
        Created At: {new Date(task.createdAt).toLocaleString()}
      </div>
      <div className="flex justify-end space-x-2 py-3 w-full">
        <button
          onClick={() => onView(task)}
          className="px-3 w-full md:w-28 py-1 text-sm text-white bg-amber-950   focus:outline-none focus:ring-2 focus:ring-amber-950"
        >
          View
        </button>
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-3 w-full md:w-28 text-sm text-white bg-amber-500  hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300"
        >
          Edit
        </button>
        <button
          disabled={deleteLoading}
          onClick={() => onDelete(task.uuid)}
          className="px-3 w-full md:w-28 py-3 text-sm text-white bg-red-500  hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          {deleteLoading ? (
            <Loader className=" size-3 text-white animate-spin" />
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
