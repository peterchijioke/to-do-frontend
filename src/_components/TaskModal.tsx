import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";

function TaskModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post("/api/tasks", { title, description });
      closeModal();
    } catch (error) {
      alert("Failed to add task");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">Save Task</button>
        <button onClick={closeModal}>Cancel</button>
      </form>
    </Modal>
  );
}

export default TaskModal;
