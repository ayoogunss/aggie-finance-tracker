# Aggie Finance Tracker

Aggie Finance Tracker is a full-stack budgeting application that helps students record expenses, manage monthly budgets, plan upcoming spending, and analyze their financial habits.

The application provides secure user accounts, private financial records, persistent PostgreSQL storage, and interactive spending analytics.

## Live Application

[Open Aggie Finance Tracker](https://aggie-finance-tracker2.vercel.app)

## Features

### Secure user accounts

- Email and password account creation
- Email confirmation through Supabase Auth
- Protected dashboard routes
- Secure sign-in and sign-out
- Private financial records for each user
- Row Level Security policies that prevent users from accessing another account's data

### Expense management

- Add expenses with a description, category, amount, and date
- Edit previously recorded expenses
- Delete expenses
- Automatically update totals after every change
- Preserve expense records across sessions using PostgreSQL

### Budget tracking

- Create and update a monthly budget
- Calculate total expenses automatically
- Display the current remaining balance
- Warn users when spending approaches or exceeds their budget
- Store a separate budget record for each month

### Upcoming spending

- Record planned expenses and future payment dates
- Calculate total planned spending
- Display a projected remaining balance
- Warn users when planned spending exceeds the available budget
- Delete planned expenses

### Financial analysis

- Group spending by category
- Display each category's percentage of total spending
- Compare spending across the latest six months
- Automatically update analytics when records are added, edited, or deleted

### Reliability

- Input validation for amounts, dates, categories, and descriptions
- Loading indicators while database records are retrieved
- User-friendly database error messages
- Empty dashboard states for new accounts
- Production linting and build validation

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Application framework and routing |
| React | Interactive user interface |
| TypeScript | Type-safe application logic |
| Tailwind CSS | Responsive styling |
| Supabase Auth | Account creation and authentication |
| PostgreSQL | Persistent financial-record storage |
| Supabase Row Level Security | User-level data protection |
| Vercel | Production deployment and hosting |
| Git and GitHub | Version control and source-code hosting |

## Application Architecture

The Next.js client communicates with Supabase for authentication and database operations.

Each expense, planned expense, and monthly budget is connected to the authenticated user's unique ID. PostgreSQL Row Level Security policies ensure that users can only select, insert, update, or delete their own records.

Protected routes verify the user's session before allowing access to the financial dashboard.

## Database Structure

The application uses three primary PostgreSQL tables:

### `expenses`

Stores completed financial transactions.

| Column | Description |
|---|---|
| `id` | Unique expense identifier |
| `user_id` | Owner of the expense |
| `description` | Expense description |
| `category` | Spending category |
| `amount` | Expense amount |
| `expense_date` | Date of the expense |
| `created_at` | Record creation time |

### `budgets`

Stores each user's monthly budget.

| Column | Description |
|---|---|
| `id` | Unique budget identifier |
| `user_id` | Owner of the budget |
| `budget_month` | Month associated with the budget |
| `amount` | Monthly budget amount |
| `created_at` | Record creation time |
| `updated_at` | Most recent update time |

### `planned_expenses`

Stores upcoming spending.

| Column | Description |
|---|---|
| `id` | Unique planned-expense identifier |
| `user_id` | Owner of the record |
| `description` | Planned purchase or payment |
| `amount` | Expected amount |
| `planned_date` | Expected payment date |
| `created_at` | Record creation time |

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/ayoogunss/aggie-finance-tracker.git
cd aggie-finance-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a file named `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Do not commit `.env.local`, database passwords, secret keys, or service-role keys.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation Commands

Run the linter:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Both commands should pass before production changes are deployed.

## Future Improvements

- Password-reset workflow
- Recurring expenses
- CSV financial-data export
- Custom spending categories
- Automated unit and end-to-end tests
- Additional accessibility improvements

## Author

**Ayo Ogundiminegha**

- [GitHub](https://github.com/ayoogunss)
- [LinkedIn](https://linkedin.com/in/ayo-oguns)