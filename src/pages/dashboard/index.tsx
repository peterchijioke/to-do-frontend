import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TaskModal from "../../_components/TaskModal";

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);

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
      <div className=" w-full"></div>

      {/* <TaskModal
        isOpen={false}
        closeModal={function (): void {
          throw new Error("Function not implemented.");
        }}
      /> */}
    </>
  );
}

export default TaskDashboard;
