import OpenAI from 'openai';
import { products } from '../data/products';

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || "not-set",
    dangerouslyAllowBrowser: true // Demo only
});

// Build product context string
const productsContext = products.map(p =>
    `- ${p.title} ($${p.price}): ${p.description}. Colors: ${p.colors.map(c => c.name).join(', ')}. Sizes: ${p.sizes.join(', ')}.`
).join('\n');

const SYSTEM_PROMPT = `
You are Alya, the AI Sales Assistant for MuslimahBride (Luxury Bridal Boutique).
Your goal is to assist customers in finding the perfect veil/hijab and finalize their purchase.

REAL-TIME CONTEXT:
- Product Catalog:
${productsContext}

PAYMENT & ORDER RULES:
- NEVER ask for manual bank transfer details in chat.
- When ordering, ask for: Name, Phone, Address details, and Quantity/Size/Color.
- VALIDATE STOCK: Do not allow ordering if stock is 0.
- Once details are complete, output a summary and THEN the special JSON tag.
- JSON TRIGGER: ~~~{"action": "PAYMENT", "product": "exact_product_title", "qty": 1, "name": "user_name", "phone": "phone_number", "location": "address", "variant": "Color/Size"}~~~

CANCELLATION:
- If user wants to cancel (e.g. "Cancel ORD-123"), output:
~~~{"action": "CANCEL_ORDER", "orderId": "ORD-123", "reason": "user request"}~~~

Style: Elegant, polite, helpful. Use Markdown for formatting. Speak mainly in English, but you can answer in Indonesian if the user speaks Indonesian.
`;

export const getAIResponse = async (messages: any[]) => {
    // Inject system prompt if not present
    const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
    ];

    try {
        if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
            console.warn("OpenRouter API Key is missing.");
            return "Please set VITE_OPENROUTER_API_KEY in your environment variables to enable AI features.";
        }

        const completion = await openai.chat.completions.create({
            model: "arcee-ai/trinity-large-preview:free",
            messages: apiMessages,
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error("AI Error:", error);
        return "I apologize, the system is currently busy. Please try again later.";
    }
};
