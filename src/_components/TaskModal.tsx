import NewTaskForm from "./forms/NewTaskForm";
import { KeyedMutator } from "swr";

function TaskModal({
  isOpen,
  closeModal,
  mutate,
}: {
  isOpen: boolean;
  mutate: KeyedMutator<any>;
  closeModal: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-6">
      <div className="w-full max-w-md p-6 bg-white  shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Add New Task</h2>
        <NewTaskForm mutate={mutate} closeModal={closeModal} />
      </div>
    </div>
  );
}

export default TaskModal;
