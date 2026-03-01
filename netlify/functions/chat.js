import { GoogleGenerativeAI } from '@google/generative-ai';

let G_Selected_Model = '';

const F_Get_Available_Model = async (api_key) => {
    if (G_Selected_Model) return G_Selected_Model;
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${api_key}`);
        const data = await response.json();
        if (data && data.models) {
            let target = data.models.find((m) => m.name.includes("gemini-1.5-pro") && m.supportedGenerationMethods.includes("generateContent"));
            if (!target) {
                target = data.models.find((m) => m.name.includes("gemini-1.5-flash") && m.supportedGenerationMethods.includes("generateContent"));
            }
            if (!target) {
                target = data.models.find((m) => m.name.includes("gemini") && m.supportedGenerationMethods.includes("generateContent"));
            }
            if (target) {
                G_Selected_Model = target.name.replace("models/", "");
                return G_Selected_Model;
            }
        }
    } catch (error) {
        console.error("Error fetching models:", error);
    }
    G_Selected_Model = "gemini-1.5-flash"; // Fallback
    return G_Selected_Model;
};

export const handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { prompt, persona, history } = JSON.parse(event.body);
        const API_KEY = process.env.VITE_GEMINI_API_KEY;

        if (!API_KEY) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "API Key is missing in environment variables." })
            };
        }

        const gen_ai = new GoogleGenerativeAI(API_KEY);
        const model_name = await F_Get_Available_Model(API_KEY);
        const model = gen_ai.getGenerativeModel({ model: model_name });

        const recent_history = (history || []).slice(-5).map((msg) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        const chat_history = [];
        if (persona && persona.trim() !== '') {
            chat_history.push({
                role: "user",
                parts: [{ text: `You are simulating the following persona: ${persona}. Please only answer based on this persona and do not reveal information outside this context. Keep your answers engaging, and in character. IMPORTANT: You MUST answer strictly in the EXACT SAME LANGUAGE as the user's prompt.` }],
            });
            chat_history.push({
                role: "model",
                parts: [{ text: "Understood. I will strictly follow that persona, match the user's exact language natively, and only answer questions within parameters." }],
            });
        }

        const chat = model.startChat({
            history: [...chat_history, ...recent_history],
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: response.text() })
        };
    } catch (error) {
        console.error('Gemini API Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to generate response' })
        };
    }
};
