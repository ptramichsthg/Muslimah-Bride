import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Fix for ES modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env explicitly
dotenv.config({ path: resolve(__dirname, '../../.env') });

const API_KEY = process.env.VITE_OPENROUTER_API_KEY;

console.log('Testing API Key:', API_KEY ? 'Loaded' : 'Missing');

if (!API_KEY) {
    process.exit(1);
}

async function testConnection() {
    try {
        console.log('Sending request to OpenRouter...');
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
                messages: [
                    { role: 'user', content: 'Say "Hello, confirmed!" if you can hear me.' }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'HTTP-Referer': 'http://localhost:5173',
                    'Content-Type': 'application/json',
                }
            }
        );
        console.log('Response:', response.data.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

testConnection();
