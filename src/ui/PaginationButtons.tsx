import { useSearchParams } from "react-router-dom";
import useSearchParamsObject from "../hooks/useSearchParamsObject";
type PaginationButtonsProps = {
  totalPages?: number;
};
const PaginationButtons = ({ totalPages }: PaginationButtonsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1"; // Get page from URL or default to 1
  const query = searchParams.get("query") ?? "";
  const name = searchParams.get("name") ?? "";
  const searchParamsObject = useSearchParamsObject();

  const handlePageChange = (newPage: number) => {
    if (query || name) {
      setSearchParams({ ...searchParamsObject, page: newPage.toString() });
    } else {
      setSearchParams({ page: newPage.toString() });
    }
  };
  return (
    <div className="flex mx-auto mt-5 font-bold border-2 border-crispWhite max-w-max">
      <button
        className="p-4 text-crispWhite hover:bg-crispWhite hover:text-deepNavy focus-visible:bg-crispWhite focus-visible:text-deepNavy"
        onClick={() => handlePageChange(Math.max(parseInt(page) - 1))}
        disabled={page === "1"}
      >
        Prev
      </button>
      <div className="p-4 bg-crispWhite text-deepNavy">
        Page {page} of {totalPages}
      </div>

      <button
        className="p-4 text-crispWhite hover:bg-crispWhite hover:text-deepNavy focus-visible:bg-crispWhite focus-visible:text-deepNavy"
        onClick={() => handlePageChange(parseInt(page) + 1)}
        disabled={page === `${totalPages}`}
      >
        Next
      </button>
    </div>
  );
};
export default PaginationButtons;
