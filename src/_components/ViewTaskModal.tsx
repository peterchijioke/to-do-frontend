import React from "react";
import { Task } from "../types/task.type";
import { KeyedMutator } from "swr";
import useSWRMutation from "swr/mutation";
import { patchApiService } from "../service/api.service";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

type TaskModalProps = {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  mutate: KeyedMutator<any>;
};
enum TaskStatus {
  Pending = "Pending",
  InProgress = "In Progress",
  Completed = "Completed",
}
const ViewTaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  task,
  onClose,
  mutate,
}) => {
  const { trigger: editHandler, isMutating: isEditing } = useSWRMutation(
    `/task/${task?.uuid}`,
    patchApiService
  );

  const onToggleComplete = async () => {
    try {
      if (!task) {
        return;
      }
      const response = await editHandler({
        status:
          task.status === TaskStatus.Completed
            ? TaskStatus.Pending
            : TaskStatus.Completed,
      });
      if (response.status && response?.data) {
        mutate();
      } else {
        toast.error(response?.message ?? "Error: Occurred, please try again");
      }
    } catch (error) {
      console.log(
        "========onToggleComplete Error============================",
        error
      );
    } finally {
      onClose();
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-md shadow-md p-6 max-h-[28rem] w-[40rem]">
        <h2 className="text-lg font-medium text-gray-800 mb-2">{task.title}</h2>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Description:</strong> {task.description}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Status:</strong> {task.status}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Created At:</strong>{" "}
          {new Date(task.createdAt).toLocaleString()}
        </p>
        <button
          onClick={onToggleComplete}
          className={`mt-4 w-full px-4 py-2 text-sm  focus:outline-none ${
            task.status === "Completed"
              ? "bg-gray-400 text-white hover:bg-gray-500"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {isEditing ? (
            <Loader className=" animate-spin size-3" />
          ) : (
            <>
              {task.status === TaskStatus.Completed
                ? "Mark as Pending"
                : "Mark as Completed"}
            </>
          )}
        </button>
        <button
          onClick={onClose}
          className="mt-4  w-full px-4 py-3 text-sm text-white bg-amber-950 hover:bg-amber-900 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewTaskModal;
