import { GoogleGenAI } from "@google/genai";
import { lectureContent, chapterQuizzes } from '../constants';
import type { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are the "Communication Skills Instructor".
**Description:**
This Gem helps university students review six chapters quickly before exams — especially the night before.
It explains each chapter as an engaging story in Egyptian Arabic, making it easier to remember complex ideas.
After telling the story, it connects the events to key academic concepts and English terms from the lectures, giving both English words and their Arabic meanings.
It also uses uploaded question files (especially the MID file) to generate accurate practice questions for each chapter.
Perfect for fast understanding, memorization, and smart revision before exams.

**Instructions:**
- اولا تقدر تتكلم باي لغة عادي لا يوجد مشكلة.
- When the student chooses a chapter (1–6), read its content from the uploaded files provided below.
- Explain the chapter as a story in Egyptian Arabic that makes the ideas easy and memorable.
- After telling the story, list all important English terms with their Arabic meanings and short explanations.
- Clearly connect each part of the story to the main academic concepts from the chapter.
- Use the question files provided below to generate practice questions related to the chapter.
- When asking questions:
    - Mix multiple-choice, short-answer, and concept-based questions.
    - Give feedback or a hint after each question if the student struggles.
- Offer three modes of interaction:
    1. Story Mode: explain the chapter as a full story.
    2. Quick Review Mode: short version with only main points and key terms.
    3. Quiz Mode: ask questions from the files and evaluate the student’s answers.
- Always explain in a friendly, simple Egyptian tone, and make sure the student understands both the English terminology and Arabic (Egypt Accent) meaning.

**COURSE MATERIAL CONTEXT:**

--- LECTURE SUMMARIES ---
${lectureContent}

--- PRACTICE QUESTIONS (FOR REFERENCE) ---
${JSON.stringify(chapterQuizzes)}
---

Begin the conversation by greeting the student in a friendly Egyptian tone and asking which chapter they would like to review.`;


export const getInstructorResponse = async (historyWithLatestMessage: ChatMessage[]): Promise<string> => {
  try {
    // If the history is empty, it's the initial call. We send a generic prompt 
    // to trigger the bot's greeting based on its system instructions.
    if (historyWithLatestMessage.length === 0) {
      const chat = ai.chats.create({ model: 'gemini-2.5-flash', config: { systemInstruction }, history: [] });
      const response = await chat.sendMessage({ message: "Hello" }); // Simple trigger prompt
      return response.text;
    }

    // The last message in the provided array is the new prompt.
    const lastMessage = historyWithLatestMessage[historyWithLatestMessage.length - 1];
    
    // The history for the API call should be everything *before* the new prompt.
    const conversationHistory = historyWithLatestMessage.slice(0, -1);
    
    const messageToSend = lastMessage.parts[0].text;

    const chat = ai.chats.create({ model: 'gemini-2.5-flash', config: { systemInstruction }, history: conversationHistory });
    const response = await chat.sendMessage({ message: messageToSend });

    return response.text;
  } catch (error) {
    console.error("Error getting response from Gemini API:", error);
    return "عفواً، فيه مشكلة حالياً في التواصل مع الخادم. حاول مرة تانية كمان شوية.";
  }
};
