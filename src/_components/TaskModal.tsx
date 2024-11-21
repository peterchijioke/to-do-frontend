import { useState } from "react";
import axios from "axios";
import NewTaskForm from "./forms/NewTaskForm";

function TaskModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/tasks", { title, description });
      closeModal();
    } catch (error) {
      alert("Failed to add task");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-6">
      <div className="w-full max-w-md p-6 bg-white  shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Add New Task</h2>
        <NewTaskForm closeModal={closeModal} />
      </div>
    </div>
  );
}

export default TaskModal;
