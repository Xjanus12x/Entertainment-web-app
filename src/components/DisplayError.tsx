import GoBackButton from "../ui/GoBackButton";

type DisplayErrorProps = {
  error: Error;
  refetch: () => void;
};

const DisplayError = ({ error, refetch }: DisplayErrorProps) => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen space-y-4 text-center text-red-500">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p>{error.message || "Unable to fetch the data."}</p>
      <div className="space-x-2">
        <button
          onClick={refetch}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          aria-label="Retry fetching data"
          title="Retry fetching data"
        >
          Retry
        </button>
        <GoBackButton />
      </div>
    </section>
  );
};

export default DisplayError;
