import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Task, Tasks } from "../types/task.type";
import ViewTaskModal from "./ViewTaskModal";
import { deleteApiService } from "../service/api.service";
import { Loader } from "lucide-react";
import useTaskStore from "../providers/task.provider";
import { KeyedMutator } from "swr";
import toast from "react-hot-toast";

interface Props {
  data: Tasks;
  isLoading: boolean;
  openEditModal: () => void;
  mutate: KeyedMutator<any>;
}
const TaskList: React.FC<Props> = ({
  data,
  isLoading,
  openEditModal,
  mutate,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { setEditableTask } = useTaskStore();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const tasks: Tasks = data;

  const handleEdit = (task: Task) => {
    setEditableTask(task);
    openEditModal();
  };

  const handleView = (task: Task) => {
    setSelectedTask(task);
    setModalIsOpen(true);
  };

  const handleToggleComplete = (taskId: string) => {};

  if (tasks.length === 0) {
    return (
      <div className="flex h-full items-center justify-center py-6">
        <span className=" text-2xl text-amber-950">No task found</span>
      </div>
    );
  }

  return (
    <>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 py-6">
        <>
          {isLoading ? (
            <div className=" flex justify-center items-center">
              <Loader className=" animate-spin size-8 text-amber-950" />
            </div>
          ) : (
            <>
              {tasks.map((task: Task) => (
                <TaskCard
                  key={task.uuid}
                  task={task}
                  onView={handleView}
                  onEdit={handleEdit}
                  mutate={mutate}
                />
              ))}
            </>
          )}
        </>
      </div>

      <ViewTaskModal
        onToggleComplete={handleToggleComplete}
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(!modalIsOpen);
        }}
        task={selectedTask}
      />
    </>
  );
};

export default TaskList;
