import { useState } from "react";
import TaskModal from "../../_components/TaskModal";
import TaskList from "../../_components/TaskList";
import useSWR from "swr";
import { getApiService } from "../../service/api.service";
import useTaskStore from "../../providers/task.provider";
function TaskDashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { data: tasks, isLoading, mutate } = useSWR("/task", getApiService);
  const { editableTask } = { editableTask: null };

  return (
    <>
      <div className=" flex self-center w-full container h-screen md:px-0 px-6 justify-center pt-24">
        <div className=" container">
          <div className=" flex items-center justify-between">
            <h1 className=" text-amber-950 text-2xl font-bold">Dashboard</h1>
            <button
              onClick={() => {
                setModalIsOpen(!modalIsOpen);
              }}
              className=" bg-amber-950 px-4 h-12 text-white hover:bg-amber-900"
            >
              Add New Task
            </button>
          </div>
          <TaskList data={tasks?.data ?? []} isLoading={isLoading} />
        </div>
      </div>

      <TaskModal
        mutate={mutate}
        isOpen={modalIsOpen || Boolean(editableTask)}
        closeModal={function (): void {
          setModalIsOpen(!modalIsOpen);
        }}
      />
    </>
  );
}

export default TaskDashboard;
