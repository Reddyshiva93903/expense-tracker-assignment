import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { fetchExpenses } from "./api";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseSummary from "./components/ExpenseSummary";

function App() {
  const queryClient = useQueryClient();
  // State for filters
  const [filters, setFilters] = useState({ category: "", from: "", to: "" });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["expenses", filters],
    queryFn: () => fetchExpenses(filters),
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Expense Tracker</h1>
      <ExpenseSummary />
      <AddExpenseForm />

      {/* Filter UI */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex gap-4">
        <input
          placeholder="Filter by Category"
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, from: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, to: e.target.value })}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Recent Expenses
        </h2>

        {/* Loading, Error, and Empty States */}
        {isLoading ? (
          <p className="p-4 text-center text-gray-500">Loading expenses...</p>
        ) : isError ? (
          <p className="p-4 text-center text-red-500">
            Error loading expenses. Please try again.
          </p>
        ) : data?.length === 0 ? (
          <p className="p-4 text-center text-gray-500">
            No expenses found. Add your first one!
          </p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {data?.map((expense: any) => (
              <li
                key={expense.id}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {expense.category}
                  </p>
                  <p className="text-sm text-gray-500">{expense.note}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-indigo-600">
                    ${expense.amount}
                  </span>
                  <button
                    onClick={async () => {
                      await axios.delete(
                        `http://localhost:5000/api/expenses/${expense.id}`,
                      );
                      queryClient.invalidateQueries({ queryKey: ["expenses"] });
                      queryClient.invalidateQueries({ queryKey: ["summary"] });
                    }}
                    className="text-red-500 hover:text-red-700 font-semibold text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
