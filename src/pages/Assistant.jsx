import QuestionForm from "../components/QuestionForm";
import AnswerCard from "../components/AnswerCard";
import { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";

const GEMINI_MODELS = ["gemini-3.8-flash", "gemini-flash-lite-latest"];
const MAX_RETRIES = 1;

function Assistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    console.log("AI Assistant Page Loaded");
  }, []);

  const extractAnswerText = (response) => {
    if (typeof response?.text === "string" && response.text.trim()) {
      return response.text.trim();
    }

    const textParts = response?.candidates?.flatMap((candidate) =>
      candidate?.content?.parts?.map((part) => part?.text).filter(Boolean) ?? []
    );

    const joinedText = textParts?.join("\n");
    return joinedText?.trim() || "";
  };

  const isTransientGeminiError = (error) => {
    const status = error?.status;
    const message = (error?.message ?? "").toLowerCase();

    return (
      status === 429 ||
      status === 503 ||
      message.includes("currently experiencing high demand") ||
      message.includes("resource has been exhausted") ||
      message.includes("temporarily unavailable")
    );
  };

  const isUnavailableModelError = (error) => {
    const status = error?.status;
    const message = (error?.message ?? "").toLowerCase();

    return status === 404 || message.includes("not found") || message.includes("no longer available");
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const askGemini = async (userQuestion, subject) => {
    setQuestion(userQuestion);
    setAnswer("");
    setLoading(true);
    setStatusMessage("AI is thinking...");

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("VITE_GEMINI_API_KEY is missing. Add it to the project root .env file.");
      }

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
        You are an AI study assistant.
        Subject: ${subject}
        Student Question: ${userQuestion}

        Explain the answer:
        - Explain clearly
        - Give an example if useful
        - Keep it student-friendly
        - Do not make it unnecessarily long
      `;

      let lastError;

      for (let modelIndex = 0; modelIndex < GEMINI_MODELS.length; modelIndex += 1) {
        const model = GEMINI_MODELS[modelIndex];

        for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
          try {
            const response = await ai.models.generateContent({
              model,
              contents: prompt,
            });

            const answerText = extractAnswerText(response);
            if (!answerText) {
              throw new Error("Gemini returned an empty answer.");
            }

            setAnswer(answerText);
            setStatusMessage("");
            return;
          } catch (error) {
            lastError = error;

            if (isUnavailableModelError(error)) {
              console.warn(`Model ${model} unavailable, trying the next fallback.`);
              break;
            }

            if (!isTransientGeminiError(error)) {
              throw error;
            }

            if (attempt === MAX_RETRIES) {
              break;
            }

            setStatusMessage(
              modelIndex === 0
                ? "Gemini is busy. Retrying once before switching to the fast fallback..."
                : "Gemini is busy. Retrying the fast fallback..."
            );
            await wait(1000 * (attempt + 1));
          }
        }

        if (modelIndex < GEMINI_MODELS.length - 1) {
          setStatusMessage("The main Gemini model is busy. Switching to Gemini Flash Lite...");
        }
      }

      throw lastError;
    } catch (error) {
      console.error(error);

      const message = isTransientGeminiError(error)
        ? "The AI service is busy right now. Please try again in a moment."
        : "Sorry, Gemini could not generate this.";

      setAnswer(message);
      setStatusMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="Assistant">
      <h1>AI Study Assistant</h1>
      <p className="subtitle">Ask anything related to your study</p>

      <QuestionForm onAsk={askGemini} />

      {loading && (
        <div className="loading">
          <p>{statusMessage || "AI is thinking..."}</p>
        </div>
      )}

      {answer && !loading && <AnswerCard question={question} answer={answer} />}
    </main>
  );
}

export default Assistant;