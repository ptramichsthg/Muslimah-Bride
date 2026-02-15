import axios from 'axios';

const API_KEY = process.env.VITE_OPENROUTER_API_KEY;

if (!API_KEY) {
    console.error('API Key missing');
    process.exit(1);
}

const MODELS_TO_TEST = [
    'google/gemini-2.0-flash-lite-preview-02-05:free',
    'google/gemini-2.0-flash-exp:free',
    'google/gemini-exp-1206:free',
    'google/gemini-2.0-pro-exp-02-05:free',
    'meta-llama/llama-3-8b-instruct:free',
    'meta-llama/llama-3.2-11b-vision-instruct:free',
    'mistralai/mistral-7b-instruct:free',
    'microsoft/phi-3-mini-128k-instruct:free',
    'huggingfaceh4/zephyr-7b-beta:free'
];

async function testModel(model) {
    console.log(`Testing model: ${model}...`);
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: model,
                messages: [
                    { role: 'user', content: 'Hi' }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
                timeout: 5000 // 5s timeout
            }
        );
        if (response.status === 200) {
            console.log(`SUCCESS: ${model}`);
            return true;
        }
    } catch (error) {
        // console.error(`FAILED: ${model} - ${error.message}`);
        if (axios.isAxiosError(error) && error.response) {
            console.log(`FAILED: ${model} - Status: ${error.response.status}`);
            console.log(JSON.stringify(error.response.data, null, 2));
        } else {
            console.log(`FAILED: ${model} - ${error.message}`);
        }
        return false;
    }
    return false;
}

async function findWorkingModel() {
    for (const model of MODELS_TO_TEST) {
        const success = await testModel(model);
        if (success) {
            console.log(`\nWinner: ${model}`);
            return;
        }
    }
    console.log('\nAll models failed.');
}

findWorkingModel();
