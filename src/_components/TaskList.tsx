import React, { useState } from "react";
import TaskCard from "./TaskCard"; // Adjust the path
import { Task, Tasks } from "../types/task.type";
import { dummyTasks } from "../lib/dummyData";
import ViewTaskModal from "./ViewTaskModal";

const TaskList: React.FC = () => {
  const [tasks, _] = useState<Tasks>(dummyTasks);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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

  return (
    <>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 py-6">
        {tasks.map((task: Task) => (
          <TaskCard
            key={task.id}
            task={task}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
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
