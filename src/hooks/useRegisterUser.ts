import { useMutation } from "@tanstack/react-query";
import { addNewUserFetchOptions } from "../utils/fetchOptions"; // Assuming you have some predefined fetch options

// Replace with your actual API endpoint
const addDataToDatabase = async (data: User) => {
  const response = await fetch(
    "https://entertainment-web-app-dc4b1-default-rtdb.firebaseio.com/user.json",
    {
      ...addNewUserFetchOptions,
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send data");
  }
};

const useRegisterUser = () => {
  return useMutation({
    mutationFn: addDataToDatabase,
  });
};

export default useRegisterUser;
