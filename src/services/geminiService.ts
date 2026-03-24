import { GoogleGenAI, Type } from '@google/genai';
import { Scenario } from '../types';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is missing. Please set it in your environment.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const getGameMasterChat = (scenario: Scenario) => {
  const systemInstruction = `You are an expert Game Master for a text-based RPG adventure. 
The player has chosen the following scenario:
Title: ${scenario.title}
Genre: ${scenario.genre}
Description: ${scenario.description}

Your role is to narrate the story, describe the environment, play NPCs, and react to the player's actions.

CRITICAL RULES:
1. Keep your narrative short and punchy. Aim for around 5 sentences maximum per response. Do not overwhelm the player with walls of text.
2. ALWAYS end your narrative by presenting a situation or event that requires the player to react or make a choice. Keep the momentum going.
3. DO NOT include the choices or actions in the narrative text itself. Instead, provide them in the suggestedActions array.
4. The first message you send MUST be an immediate quest hook or inciting incident that thrusts the player into the action based on the scenario description.
5. Use markdown for formatting the narrative (e.g., bold for emphasis, italics for thoughts or whispers).
6. Be creative, immersive, and adapt to whatever the player decides to do.`;

  const history = scenario.initialMessage ? [
    { role: "user", parts: [{ text: "Start the adventure." }] },
    { role: "model", parts: [{ text: JSON.stringify(scenario.initialMessage) }] }
  ] : undefined;

  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    history,
    config: {
      systemInstruction,
      temperature: 0.9,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          narrative: {
            type: Type.STRING,
            description: "The story narrative, description of the environment, and NPC dialogue."
          },
          suggestedActions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 to 4 short, distinct actions the player can take next."
          }
        },
        required: ["narrative", "suggestedActions"]
      }
    },
  });
};

export const generateSceneImage = async (narrative: string, scenario: Scenario, size: 'standard' | 'big'): Promise<string> => {
  const prompt = `A scene from a ${scenario.genre} RPG adventure. Context: ${scenario.description}. Scene description: ${narrative}`;
  
  const currentApiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
  const dynamicAi = new GoogleGenAI({ apiKey: currentApiKey });
  
  const response = await dynamicAi.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: size === 'big' ? '2K' : '1K'
      }
    }
  });
  
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image generated");
};
