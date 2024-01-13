import axios from "axios";

export const fetchUsers = async (id: number) => {
  return await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
};
