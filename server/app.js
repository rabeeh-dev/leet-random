
import express from "express";
import cors from "cors";
import { fetchQuestions } from "./services/leetcode.js";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "LeetRandom API is running!",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is working",
  });
});


app.get("/api/questions", async (req, res) => {
  try {
    const difficulty = (req.query.difficulty || "EASY").toUpperCase();

    if (!["EASY", "MEDIUM", "HARD"].includes(difficulty)) {
      return res.status(400).json({
        error: "Invalid difficulty. Use EASY, MEDIUM, or HARD.",
      });
    }

    const data = await fetchQuestions(difficulty);

    if (data.questions.length === 0) {
      return res.status(404).json({
        error: "No questions found for this difficulty.",
      });
    }

    const randomIndex = Math.floor(
      Math.random() * data.questions.length
    );

    const question = data.questions[randomIndex];

    res.json({
      question: {
        ...question,
        url: `https://leetcode.com/problems/${question.titleSlug}/`,
      },
    });
  } catch (error) {
    console.error("Question error:", error.message);

    res.status(502).json({
      error: "Could not fetch questions from LeetCode.",
      details: error.message,
    });
  }
});



app.get("/api/debug-schema", async (req, res) => {
  try {
    const query = `
      query {
        filterType: __type(name: "QuestionFilterInput") {
          name
          inputFields {
            name
            type {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
        combineType: __type(
          name: "QuestionFilterCombineTypeEnum"
        ) {
          name
          enumValues {
            name
          }
        }
      }
    `;

    const response = await fetch(
      "https://leetcode.com/graphql/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Referer": "https://leetcode.com/problemset/",
          "Origin": "https://leetcode.com",
          "User-Agent": "Mozilla/5.0",
        },
        body: JSON.stringify({ query }),
      }
    );

    const result = await response.json();
    res.status(response.ok ? 200 : response.status).json(result);
  } catch (error) {
    res.status(502).json({ error: error.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
