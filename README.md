

# Budget Buddy



**Budget Buddy** is a personal finance management web app designed to help users monitor, categorize, and manage income and expenses with privacy and ease. Organize your finances, set budgets, visualize spending, and stay informed with budget alerts—all on your device.

## Features

- **Multi-User Support:** Track finances separately for each individual.
- **Transaction Management:** Add, edit, delete income and expense entries.
- **Categorization:** Assign default or custom categories to transactions.
- **Budget Setting:** Set monthly spending limits per category (per user).
- **Dashboard Summary:** See total income, expenses, and balance at a glance.
- **Visual Reports:** Interactive charts of spending by category.
- **Budget Alerts:** Get notified when you exceed category budgets.
- **Advanced Filtering:** Filter transactions by type, category, date range.
- **Dark/Light Mode:** User-friendly UI for comfort any time of day.
- **Privacy First:** All data is stored locally in your browser (no cloud).
- **Responsive Design:** Works beautifully on desktop and mobile.

## Screenshots

![Budget Buddy Dashboard Screenshot](budget-buddy-dashboard-screenshot Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/budget-buddy.git
cd budget-buddy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Add new users (persons) and switch between them.
- Record income and expenses with amount, category, date, and description.
- Define monthly budgets for each category for each user.
- View dashboard summary, trends, and alerts.
- Filter and export your transaction history if needed.

## Tech Stack

- **Frontend:** React (Vite), CSS Variables for theming
- **Charts:** [Chart.js](https://www.chartjs.org/) via react-chartjs-2
- **State/Storage:** React Hooks and browser LocalStorage
- **Icons:** react-icons

## Folder Structure

```
src/
├── assets/
│   └── budget-buddy-logo.jpg
├── components/
│   ├── Dashboard.jsx
│   ├── Dashboard.css
│   └── ...
├── App.jsx
├── main.jsx
└── ...
```

## Color Palette

| Role               | Value       | Example                                                |
|--------------------|-------------|--------------------------------------------------------|
| --accent-primary   | #AB6A24     | Primary brown/gold (logo body)                         |
| --accent-secondary | #EFC350     | Light gold (logo coin)                                 |
| --bg-primary       | #FFF7EE     | App background                                         |
| --bg-secondary     | #FEF3DE     | Panel/card backgrounds                                 |
| --text-primary     | #543019     | Headings/text, deep brown                              |
| --text-secondary   | #94723A     | Secondary text, warm brown                             |
| --border-color     | #AB6A24     | Accent border                                          |
| --shadow-color     | rgba(171,106,36,0.13) | Drop shadows                        |
| --positive-green   | #28a745     | Success/positive highlighting                          |
| --negative-red     | #dc3545     | Alert/error coloring                                   |

*(See the `/assets/budget_buddy_color_palette.png` for a visual reference.)*

## Security & Privacy

- All data is stored in your browser using localStorage.
- No data is sent to any server or outside source.
- Deleting users/data is confirmed before the action is applied.

## Roadmap

- [ ] Data/export import
- [ ] Recurring transactions
- [ ] Custom categories
- [ ] Mobile app version

## Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change or add.

## License

[MIT License](LICENSE)

## Credits

- Logo designed using logo-makr.com and modified for open use.
- Powered by React, Chart.js, and open source.


