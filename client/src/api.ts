import axios from "axios";

export const fetchExpenses = async (filters: {
  category?: string;
  from?: string;
  to?: string;
}) => {
  const { data } = await axios.get("http://localhost:5000/api/expenses", {
    params: filters,
  });
  return data;
};
