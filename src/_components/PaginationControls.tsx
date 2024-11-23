import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-between  w-full items-center gap-5 mt-4 md:w-fit">
      <button
        className="bg-amber-950 text-white px-4 py-2 w-full md:w-24"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <div className="w-full md:w-fit flex items-center justify-center">
        <span className="text-sm text-amber-950">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <button
        className="bg-amber-950 text-white px-4 py-2 w-full md:w-24"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
