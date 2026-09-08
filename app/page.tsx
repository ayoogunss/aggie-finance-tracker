"use client";

import { useState, type FormEvent } from "react";

type Expense = {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
};

type PlannedExpense = {
  id: number;
  description: string;
  amount: number;
  date: string;
};

export default function Home() {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [monthlyBudget, setMonthlyBudget] = useState(1200);
  const [showBudgetForm, setShowBudgetForm] = useState(false);

  const [plannedExpenses, setPlannedExpenses] = useState<PlannedExpense[]>([]);

  function handleAddExpense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newExpense: Expense = {
      id: Date.now(),
      description: String(formData.get("description")),
      amount: Number(formData.get("amount")),
      category: String(formData.get("category")),
      date: String(formData.get("date")),
    };

    event.currentTarget.reset();
    setExpenses((currentExpenses) => [
      newExpense,
      ...currentExpenses,
    ]);
    setShowExpenseForm(false);
  }

  function handleBudgetSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const updatedBudget = Number(formData.get("budget"));

  if (updatedBudget <= 0) {
    return;
  }

  setMonthlyBudget(updatedBudget);
  setShowBudgetForm(false);
}

function deleteExpense(expenseId: number) {
  setExpenses((currentExpenses) =>
    currentExpenses.filter(
      (expense) => expense.id !== expenseId
    )
  );
}

function handleAddPlannedExpense(
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const newPlannedExpense: PlannedExpense = {
    id: Date.now(),
    description: String(
      formData.get("plannedDescription")
    ),
    amount: Number(formData.get("plannedAmount")),
    date: String(formData.get("plannedDate")),
  };

  event.currentTarget.reset();

  setPlannedExpenses((currentExpenses) => [
    newPlannedExpense,
    ...currentExpenses,
  ]);
}

function deletePlannedExpense(expenseId: number) {
  setPlannedExpenses((currentExpenses) =>
    currentExpenses.filter(
      (expense) => expense.id !== expenseId
    )
  );
}

const totalExpenses = expenses.reduce(
  (total, expense) => total + expense.amount,
  0
);

const remainingBalance = monthlyBudget - totalExpenses;

const budgetUsedPercentage =
  monthlyBudget > 0
    ? (totalExpenses / monthlyBudget) * 100
    : 0;

