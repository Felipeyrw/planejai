# Planejai

<<<<<<< HEAD
## What it is

Planejai is a responsive website developed during the Santander Front-End Bootcamp (React + AI) by DIO. The application organizes your goals and, with the help of AI, simulates a plan to achieve your target objectives within your timeframe.

## Tech Stack
=======
## Portuguese version

See [README.pt-BR.md](./README.pt-BR.md) for the Brazilian Portuguese version.

Planejai is a responsive financial planning application that turns life goals into practical, data-driven plans. Users can enter their monthly income, fixed expenses, debts, and target goal, then receive AI-generated insights on whether the goal is viable and how to reach it within the desired timeline.
>>>>>>> f61622f (Fix(README): it was not very well specified and doesnt had english version)

## Why this project exists

The app helps people organize financial priorities, understand spare capacity, and simulate realistic strategies to achieve goals such as travel, emergency savings, or major purchases without losing sight of monthly commitments.

## Screenshots

<<<<<<< HEAD
The header contains 3 main features: New Simulation, Simulation History, and Theme Switcher (toggle between light and dark mode).

### 2. New Simulation

On this page, you input 6 key data points:

1. Gross monthly income
2. Fixed living expenses
3. Debts/installments
4. Goal name
5. Goal cost
6. Target deadline/timeframe

Upon completion, you are redirected to the simulation results page.

### 3. Simulation Results

Here you receive insights based on the data submitted in the previous step.
The main feature is a dedicated card containing AI-generated expert recommendations to help you reach your goals on time.

### 4. History

This final screen displays all recorded data for the user, providing an overall overview along with options to delete entries or view the detailed results of any past simulation.
=======
### New simulation

![New simulation form](./assets/planejai_new_sim.png)

### Simulation results

![Simulation insights](./assets/planejai_sim.png)

### History

![Simulation history](./assets/planejai_history.png)

## Main features

- Goal-based financial simulation
- Monthly income, fixed expenses, and debts input
- Goal amount and deadline tracking
- Personalized AI analysis powered by Gemini
- Simulation history saved in localStorage
- Light/dark mode toggle
- Responsive interface for desktop and mobile

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- LocalStorage
- Gemini API

## Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure the Gemini API key

Create a `.env.local` file in the project root and add:

```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

Then start the app:

```bash
npm run dev
```

Open the local URL shown by Vite to use the app.

## Important note about the API key

Because variables prefixed with `VITE_` are exposed to the browser, this setup is intended for local development and demos. In production, the Gemini API calls should be proxied through a backend so the key remains secret on the server.

## How the app works

1. The user fills out a short financial profile:
   - monthly gross income
   - fixed living costs
   - debts/instalments
   - goal name
   - goal amount
   - target timeline
2. The app calculates savings capacity and feasibility.
3. It sends the data to Gemini to generate insights, suggestions, and motivation.
4. The result is saved to history for future review.

## Project structure

```text
planejai/
├── assets/                 # Screenshots and visual assets
├── public/                # Static assets
├── src/
│   ├── components/        # UI components
│   ├── data/              # Forms and simulation data
│   ├── hooks/             # State and storage hooks
│   ├── pages/             # App pages
│   ├── services/          # AI integrations
│   ├── utils/             # Financial helpers
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── eslint.config.js
└── README.md
```

## Available scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## License

This project is currently distributed for learning and study purposes.
>>>>>>> f61622f (Fix(README): it was not very well specified and doesnt had english version)
