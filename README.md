# 🗓️ Wall Calendar

A professional, interactive, and modern wall calendar application built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Designed to help you organize your months, track ranges, and maintain both daily and monthly notes with ease.

## ✨ Features

- **Interactive Grid**: A fully responsive calendar grid that adjusts to the current month.
- **Range Selection**: Click any two dates to select a "Start" and "End" range—perfect for tracking vacations, projects, or periods.
- **Daily Notes**: Double-click any date to open a modal and save personal notes specific to that day.
- **Monthly Overview**: A dedicated sidebar for general notes and memos for the entire month.
- **Data Persistence**: Uses `localStorage` to ensure your notes and plans stay saved across browser sessions.
- **Smart Navigation**: Easily toggle between months or jump back to "Today" with a single click.
- **Aesthetic Design**: A warm, professional "paper-and-wood" themed UI inspired by classic wall calendars.

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Hooks (`useState`, `useEffect`)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hunterrPN/Wall-calender.git
   cd wall-calender
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage

1. **Selecting a Range**: 
   - Click a start date.
   - Click an end date. The range will be highlighted automatically.
   - Click 'Clear Range' to reset.
2. **Adding Day Notes**:
   - Double-click any date cell.
   - Type your note in the modal and hit 'Save'.
   - Days with notes will display a 📝 icon.
3. **Monthly Notes**:
   - Use the right-hand panel to jot down monthly goals or reminders.
   - Click 'Save Monthly Notes' to persist data.

## 🏗️ Project Structure

```text
├── app/
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main entry point
├── components/
│   └── WallCalender.tsx # Core Calendar Component
├── public/              # Static assets
└── tailwind.config.ts   # Tailwind configuration
```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
Developed with ❤️ by [hunterrPN](https://github.com/hunterrPN)
