import axios from 'axios';

const API_KEY = process.env.VITE_OPENROUTER_API_KEY;

console.log('Testing API Key:', API_KEY ? 'Present' : 'Missing');

if (!API_KEY) {
    console.error('API Key not provided in environment variables.');
    process.exit(1);
}

async function testConnection() {
    try {
        console.log('Sending request to OpenRouter...');
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'openrouter/auto',
                messages: [
                    { role: 'user', content: 'Say "Connection Confirmed" if you receive this.' }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'HTTP-Referer': 'http://localhost:5173',
                    'X-Title': 'MuslimahBride',
                    'Content-Type': 'application/json',
                }
            }
        );
        console.log('Response:', response.data.choices[0].message.content);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response ? error.response.data : error.message);
        } else {
            console.error('Error:', error);
        }
    }
}

testConnection();
