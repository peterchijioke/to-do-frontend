import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Task, Tasks } from "../types/task.type";
import ViewTaskModal from "./ViewTaskModal";
import useSWR from "swr";
import { getApiService } from "../service/api.service";
import { Loader } from "lucide-react";

const TaskList: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { data, isLoading } = useSWR("/task", getApiService);
  const tasks: Tasks = data?.data ?? [];

  const handleEdit = (task: Task) => {
    alert(`Editing task: ${task.title}`);
  };

  const handleDelete = (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
    }
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
                  onDelete={handleDelete}
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
