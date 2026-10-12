# 🎯 LeetRandom

> **Stop choosing. Start solving.**  
> A full-stack web application designed to eliminate decision fatigue from your daily coding practice by serving randomized LeetCode challenges filtered by difficulty level.

---

## 🚀 Features

- **Difficulty Filtering**: Select between **Easy**, **Medium**, and **Hard** problems.
- **Random Problem Picker**: Instant one-click selection of a random LeetCode problem.
- **Direct LeetCode Integration**: Fetches real-time problem lists directly via LeetCode's public GraphQL API.
- **One-Click Solving**: Quick links directly to the problem page on LeetCode.
- **Clean & Responsive UI**: Minimalist, distraction-free modern interface built with React and Vite.
- **Decoupled Architecture**: Modular Express.js backend and React frontend.

---

## 🛠️ Tech Stack

### Frontend (`client/`)
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Responsive & Modern typography)
- **Linter**: ESLint

### Backend (`server/`)
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express 5](https://expressjs.com/)
- **Middleware**: [CORS](https://github.com/expressjs/cors)
- **Development Tool**: [Nodemon](https://nodemon.io/)
- **External Integration**: LeetCode GraphQL API (`problemsetQuestionListV2`)

---

## 📁 Project Structure

```text
leet-random/
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   ├── src/                # React source code (components, styles)
│   │   ├── App.jsx         # Main application component & state
│   │   ├── App.css         # Component styles
│   │   ├── main.jsx        # App entry point
│   │   └── index.css       # Global base styles
│   ├── index.html          # HTML entry point
│   ├── package.json        # Frontend dependencies & scripts
│   └── vite.config.js      # Vite configuration
│
├── server/                 # Backend Express application
│   ├── services/
│   │   └── leetcode.js     # LeetCode GraphQL fetch & filtering service
│   ├── app.js              # Express app, middleware, and route handlers
│   └── package.json        # Backend dependencies & scripts
│
├── .gitignore              # Git ignore rules for the root project
└── README.md               # Project documentation
```

---

## ⚡ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)

---

### Installation & Setup

1. **Clone the repository** (if not already local):
   ```bash
   git clone <repository-url>
   cd leet-random
   ```

2. **Set up the Server**:
   ```bash
   cd server
   npm install
   npm run dev
   ```
   The backend server will start at: [`http://localhost:5001`](http://localhost:5001)

3. **Set up the Client**:
   Open a new terminal tab/window:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   The frontend app will start at: [`http://localhost:5173`](http://localhost:5173)

4. **Start Practicing**:
   Open [`http://localhost:5173`](http://localhost:5173) in your browser, pick a difficulty, and click **"Pick a random question"**!

---

## 📡 API Endpoints

The backend runs on port `5001` by default and exposes the following endpoints:

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API status & welcome greeting | None |
| `GET` | `/api/health` | Service health check | None |
| `GET` | `/api/questions` | Returns a random question for the specified difficulty | `difficulty` (`EASY`, `MEDIUM`, or `HARD` — default `EASY`) |
| `GET` | `/api/debug-schema` | Diagnostic route to inspect LeetCode GraphQL filter schema | None |

### Sample Question Response (`GET /api/questions?difficulty=MEDIUM`)

```json
{
  "question": {
    "questionFrontendId": "3",
    "title": "Longest Substring Without Repeating Characters",
    "titleSlug": "longest-substring-without-repeating-characters",
    "difficulty": "MEDIUM",
    "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
  }
}
```

---

## 📜 Available Scripts

### In `server/`:
- `npm run dev`: Runs the backend using `nodemon` with hot reloading.
- `npm start`: Runs the backend in production mode with standard `node`.

### In `client/`:
- `npm run dev`: Starts the Vite local development server.
- `npm run build`: Compiles and bundles production-ready frontend assets into `dist/`.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs ESLint to check for code quality and style issues.

---

## 🤝 Contributing

Contributions, issues, and feature suggestions are always welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the ISC License.
