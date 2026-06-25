# 💳 Premium Personal Expense Tracker

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)

A stunning, production-ready **Personal Expense Tracker** built with React and Vite. It features a modern **glassmorphic** design, seamless micro-animations, and a fully functional local database system. 

Keep track of your spending habits effortlessly without worrying about privacy, as all your data is securely stored directly in your browser!

---

## ✨ Features

- **Modern Glassmorphic UI**: Beautiful translucent cards, smooth gradients, and micro-animations that deliver a premium native-app feel.
- **Interactive Dashboard**: A dedicated home page featuring an elegant infinite-scroll arrow navigation to view total spends and category breakdowns for any month in history.
- **Smart Filtering & Sorting**: Easily search your expenses by title, filter by 13+ distinct categories (from Food and Housing to Investments), or narrow down by specific date ranges.
- **Full CRUD Functionality**: Seamlessly add, edit, view, and safely delete your expenses with custom-designed glassmorphic warning modals.
- **Dark & Light Mode**: Built-in, fully integrated theme toggling that remembers your preference and adjusts perfectly across all UI elements.
- **Privacy First (Local Storage)**: No databases, no signups, no cloud syncing. Everything is saved directly and instantly into your browser's Local Storage.

---

## 🛠️ Technology Stack

- **Framework**: [React.js](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: `react-router-dom`
- **Styling**: 100% Vanilla CSS (Custom CSS Variables, Flexbox/Grid, Keyframe Animations)
- **Database**: Browser `localStorage` (via custom utility hooks)

---

## 🚀 How to Run Locally

Want to try it out on your own system? It's incredibly simple to set up! 

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation Steps

1. **Clone the repository** (or download the source code zip):
   ```bash
   git clone https://github.com/harinandanmv/raify-demo-project.git
   cd riafy-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Open your browser and navigate to the local URL provided in your terminal (usually `http://localhost:5173/`).

---

## 💡 Usage Guide

- **Adding an Expense**: Navigate to the "Add Expense" tab, fill out the required fields (Title, Amount, Date), select a category, and hit Add.
- **Viewing History**: Check the **Dashboard** for a visual breakdown of your current month. Use the `<` and `>` arrows to browse past months.
- **Managing Data**: Head over to the **Expenses** tab to view your complete, unfiltered history. Click the pencil icon to edit, or the X icon to securely delete a record.
- **Resetting Data**: If you ever want to completely wipe your data and start fresh, simply open your browser's Developer Tools (F12) -> Application -> Local Storage, and clear the data for `localhost`.

---

*Designed and crafted with a focus on UI/UX excellence.*
