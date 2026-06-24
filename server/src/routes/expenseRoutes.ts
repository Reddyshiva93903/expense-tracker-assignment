import { Router, Request, Response } from "express";
import pool from "../db.js";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<any> => {
  const { category, from, to } = req.query;
  let query = "SELECT * FROM expenses WHERE 1=1";
  const params: any[] = [];

  if (category) {
    query += " AND category = ?";
    params.push(category);
  }
  if (from) {
    query += " AND expense_date >= ?";
    params.push(from);
  }
  if (to) {
    query += " AND expense_date <= ?";
    params.push(to);
  }

  try {
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error: any) {
    console.error("❌ Database Error:", error.message);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/summary", async (req: Request, res: Response): Promise<any> => {
  try {
    const [rows] = await pool.query(
      "SELECT category, SUM(amount) as total FROM expenses GROUP BY category",
    );
    res.json(rows);
  } catch (error: any) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

router.post("/", async (req: Request, res: Response): Promise<any> => {
  const { amount, category, expense_date, note } = req.body;
  if (!amount || !category || !expense_date) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const [result] = await pool.query(
      "INSERT INTO expenses (amount, category, expense_date, note) VALUES (?, ?, ?, ?)",
      [amount, category, expense_date, note],
    );
    res
      .status(201)
      .json({ id: (result as any).insertId, message: "Expense added" });
  } catch (error: any) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM expenses WHERE id = ?", [
      id,
    ]);
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json({ message: "Expense deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

export default router;
