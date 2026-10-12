const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql/";

export async function fetchQuestions(difficulty = "EASY") {
  const query = `
    query problemsetQuestionListV2(
      $limit: Int!
      $skip: Int!
    ) {
      problemsetQuestionListV2(
        limit: $limit
        skip: $skip
      ) {
        questions {
          questionFrontendId
          title
          titleSlug
          difficulty
        }
      }
    }
  `;

  const response = await fetch(LEETCODE_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com/problemset/",
      Origin: "https://leetcode.com",
      "User-Agent": "Mozilla/5.0",
    },
    body: JSON.stringify({
      query,
      variables: {
        limit: 50,
        skip: 0,
      },
    }),
  });

  const responseText = await response.text();

  console.log("LeetCode HTTP status:", response.status);

  if (!response.ok) {
    console.error("LeetCode response:", responseText.slice(0, 1500));

    throw new Error(
      `LeetCode returned HTTP ${response.status}: ${responseText.slice(0, 300)}`
    );
  }

  let result;

  try {
    result = JSON.parse(responseText);
  } catch {
    throw new Error("LeetCode returned an invalid JSON response");
  }

  if (
    result.errors?.length ||
    !result.data?.problemsetQuestionListV2
  ) {
    throw new Error(
      result.errors?.[0]?.message || "Unexpected GraphQL response"
    );
  }

  const allQuestions =
    result.data.problemsetQuestionListV2.questions ?? [];

  const filteredQuestions = allQuestions.filter(
    (question) => question.difficulty === difficulty
  );

  return {
    total: filteredQuestions.length,
    questions: filteredQuestions,
  };
}