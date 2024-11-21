import { useEffect, useState } from "react";
import axios from "axios";
import TaskModal from "../../_components/TaskModal";
import TaskList from "../../_components/TaskList";

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(`/api/tasks?page=${page}`);
      setTasks(response.data.tasks);
      setTotalTasks(response.data.total);
    };

    fetchTasks();
  }, [page]);

  // const handleTaskToggle = async (taskId) => {
  //   await axios.patch(`/api/tasks/${taskId}/toggle`)
  //   setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task))
  // }

  // const handleDelete = async (taskId) => {
  //   await axios.delete(`/api/tasks/${taskId}`)
  //   setTasks(tasks.filter(task => task.id !== taskId))
  // }

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
          <TaskList />
        </div>
      </div>

      <TaskModal
        isOpen={modalIsOpen}
        closeModal={function (): void {
          setModalIsOpen(!modalIsOpen);
        }}
      />
    </>
  );
}

export default TaskDashboard;
