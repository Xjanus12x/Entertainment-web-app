import { useSearchParams } from "react-router-dom";

const useSearchParamsObject = () => {
  const [searchParams] = useSearchParams();

  // Convert URLSearchParams to a plain object
  const paramsObject = Object.fromEntries(searchParams.entries());

  return paramsObject;
};

export default useSearchParamsObject;