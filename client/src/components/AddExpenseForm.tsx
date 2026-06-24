import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function AddExpenseForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    expense_date: "",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/expenses", formData);
      // This tells TanStack Query to refresh the list automatically
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      setFormData({ amount: "", category: "", expense_date: "", note: "" });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Amount"
          required
          className="border p-2 rounded w-full"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          required
          className="border p-2 rounded w-full"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
        <input
          type="date"
          required
          className="border p-2 rounded w-full"
          value={formData.expense_date}
          onChange={(e) =>
            setFormData({ ...formData, expense_date: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Note (optional)"
          className="border p-2 rounded w-full"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
      >
        Add Expense
      </button>
    </form>
  );
}