const totalPlannedSpending = plannedExpenses.reduce(
  (total, expense) => total + expense.amount,
  0
);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-[#500000] px-6 py-5 text-white shadow-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-2xl font-bold">Aggie Finance Tracker</h1>

          <nav className="flex gap-6">
            <a href="#" className="hover:underline">
              Dashboard
            </a>
            <a href="#" className="hover:underline">
              Expenses
            </a>
            <a href="#" className="hover:underline">
              Budgets
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Financial Dashboard</h2>
          <p className="mt-2 text-gray-600">
            Track your expenses, budgets, and upcoming spending.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-xl bg-white p-6 shadow-sm">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">
        Monthly Budget
      </p>

      <p className="mt-2 text-3xl font-bold">
        ${monthlyBudget.toFixed(2)}
      </p>
    </div>

    <button
      type="button"
      onClick={() =>
        setShowBudgetForm((currentValue) => !currentValue)
      }
      className="cursor-pointer text-sm font-medium text-[#500000] hover:underline"
    >
      {showBudgetForm ? "Cancel" : "Edit"}
    </button>
  </div>

  {showBudgetForm && (
    <form onSubmit={handleBudgetSubmit} className="mt-4">
      <label htmlFor="budget" className="mb-2 block text-sm font-medium">
        New monthly limit
      </label>

      <div className="flex gap-2">
        <input
          id="budget"
          name="budget"
          type="number"
          min="0.01"
          step="0.01"
          defaultValue={monthlyBudget}
          required
          className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2"
        />

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-[#500000] px-4 py-2 text-white hover:bg-[#700000]"
        >
          Save
        </button>
      </div>
    </form>
  )}
</article>

          <article className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Expenses
            </p>
            <p className="mt-2 text-3xl font-bold">
  ${totalExpenses.toFixed(2)}
</p>
          </article>

          <article className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Remaining Balance
            </p>
            <p
  className={`mt-2 text-3xl font-bold ${
    remainingBalance < 0 ? "text-red-700" : "text-green-700"
  }`}
>
  ${remainingBalance.toFixed(2)}
</p>
          </article>
        </div>

        {budgetUsedPercentage >= 80 && (
  <div className="mt-8 rounded-xl border-l-4 border-yellow-500 bg-yellow-50 p-5">
    <h3 className="font-bold text-yellow-800">
      {budgetUsedPercentage >= 100
        ? "Budget exceeded"
        : "Budget warning"}
    </h3>

    <p className="mt-1 text-yellow-700">
      {budgetUsedPercentage >= 100
        ? `You are $${Math.abs(remainingBalance).toFixed(2)} over your monthly budget.`
        : `You have used ${Math.round(
            budgetUsedPercentage
          )}% of your monthly budget.`}
    </p>
  </div>
)}

        <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
  <div className="flex items-center justify-between">
    <h3 className="text-xl font-bold">Recent Expenses</h3>

    <button
  type="button"
  onClick={() => {
    setShowExpenseForm((currentValue) => !currentValue);
  }}
  className="cursor-pointer rounded-lg bg-[#500000] px-4 py-2 font-medium text-white hover:bg-[#700000]"
>
  {showExpenseForm ? "Cancel" : "Add Expense"}
</button>
  </div>

  {showExpenseForm && (
  <form
    onSubmit={handleAddExpense}
    className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-5"
  >
    <div className="grid gap-5 md:grid-cols-2">
      <div>
        <label
          htmlFor="description"
          className="mb-2 block font-medium"
        >
          Description
        </label>

        <input
          id="description"
          name="description"
          type="text"
          placeholder="Example: Groceries"
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="amount"
          className="mb-2 block font-medium"
        >
          Amount
        </label>

        <input
          id="amount"
          name="amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="0.00"
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-2 block font-medium"
        >
          Category
        </label>

        <select
          id="category"
          name="category"
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        >
          <option value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="School">School</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="date"
          className="mb-2 block font-medium"
        >
          Date
        </label>

        <input
          id="date"
          name="date"
          type="date"
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
        />
      </div>
    </div>

    <button
      type="submit"
      className="mt-5 cursor-pointer rounded-lg bg-[#500000] px-5 py-2 font-medium text-white hover:bg-[#700000]"
    >
      Save Expense
    </button>
  </form>
)}

  {expenses.length === 0 ? (
  <p className="mt-6 text-gray-500">
    Your recorded expenses will appear here.
  </p>
) : (
  <div className="mt-6 overflow-x-auto">
    <table className="w-full text-left">
      <thead className="border-b border-gray-200">
        <tr>
          <th className="px-3 py-3">Description</th>
          <th className="px-3 py-3">Category</th>
          <th className="px-3 py-3">Date</th>
          <th className="px-3 py-3 text-right">Amount</th>
          <th className="px-3 py-3 text-right">Actions</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id} className="border-b border-gray-100">
            <td className="px-3 py-3">{expense.description}</td>
            <td className="px-3 py-3">{expense.category}</td>
            <td className="px-3 py-3">{expense.date}</td>
            <td className="px-3 py-3 text-right font-medium">
              ${expense.amount.toFixed(2)}
            </td>
            <td className="px-3 py-3 text-right">
  <button
    type="button"
    onClick={() => deleteExpense(expense.id)}
    className="cursor-pointer font-medium text-red-700 hover:underline"
  >
    Delete
  </button>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
</section>
<section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
  <div className="flex flex-wrap items-center justify-between gap-3">
    <div>
      <h3 className="text-xl font-bold">Upcoming Spending</h3>
      <p className="mt-1 text-gray-500">
        Planned total: ${totalPlannedSpending.toFixed(2)}
      </p>
    </div>
  </div>

  <form
    onSubmit={handleAddPlannedExpense}
    className="mt-6 grid gap-4 md:grid-cols-4"
  >
    <div>
      <label
        htmlFor="plannedDescription"
        className="mb-2 block font-medium"
      >
        Description
      </label>

      <input
        id="plannedDescription"
        name="plannedDescription"
        type="text"
        placeholder="Example: Textbooks"
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2"
      />
    </div>

    <div>
      <label
        htmlFor="plannedAmount"
        className="mb-2 block font-medium"
      >
        Expected amount
      </label>

      <input
        id="plannedAmount"
        name="plannedAmount"
        type="number"
        min="0.01"
        step="0.01"
        placeholder="0.00"
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2"
      />
    </div>

    <div>
      <label
        htmlFor="plannedDate"
        className="mb-2 block font-medium"
      >
        Expected date
      </label>

      <input
        id="plannedDate"
        name="plannedDate"
        type="date"
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2"
      />
    </div>

    <div className="flex items-end">
      <button
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-[#500000] px-4 py-2 text-white hover:bg-[#700000]"
      >
        Add Planned Expense
      </button>
    </div>
  </form>

  {plannedExpenses.length === 0 ? (
    <p className="mt-6 text-gray-500">
      No upcoming spending has been planned.
    </p>
  ) : (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full text-left">
        <thead className="border-b border-gray-200">
          <tr>
            <th className="px-3 py-3">Description</th>
            <th className="px-3 py-3">Expected Date</th>
            <th className="px-3 py-3 text-right">Amount</th>
            <th className="px-3 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {plannedExpenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-b border-gray-100"
            >
              <td className="px-3 py-3">
                {expense.description}
              </td>
              <td className="px-3 py-3">{expense.date}</td>
              <td className="px-3 py-3 text-right">
                ${expense.amount.toFixed(2)}
              </td>
              <td className="px-3 py-3 text-right">
                <button
                  type="button"
                  onClick={() =>
                    deletePlannedExpense(expense.id)
                  }
                  className="cursor-pointer font-medium text-red-700 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</section>
      </section>
    </main>
  );
}