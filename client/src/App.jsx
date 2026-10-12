import { useState } from "react";
import "./App.css";

function App() {
  const [difficulty, setDifficulty] = useState("EASY");
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getRandomQuestion() {
    setLoading(true);
    setError("");
    setQuestion(null);

    try {
      const response = await fetch(
        `http://localhost:5001/api/questions?difficulty=${difficulty}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch question");
      }

      setQuestion(data.question);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <div className="container">
        <p className="eyebrow">YOUR DAILY CODING PRACTICE</p>

        <h1>
          Stop choosing.
          <br />
          <span>Start solving.</span>
        </h1>

        <p className="subtitle">
          One click. One problem. Get better every day.
        </p>

        <section className="picker">
          <label htmlFor="difficulty">Choose difficulty</label>

          <div className="difficulty-options">
            {["EASY", "MEDIUM", "HARD"].map((level) => (
              <button
                key={level}
                className={`difficulty ${level.toLowerCase()} ${
                  difficulty === level ? "selected" : ""
                }`}
                onClick={() => setDifficulty(level)}
                disabled={loading}
              >
                {level.charAt(0) + level.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <button
            className="pick-button"
            onClick={getRandomQuestion}
            disabled={loading}
          >
            {loading ? "Finding a question..." : "Pick a random question →"}
          </button>

          {error && <p className="error">{error}</p>}

          {question && (
            <article className="question-card">
              <p className="question-label">YOUR NEXT CHALLENGE</p>

              <span
                className={`question-difficulty ${question.difficulty.toLowerCase()}`}
              >
                {question.difficulty}
              </span>

              <h2>
                {question.questionFrontendId}. {question.title}
              </h2>

              <a
                className="solve-button"
                href={question.url}
                target="_blank"
                rel="noreferrer"
              >
                Solve on LeetCode ↗
              </a>
            </article>
          )}
        </section>

        <p className="footer">Built for consistency, not perfection. 💻</p>
      </div>
    </main>
  );
}

export default App;