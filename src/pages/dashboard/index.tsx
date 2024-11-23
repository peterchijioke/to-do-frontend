import { useEffect, useState } from "react";
import TaskModal from "../../_components/TaskModal";
import TaskList from "../../_components/TaskList";
import useSWR from "swr";
import { getApiService } from "../../service/api.service";
import useUserStore from "../../providers/user.provider";
import PaginationControls from "../../_components/PaginationControls";
function TaskDashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { setUser } = useUserStore();
  const { data: userData } = useSWR("/auth", getApiService);

  const [page, setPage] = useState({ page: 1, limit: 1 });

  const {
    data: tasks,
    isLoading,
    mutate,
  } = useSWR(`/task?page=${page.page}&limit=${page.limit}`, getApiService);
  const pagination = tasks?.pagination;

  const handlePageChange = (newPage: number) => {
    if (pagination && (newPage < 1 || newPage > pagination.totalPages)) {
      return;
    }
    setPage((prev) => ({ ...prev, page: newPage }));
  };

  useEffect(() => {
    if (userData?.data) {
      setUser(userData?.data);
    } else {
      setUser(null);
    }
  }, [userData?.data]);

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
          <TaskList
            mutate={mutate}
            openEditModal={() => {
              setModalIsOpen(!modalIsOpen);
            }}
            data={tasks?.data ?? []}
            isLoading={isLoading}
          />

          <div className="flex justify-end">
            {pagination && (
              <PaginationControls
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>

      <TaskModal
        mutate={mutate}
        isOpen={modalIsOpen}
        closeModal={function (): void {
          setModalIsOpen(!modalIsOpen);
        }}
      />
    </>
  );
}

export default TaskDashboard;
