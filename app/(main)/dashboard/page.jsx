"use client";
import React, { useState } from "react";
import questions from "../../../datasets/Interest_Mapping_Questions_100.json";
import { getGeminiSuggestion } from "@/actions/gemini"; // path outside app/

const Dashboard = () => {
  const [answers, setAnswers] = useState({});
  const [geminiResponse, setGeminiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const mappedAnswers = questions.map((q) => ({
      question: q.question,
      answer: answers[q.id] || "Not Answered",
    }));

    const suggestion = await getGeminiSuggestion(mappedAnswers);
    setGeminiResponse(suggestion);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Interest Mapping Test</h1>

      {questions.map((q) => (
        <div key={q.id} className="mb-4 p-4 border rounded">
          <p className="font-medium">
            {q.id}. {q.question}
          </p>
          <div className="flex gap-4 mt-2">
            {q.options.map((opt) => (
              <label key={opt} className="cursor-pointer">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => handleOptionChange(q.id, opt)}
                  className="mr-1"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-6"
      >
        {loading ? "Analyzing..." : "Submit to Gemini AI"}
      </button>

      {geminiResponse && (
        <div className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-wrap">
          <h2 className="text-xl font-semibold mb-2">Gemini AI Suggestions:</h2>
          <p>{geminiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
