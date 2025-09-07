// actions/gemini.js
"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getGeminiSuggestion(userAnswers) {
  const prompt = generatePrompt(userAnswers);

  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash", // ✅ Using latest lightweight model
    });

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    // 🧼 Clean the response
    text = cleanText(text);

    return text || "No suggestion available.";
  } catch (err) {
    console.error("Gemini error:", err);
    return "❌ Gemini API failed.";
  }
}

function generatePrompt(userAnswers) {
  let prompt = `A computer science student answered the following questions:\n\n`;

  userAnswers.forEach((item, index) => {
    prompt += `${index + 1}. Q: ${item.question}\n   A: ${item.answer}\n`;
  });

  prompt += `\nBased on these answers, suggest the top 2–3 suitable computer science career paths for the student. Also, provide a detailed learning roadmap including skills, technologies, and example project ideas.`;

  return prompt;
}
function cleanText(text) {
  return text
    .replace(/```(?:json)?/g, "") // remove ``` and ```json
    .replace(/\*/g, "") // remove * and **
    .trim(); // remove leading/trailing space
}

