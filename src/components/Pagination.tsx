import { Button } from "./ui/button";

interface PaginationProps {
  currentPage: number;
  onPageChange: (direction: -1 | 1) => void;
  isLoading: boolean;
  hasMorePages: boolean;
}

export default function Pagination({ currentPage, onPageChange, isLoading, hasMorePages }: PaginationProps) {
  return (
    <div className="mt-8 flex justify-center items-center gap-3">
      <Button onClick={() => onPageChange(-1)} disabled={currentPage === 1 || isLoading}>
        前へ
      </Button>
      <span className="border-gray-300 border rounded-sm px-4 py-2 text-sm">{currentPage}</span>
      <Button onClick={() => onPageChange(1)} disabled={!hasMorePages || isLoading}>
        次へ
      </Button>
    </div>
  );
}
