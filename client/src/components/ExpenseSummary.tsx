import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ExpenseSummary() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/expenses/summary",
      );
      return data;
    },
  });

  return (
    <div className="bg-indigo-50 p-6 rounded-lg mb-6 border border-indigo-200">
      <h2 className="text-lg font-bold text-indigo-900 mb-2">
        Category Summary
      </h2>
      <div className="flex gap-4">
        {data?.map((item: any) => (
          <div key={item.category} className="bg-white p-3 rounded shadow-sm">
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className="font-bold text-indigo-600">${item.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
