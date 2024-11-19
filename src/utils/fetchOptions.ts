// Common fetch options
export const defaultFetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
  },
};

export const addNewUserFetchOptions = {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
};

export const getUsersFetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};
