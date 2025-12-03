import { GoogleGenAI, Type } from "@google/genai";
import { FixResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fixJavaScriptCode = async (code: string): Promise<FixResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a JavaScript code fixer.

      Your task is to take the provided JavaScript code, fix the syntax or logical errors, and FORMAT it beautifully.

      CODE TO FIX:
      \`\`\`javascript
      ${code}
      \`\`\`

      RESPONSE REQUIREMENTS:
      1. correctedCode: 
         - Fix syntax and logical errors.
         - FORMAT the code using standard JavaScript conventions (proper indentation, newlines, etc.).
         - If the input is minified or on one line, expand it into a readable multi-line format.
         - Do NOT add comments, documentation, or "best practice" refactoring unless essential for the fix.
         - Do NOT wrap code in functions or classes if the original code did not have them.

      2. explanation:
         - Identify where the error occurred.
         - Briefly explain the specific error and the correction applied.
         - Keep it concise and direct.

      Return the response in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            correctedCode: {
              type: Type.STRING,
              description: "The corrected and formatted code."
            },
            explanation: {
              type: Type.STRING,
              description: "A concise explanation of the error and fix."
            }
          },
          required: ["correctedCode", "explanation"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(text) as FixResult;
    return result;

  } catch (error) {
    console.error("Error fixing code:", error);
    throw new Error("Failed to analyze code. Please try again.");
  }
};