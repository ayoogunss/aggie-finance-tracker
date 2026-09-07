"use client";

import { useState } from "react";
export default function Home() {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
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
            <p className="text-sm font-medium text-gray-500">
              Monthly Budget
            </p>
            <p className="mt-2 text-3xl font-bold">$1,200.00</p>
          </article>

          <article className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Expenses
            </p>
            <p className="mt-2 text-3xl font-bold">$735.50</p>
          </article>

          <article className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Remaining Balance
            </p>
            <p className="mt-2 text-3xl font-bold text-green-700">
              $464.50
            </p>
          </article>
        </div>

        <div className="mt-8 rounded-xl border-l-4 border-yellow-500 bg-yellow-50 p-5">
          <h3 className="font-bold text-yellow-800">Budget warning</h3>
          <p className="mt-1 text-yellow-700">
            You have used 61% of your monthly budget.
          </p>
        </div>

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
    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <p className="font-medium">Expense form will go here.</p>
    </div>
  )}

  <p className="mt-6 text-gray-500">
    Your recorded expenses will appear here.
  </p>
</section>
      </section>
    </main>
  );
}