import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const searchInflammationResearch = async (query: string) => {
  const ai = getClient();
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: query }]
        }
      ],
      config: {
        systemInstruction: "你是一個專業的醫學與神經科學專家。你的目標是解釋身體發炎（急性與慢性）如何影響人類的大腦認知、情緒調節與決策能力。請引用最新的醫學觀點。若使用搜尋工具，請務必列出來源。",
        tools: [{ googleSearch: {} }], // Enable Search Grounding
      },
    });

    // Extract text
    const text = response.text || "無法取得回應。";

    // Extract sources if available
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web)
      .filter((web: any) => web && web.uri && web.title) || [];

    return {
      text,
      sources
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "抱歉，目前無法連接到 AI 研究中心，請稍後再試。請檢查您的 API Key 是否支持 Google Search Grounding。",
      sources: []
    };
  }
};