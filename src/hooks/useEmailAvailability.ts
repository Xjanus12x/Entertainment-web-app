import { useQuery } from "@tanstack/react-query";
import { getUsersFetchOptions } from "../utils/fetchOptions";

const fetchedEmails = async (userInput: string) => {
  const response = await fetch(
    "https://entertainment-web-app-dc4b1-default-rtdb.firebaseio.com/user.json",
    getUsersFetchOptions
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();

  // Check if there's no data in the database
  if (!data) return false;

  // Convert the object returned by Firebase into an array
  const usersArray = Object.values(data) as User[];

  // Check if the email exists in the database
  return usersArray.some(({ email }) => email === userInput);
};

const useEmailAvailability = (userInput: string) => {
  const { data: isEmailExist } = useQuery({
    queryFn: () => fetchedEmails(userInput),
    queryKey: ["emailAvailability", userInput],
    enabled: !!userInput,
  });
  return { isEmailExist };
};

export default useEmailAvailability;
