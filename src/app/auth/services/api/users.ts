import axios from "axios";

export const fetchUsers = async (id: number) => {
  return await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
};

export const registerUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
};
